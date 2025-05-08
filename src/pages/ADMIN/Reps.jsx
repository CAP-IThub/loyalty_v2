import React, { useEffect, useState, Fragment } from "react";
import axios from "../../utils/axiosInstance";
import { FaSearch, FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { HiDotsVertical } from "react-icons/hi";
import Pagination from "../../components/Pagination";
import { ClipLoader } from "react-spinners";
import RepModal from "../../adminComponents/modals/repModal/RepModal";
import EditRepModal from "../../adminComponents/modals/repModal/EditRepModal";
import DeleteRepModal from "../../adminComponents/modals/repModal/DeleteRepModal";
import AddRepModal from "../../adminComponents/modals/repModal/AddRepModal";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { IoIosPersonAdd } from "react-icons/io";

const Reps = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [reps, setReps] = useState([]);
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [selectedRep, setSelectedRep] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [isModalOpen3, setIsModalOpen3] = useState(false);
  const [isModalOpen4, setIsModalOpen4] = useState(false);

  const fetchReps = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/reps", {
        params: {
          page: currentPage,
          per_page: perPage,
          search: searchTerm.trim(),
        },
      });

      const rawData = res.data.data.rep || [];
      const formatted = rawData.map((rep) => ({
        id: rep.id,
        name: `${rep.firstName} ${rep.lastName}`,
        firstName: rep.firstName,
        lastName: rep.lastName,
        phone: rep.phoneNum,
        email: rep.email,
      }));

      setReps(formatted);
      setTotal(res.data.data.total || formatted.length);
    } catch (err) {
      console.error("Failed to fetch reps", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReps();
  }, [searchTerm, perPage, currentPage]);
  const openModal = (rep) => {
    setSelectedRep(rep);
    setIsModalOpen(true);
  };

  const openEditModal = (rep) => {
    setSelectedRep(rep);
    setIsModalOpen2(true);
  };

  const openDeleteModal = (rep) => {
    setSelectedRep(rep);
    setIsModalOpen3(true);
  };

  return (
    <div className="py-6 px-2 space-y-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
        <div>
          <h2 className="md:text-lg font-semibold">Reps</h2>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-4 w-full md:w-auto">
          <div className="relative w-full md:w-[450px]">
            <input
              type="text"
              placeholder="Search table...."
              className="w-full border border-gray-300 rounded-md px-4 py-2 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-[#FC7B00]"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
          <select
            id="rows"
            className="border border-gray-300 px-3 py-2 rounded-md text-sm focus:outline-none"
            value={perPage}
            onChange={(e) => {
              setPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
          >
            {[5, 10, 20, 50].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
          <button
            className="flex items-center gap-2 bg-[#FC7B00] text-white rounded-md px-4 py-2 text-sm hover:opacity-90"
            onClick={() => setIsModalOpen4(true)}
          >
            <IoIosPersonAdd size={16} /> Add Rep
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-10">
          <ClipLoader size={30} color="#0B1C39" />
        </div>
      ) : reps.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">
          No reps found for your search.
        </p>
      ) : (
        <>
          <div className="hidden md:block overflow-x-auto border border-gray-200 rounded-xl">
            <table className="w-full text-sm whitespace-nowrap">
              <thead className="bg-gray-100 text-gray-600 text-xs uppercase tracking-wide">
                <tr>
                  <th className="text-left px-3 py-4 border-b">S/N</th>
                  <th className="text-left px-3 py-4 border-b">Name</th>
                  <th className="text-left px-3 py-4 border-b">Phone</th>
                  <th className="text-left px-3 py-4 border-b">Email</th>
                  <th className="text-left px-3 py-4 border-b">View</th>
                  <th className="text-left px-3 py-4 border-b"></th>
                </tr>
              </thead>
              <tbody>
                {reps.map((rep) => (
                  <tr
                    key={rep.id}
                    className="bg-white border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="px-3 py-4">{rep.id}</td>
                    <td className="px-3 py-4 capitalize">{rep.name}</td>
                    <td className="px-3 py-4">{rep.phone}</td>
                    <td className="px-3 py-4">{rep.email}</td>
                    <td className="px-3 py-4">
                      <button
                        className="text-blue-600"
                        onClick={() => openModal(rep)}
                      >
                        <FaEye />
                      </button>
                    </td>
                    <td className="px-6 py-4 relative">
                      <Menu
                        as="div"
                        className="relative inline-block text-left"
                      >
                        <MenuButton className="text-gray-600 hover:text-gray-800">
                          <HiDotsVertical />
                        </MenuButton>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <MenuItems className="absolute right-3 bottom-0 mt-2 w-28 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                            <div className="py-1 flex flex-col">
                              <MenuItem>
                                {({ active }) => (
                                  <button
                                    onClick={() => openEditModal(rep)}
                                    className={`${
                                      active ? "bg-gray-100" : ""
                                    } flex justify-between items-center w-full px-4 py-2 text-sm text-gray-700`}
                                  >
                                    Edit <FaEdit className="ml-2" />
                                  </button>
                                )}
                              </MenuItem>
                              <MenuItem>
                                {({ active }) => (
                                  <button
                                    onClick={() => openDeleteModal(rep)}
                                    className={`${
                                      active ? "bg-gray-100" : ""
                                    } flex justify-between items-center w-full px-4 py-2 text-sm text-red-600`}
                                  >
                                    Delete <FaTrash className="ml-2" />
                                  </button>
                                )}
                              </MenuItem>
                            </div>
                          </MenuItems>
                        </Transition>
                      </Menu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Grid */}
          <div className="md:hidden space-y-4">
            {reps.map((rep) => (
              <div
                key={rep.id}
                className="border border-gray-200 rounded-lg p-4 shadow-md bg-white"
              >
                <div className="mb-2 font-semibold text-[#0B0F28] text-base">
                  {rep.name}
                </div>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>
                    <span className="font-semibold">Phone:</span> {rep.phone}
                  </p>
                  <p>
                    <span className="font-semibold">Email:</span> {rep.email}
                  </p>
                </div>
                <div className="flex justify-end gap-3 mt-3">
                  <button
                    className="text-blue-600"
                    onClick={() => openModal(rep)}
                  >
                    <FaEye />
                  </button>
                  <button
                    className="text-green-600"
                    onClick={() => openEditModal(rep)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="text-red-600"
                    onClick={() => openDeleteModal(rep)}
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(total / perPage)}
            onPageChange={setCurrentPage}
            totalEntries={total}
            perPage={perPage}
          />
        </>
      )}

      <RepModal
        isOpen={isModalOpen}
        closeRepModal={() => setIsModalOpen(false)}
        rep={selectedRep}
      />
      <EditRepModal
        isOpen={isModalOpen2}
        closeRepModal={() => setIsModalOpen2(false)}
        rep={selectedRep}
        onUpdate={fetchReps}
      />
      <DeleteRepModal
        isOpen={isModalOpen3}
        closeDeleteModal={() => setIsModalOpen3(false)}
        rep={selectedRep}
        onDelete={fetchReps}
      />
      <AddRepModal
        isOpen={isModalOpen4}
        closeRepModal={() => setIsModalOpen4(false)}
        onUpdate={fetchReps}
      />
    </div>
  );
};

export default Reps;

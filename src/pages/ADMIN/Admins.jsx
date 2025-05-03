import React, { useEffect, useState, Fragment } from "react";
import axios from "../../utils/axiosInstance";
import { FaSearch, FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { HiDotsVertical } from "react-icons/hi";
import Pagination from "../../components/Pagination";
import { ClipLoader } from "react-spinners";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { IoIosPersonAdd } from "react-icons/io";
import { MdAssignmentTurnedIn } from "react-icons/md";
import AdminModal from "../../adminComponents/modals/adminsModal/AdminModal";
import EditAdminModal from "../../adminComponents/modals/adminsModal/EditAdminModal";
import DeleteAdminModal from "../../adminComponents/modals/adminsModal/DeleteAdminModal";
import AddAdminModal from "../../adminComponents/modals/adminsModal/AddAdminModal";

const Admins = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [admins, setAdmins] = useState([]);
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [isModalOpen3, setIsModalOpen3] = useState(false);
  const [isModalOpen4, setIsModalOpen4] = useState(false);

  const fetchAdmins = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/admin");
      const formatted = res.data.data.admin.data.map((p) => ({
        id: p.id,
        name: `${
          p.firstName[0].toUpperCase() + p.firstName.slice(1).toLowerCase()
        } ${p.lastName[0].toUpperCase() + p.lastName.slice(1).toLowerCase()}`,
        firstName: p.firstName,
        lastName: p.lastName,
        dept: p.dept,
        email: p.email,
        serial_num: p.serial_num
      }));

      setAdmins(formatted);
    } catch (err) {
      console.error("Failed to fetch admins", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const filtered = admins.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginated = filtered.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  const openModal = (admin) => {
    setSelectedAdmin(admin);
    setIsModalOpen(true);
  };

  const openEditModal = (admin) => {
    setSelectedAdmin(admin);
    setIsModalOpen2(true);
  };

  const openDeleteModal = (admin) => {
    setSelectedAdmin(admin);
    setIsModalOpen3(true);
  };

  return (
    <div className="py-6 px-2 space-y-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
        <div>
          <h2 className="md:text-lg font-semibold">Admins</h2>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-4 w-full md:w-auto">
          <div className="relative w-full md:w-[450px]">
            <input
              type="text"
              placeholder="Search table...."
              className="w-full border border-gray-300 rounded-md px-4 py-2 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-[#FC7B00]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
          <select
            id="rows"
            className="border border-gray-300 px-3 py-2 rounded-md text-sm focus:outline-none"
            value={perPage}
            onChange={(e) => setPerPage(Number(e.target.value))}
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
            <MdAssignmentTurnedIn size={16} /> Add Admin
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-10">
          <ClipLoader size={30} color="#0B1C39" />
        </div>
      ) : (
        <>
          <div className="hidden md:block overflow-x-auto border border-gray-200 rounded-xl ">
            <table className="w-full text-sm whitespace-nowrap">
              <thead className="bg-gray-100 text-gray-600 text-xs uppercase tracking-wide">
                <tr>
                  <th className="text-left px-3 py-4 border-b">S/N</th>
                  <th className="text-left px-3 py-4 border-b">Name</th>
                  <th className="text-left px-3 py-4 border-b">Department</th>
                  <th className="text-left px-3 py-4 border-b">Email</th>
                  <th className="text-left px-3 py-4 border-b">View</th>
                  <th className="text-left px-3 py-4 border-b"></th>
                </tr>
              </thead>
              <tbody>
                {paginated.map((admin) => (
                  <tr
                    key={admin.id}
                    className="bg-white border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="px-3 py-4 capitalize">{admin.serial_num}</td>
                    <td className="px-3 py-4 capitalize">{admin.name}</td>
                    <td className="px-3 py-4">{admin.dept}</td>
                    <td className="px-3 py-4">{admin.email}</td>
                    <td className="px-3 py-4">
                      <button
                        className="text-blue-600"
                        onClick={() => openModal(admin)}
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
                                    onClick={() => openEditModal(admin)}
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
                                    onClick={() => openDeleteModal(admin)}
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
            {paginated.map((admin) => (
              <div
                key={admin.id}
                className="border border-gray-200 rounded-lg p-4 shadow-md bg-white"
              >
                <div className="mb-2 font-semibold text-[#0B0F28] text-base">
                  {admin.name}
                </div>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>
                    <span className="font-semibold">Department:</span>{" "}
                    {admin.dept}
                  </p>
                  <p>
                    <span className="font-semibold">Email:</span>{" "}
                    {admin.email || "—"}
                  </p>
                </div>
                <div className="flex justify-end gap-3 mt-3">
                  <button
                    className="text-blue-600 hover:text-blue-800"
                    onClick={() => openModal(admin)}
                  >
                    <FaEye />
                  </button>
                  <button
                    className="text-green-600 hover:text-green-800"
                    onClick={() => openEditModal(admin)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="text-red-600 hover:text-red-800"
                    onClick={() => openDeleteModal(admin)}
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(filtered.length / perPage)}
            onPageChange={setCurrentPage}
            totalEntries={filtered.length}
            perPage={perPage}
          />
        </>
      )}

      <AdminModal
        isOpen={isModalOpen}
        closeAdminModal={() => setIsModalOpen(false)}
        admin={selectedAdmin}
      />
      <EditAdminModal
        isOpen={isModalOpen2}
        closeAdminModal={() => setIsModalOpen2(false)}
        admin={selectedAdmin}
        onUpdate={() => {
          setIsModalOpen2(false);
          fetchAdmins();
        }}
      />
      <DeleteAdminModal
        isOpen={isModalOpen3}
        closeDeleteModal={() => setIsModalOpen3(false)}
        admin={selectedAdmin}
        onDelete={() => {
          setIsModalOpen3(false);
          fetchAdmins();
        }}
      />
      <AddAdminModal
        isOpen={isModalOpen4}
        closeAdminModal={() => setIsModalOpen4(false)}
        onUpdate={fetchAdmins}
      />
    </div>
  );
};

export default Admins;

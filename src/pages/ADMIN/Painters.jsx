// Same import statements as before
import React, { Fragment, useEffect, useState } from "react";
import axios from "../../utils/axiosInstance";
import { FaSearch, FaEye, FaEdit, FaTrash } from "react-icons/fa";
import Pagination from "../../components/Pagination";
import { ClipLoader } from "react-spinners";
import PainterModal from "../../adminComponents/modals/painterModal/PainterModal";
import EditPainterModal from "../../adminComponents/modals/painterModal/EditPainterModal";
import DeletePainterModal from "../../adminComponents/modals/painterModal/DeletePainterModal";
import AddPainterModal from "../../adminComponents/modals/painterModal/AddPainterModal";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { IoIosPersonAdd } from "react-icons/io";
import { HiChevronDown, HiDotsVertical } from "react-icons/hi";

const Painters = () => {
  const [searchStatus, setSearchStatus] = useState("ALL");
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("default");
  const [searchGender, setSearchGender] = useState("ALL");
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedPainter, setSelectedPainter] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [isModalOpen3, setIsModalOpen3] = useState(false);
  const [isModalOpen4, setIsModalOpen4] = useState(false);
  const [displayedPainters, setDisplayedPainters] = useState([]);
  const [total, setTotal] = useState(0);

 const fetchPainters = async () => {
   try {
     setLoading(true);

     const params = {
       per_page: perPage,
       page: currentPage,
     };

     if (searchTerm.trim() !== "") {
       params.search = searchTerm.trim();
     }

     if (searchStatus !== "ALL") {
       params.status = searchStatus.toLowerCase();
     }

     if (searchGender !== "ALL") {
       params.gender = searchGender.toLowerCase();
     }

     if (sortBy) {
       params.sort_by = sortBy;
     }

     if (sortOrder !== "default") {
       params.sort_order = sortOrder;
     }

     const res = await axios.get("/customer", { params });
     const rawData = res.data.data.data;

     const formatted = rawData.map((p) => ({
       id: p.id,
       name: `${
         p.firstName[0].toUpperCase() + p.firstName.slice(1).toLowerCase()
       } ${p.lastName[0].toUpperCase() + p.lastName.slice(1).toLowerCase()}`,
       firstName: p.firstName,
       lastName: p.lastName,
       phone: p.phoneNum,
       address: p.address,
       email: p.email,
       status: p.status,
       image: p.image,
       gender: p.gender,
       serial_num: p.serial_num,
     }));

     setDisplayedPainters(formatted);
     setTotal(res.data.data.total || rawData.length);
   } catch (err) {
     console.error("Failed to fetch painters", err);
   } finally {
     setLoading(false);
   }
 };


  useEffect(() => {
    fetchPainters();
  }, [
    searchTerm,
    searchStatus,
    searchGender,
    sortBy,
    sortOrder,
    currentPage,
    perPage,
  ]);

  const openModal = (p) => {
    setSelectedPainter(p);
    setIsModalOpen(true);
  };
  const openEditModal = (p) => {
    setSelectedPainter(p);
    setIsModalOpen2(true);
  };
  const openDeleteModal = (p) => {
    setSelectedPainter(p);
    setIsModalOpen3(true);
  };

  const closeAll = () => {
    setIsModalOpen(false);
    setIsModalOpen2(false);
    setIsModalOpen3(false);
    setIsModalOpen4(false);
    setSelectedPainter(null);
  };

  const onUpdate = () => fetchPainters();
  const onDelete = () => fetchPainters();

  const sortOptions = [
    { label: "Default", value: "" },
    { label: "First Name", value: "firstName" },
    { label: "Last Name", value: "lastName" },
    { label: "Address", value: "address" },
    { label: "Phone Number", value: "phoneNum" },
  ];

  const handleSortChange = (newSort) => {
    if (newSort === sortBy) {
      setSortOrder((prev) =>
        prev === "asc" ? "desc" : prev === "desc" ? "default" : "asc"
      );
    } else {
      setSortBy(newSort);
      setSortOrder("asc");
    }
    setCurrentPage(1);
  };

  const sortByDisplay = (value) => {
    const found = sortOptions.find((opt) => opt.value === value);
    return found ? found.label : "Default";
  };

  return (
    <div className="py-6 px-2 space-y-6">
      <div>
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-2 gap-4">
          <div>
            <h2 className="md:text-lg font-semibold">Painters</h2>
          </div>
          <div className="flex gap-4">
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
              <IoIosPersonAdd size={16} /> Add Painter
            </button>
          </div>
        </div>
        <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
          <div className="flex gap-2">
            <Menu as="div" className="relative">
              <MenuButton className="flex items-center gap-2 border border-gray-300 px-4 py-2 rounded-lg text-sm shadow-sm bg-white">
                <span className="text-gray-700 font-medium">
                  Sort by: {sortByDisplay(sortBy)}
                </span>
                <HiChevronDown className="w-4 h-4" />
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
                <MenuItems className="absolute left-0 mt-2 w-48 origin-top-left bg-white border border-gray-200 rounded-md shadow-lg focus:outline-none z-50">
                  {sortOptions.map((option) => (
                    <MenuItem key={option.value}>
                      {({ active }) => (
                        <button
                          onClick={() => handleSortChange(option.value)}
                          className={`flex justify-between items-center w-full px-4 py-2 text-sm ${
                            active ? "bg-gray-100" : ""
                          }`}
                        >
                          <span>{option.label}</span>
                          {sortBy === option.value && (
                            <svg
                              className="w-4 h-4 text-green-500"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          )}
                        </button>
                      )}
                    </MenuItem>
                  ))}
                </MenuItems>
              </Transition>
            </Menu>

            <select
              value={searchStatus}
              onChange={(e) => {
                setCurrentPage(1);
                setSearchStatus(e.target.value);
              }}
              className="border border-gray-300 px-4 py-2 rounded-lg text-sm shadow-sm"
            >
              <option value="ALL">Status</option>
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Inactive</option>
            </select>

            <select
              value={searchGender}
              onChange={(e) => {
                setCurrentPage(1);
                setSearchGender(e.target.value);
              }}
              className="border border-gray-300 px-4 py-2 rounded-lg text-sm shadow-sm"
            >
              <option value="ALL">Gender</option>
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
            </select>
          </div>
          <div className="flex gap-2 flex-wrap">
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
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-8">
          <ClipLoader size={30} color="#0B1C39" />
        </div>
      ) : displayedPainters.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">
          No painters found for your search.
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
                  <th className="text-left px-3 py-4 border-b">Address</th>
                  <th className="text-left px-3 py-4 border-b">Email</th>
                  <th className="text-left px-3 py-4 border-b">Status</th>
                  <th className="text-left px-3 py-4 border-b">View</th>
                  <th className="text-left px-3 py-4 border-b"></th>
                </tr>
              </thead>
              <tbody>
                {displayedPainters.map((painter) => (
                  <tr
                    key={painter.id}
                    className="bg-white border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="px-3 py-4">{painter.serial_num}</td>
                    <td className="px-3 py-4 capitalize">{painter.name}</td>
                    <td className="px-3 py-4">{painter.phone}</td>
                    <td className="px-3 py-4">{painter.address || "—"}</td>
                    <td className="px-3 py-4">{painter.email || "—"}</td>
                    <td className="px-3 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          painter.status === "ACTIVE"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {painter.status}
                      </span>
                    </td>
                    <td className="px-3 py-4">
                      <button
                        className="text-blue-600"
                        onClick={() => openModal(painter)}
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
                                    onClick={() => openEditModal(painter)}
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
                                    onClick={() => openDeleteModal(painter)}
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

          {/* Mobile Grid View */}
          <div className="md:hidden space-y-4 mt-4">
            {displayedPainters.map((painter) => (
              <div
                key={painter.id}
                className="border rounded-lg p-4 shadow-sm bg-white"
              >
                <div className="mb-1 text-base font-semibold text-[#1A1A27]">
                  {painter.name}
                </div>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>
                    <span className="font-medium">Phone:</span> {painter.phone}
                  </p>
                  <p>
                    <span className="font-medium">Email:</span>{" "}
                    {painter.email || "—"}
                  </p>
                  <p>
                    <span className="font-medium">Address:</span>{" "}
                    {painter.address || "—"}
                  </p>
                  <p>
                    <span className="font-medium">Status:</span>{" "}
                    <span
                      className={`px-1 py-1 rounded-md text-xs font-medium ${
                        painter.status === "ACTIVE"
                          ? "text-white bg-green-500"
                          : "text-white bg-red-500"
                      }`}
                    >
                      {painter.status}
                    </span>
                  </p>
                </div>
                <div className="flex justify-end gap-3 mt-3">
                  <button
                    className="text-blue-600 hover:text-blue-800"
                    onClick={() => openModal(painter)}
                  >
                    <FaEye />
                  </button>
                  <button
                    className="text-green-600 hover:text-green-800"
                    onClick={() => openEditModal(painter)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="text-red-600 hover:text-red-800"
                    onClick={() => openDeleteModal(painter)}
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(total / perPage)}
            onPageChange={setCurrentPage}
            totalEntries={total}
            perPage={perPage}
          />
        </>
      )}

      {/* Modals */}
      <PainterModal
        isOpen={isModalOpen}
        closePainterModal={closeAll}
        painter={selectedPainter}
      />
      <EditPainterModal
        isOpen={isModalOpen2}
        closePainterModal={closeAll}
        painter={selectedPainter}
        onUpdate={onUpdate}
      />
      <DeletePainterModal
        isOpen={isModalOpen3}
        closeDeleteModal={closeAll}
        painter={selectedPainter}
        onDelete={onDelete}
      />
      <AddPainterModal
        isOpen={isModalOpen4}
        closePainterModal={closeAll}
        onUpdate={onUpdate}
      />
    </div>
  );
};

export default Painters;

import React, { Fragment, useEffect, useState } from "react";
import axios from "../../utils/axiosInstance";
import { FaSearch, FaEye, FaEdit, FaTrash } from "react-icons/fa";
import Pagination from "../../components/Pagination";
import { ClipLoader } from "react-spinners";
import AddCenterModal from "../../adminComponents/modals/centerModal/AddCenterModal";
import DeleteCenterModal from "../../adminComponents/modals/centerModal/DeleteCenterModal";
import EditCenterModal from "../../adminComponents/modals/centerModal/EditCenterModal";
import CenterModal from "../../adminComponents/modals/centerModal/CenterModal";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { IoIosPersonAdd } from "react-icons/io";
import { HiChevronDown, HiDotsVertical } from "react-icons/hi";
import { MdAssignmentAdd } from "react-icons/md";
import { IoArrowUndoCircleSharp } from "react-icons/io5";

const Centers = () => {
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [centers, setCenters] = useState([]);
  const [total, setTotal] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedCenter, setSelectedCenter] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [isModalOpen3, setIsModalOpen3] = useState(false);
  const [isModalOpen4, setIsModalOpen4] = useState(false);

  const fetchCenters = async () => {
    try {
      setLoading(true);

      let url = `/shop?page=${currentPage}&per_page=${perPage}`;
      if (sortBy) {
        url += `&sort_by=${sortBy}&sort_order=${sortOrder}`;
      }

      const res = await axios.get(url);
      const rawData = res.data.data.data;

      const formatted = rawData.map((p) => ({
        id: p.id,
        name: p.name,
        shopCode: p.shopCode,
        location: p.location,
        choice: p.choice,
        status: p.status,
        status2: p.status2,
        address: {
          street: p.address?.street,
          state: p.address?.state,
          region: p.address?.region,
          country: p.address?.country,
        },
      }));      

      setCenters(formatted);
      setTotal(res.data.data.total);
    } catch (err) {
      console.error("Failed to fetch centers", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCenters();
  }, [currentPage, perPage, sortBy, sortOrder]);

  const openModal = (center) => {
    setSelectedCenter(center);
    setIsModalOpen(true);
  };
  const openEditModal = (center) => {
    setSelectedCenter(center);
    setIsModalOpen2(true);
  };
  const openDeleteModal = (center) => {
    setSelectedCenter(center);
    setIsModalOpen3(true);
  };

  const closeAll = () => {
    setIsModalOpen(false);
    setIsModalOpen2(false);
    setIsModalOpen3(false);
    setIsModalOpen4(false);
    setSelectedCenter(null);
  };

  const onUpdate = () => fetchCenters();
  const onDelete = () => fetchCenters();

  const sortOptions = [
    { label: "Default", value: "" },
    { label: "Name", value: "name" },
    { label: "Shop Code", value: "shopCode" },
    { label: "Region", value: "region" },
  ];

  const sortByDisplay = (value) => {
    const found = sortOptions.find((opt) => opt.value === value);
    return found ? found.label : "Default";
  };

  const handleSortChange = (newSort) => {
    if (newSort === sortBy) {
      // Toggle between ascending and descending
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(newSort);
      setSortOrder("asc"); // reset to ascending for new field
    }
    setCurrentPage(1);
  };

  return (
    <div className="py-6 px-2 space-y-6">
      {/* Header */}
      <div>
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-2 gap-4">
          <div>
            <h2 className="md:text-lg font-semibold">Centers</h2>
          </div>
          <button
            className="flex items-center gap-2 bg-[#FC7B00] text-white rounded-md px-4 py-2 text-sm hover:opacity-90"
            onClick={() => setIsModalOpen4(true)}
          >
            <IoIosPersonAdd size={16} /> Add Center
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
          <div className="flex gap-2">
            {/* Sort Dropdown */}
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

            {/* Rows per page */}
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
          </div>

          {/* Search */}
          <div className="relative w-full md:w-[450px]">
            <input
              type="text"
              placeholder="Search by name or shop code..."
              className="w-full border border-gray-300 rounded-md px-4 py-2 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-[#FC7B00]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <div className="flex justify-center py-8">
          <ClipLoader size={30} color="#0B1C39" />
        </div>
      ) : (
        <>
          <div className="hidden md:block overflow-x-auto border border-gray-200 rounded-xl">
            <table className="w-full text-sm whitespace-nowrap">
              <thead className="bg-gray-100 text-gray-600 text-xs uppercase tracking-wide">
                <tr>
                  <th className="text-left px-3 py-4 border-b">Shop Code</th>
                  <th className="text-left px-3 py-4 border-b">Name</th>
                  <th className="text-left px-3 py-4 border-b">State</th>
                  <th className="text-left px-3 py-4 border-b">Region</th>
                  <th className="text-left px-3 py-4 border-b">Choice</th>
                  <th className="text-left px-3 py-4 border-b">
                    Partner Status
                  </th>
                  <th className="text-left px-3 py-4 border-b">Rep Status</th>
                  <th className="text-left px-3 py-4 border-b">View</th>
                  <th className="text-left px-3 py-4 border-b"></th>
                </tr>
              </thead>
              <tbody>
                {centers
                  .filter(
                    (center) =>
                      center.name
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                      center.shopCode
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())
                  )
                  .map((center) => (
                    <tr
                      key={center.id}
                      className="bg-white border-b border-gray-100 hover:bg-gray-50"
                    >
                      <td className="px-3 py-4">{center.shopCode}</td>
                      <td className="px-3 py-4 capitalize">{center.name}</td>
                      <td className="px-3 py-4 capitalize">
                        {center.address.state || "—"}
                      </td>
                      <td className="px-3 py-4 capitalize">
                        {center.address.region || "—"}
                      </td>
                      <td className="px-3 py-4 capitalize">
                        {center.choice || "—"}
                      </td>
                      <td className="px-3 py-4">
                        <span
                          className={`px-2 py-1 rounded-md text-xs font-medium  ${
                            center.status === "ASSIGNED-TO-PARTNER"
                              ? "text-white bg-green-500"
                              : "text-white bg-red-500"
                          }`}
                        >
                          {center.status}
                        </span>
                      </td>
                      <td className="px-3 py-4">
                        <span
                          className={`px-2 py-1 rounded-md text-xs font-medium ${
                            center.status2 === "ASSIGNED-TO-REP"
                              ? "text-white bg-green-500"
                              : "text-white bg-red-500"
                          }`}
                        >
                          {center.status2}
                        </span>
                      </td>
                      <td className="px-3 py-4">
                        <button
                          className="text-blue-600"
                          onClick={() => openModal(center)}
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
                            <MenuItems className="absolute right-0 mt-2 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                              <div className="py-1 flex flex-col">
                                <MenuItem>
                                  {({ active }) => (
                                    <button
                                      onClick={() => openEditModal(center)}
                                      className={`${
                                        active ? "bg-gray-100" : ""
                                      } flex justify-between items-center w-full px-4 py-2 text-sm text-gray-700`}
                                    >
                                      Edit Center <FaEdit className="ml-2" />
                                    </button>
                                  )}
                                </MenuItem>
                                <MenuItem>
                                  {({ active }) => (
                                    <button
                                      // onClick={() => openEditModal(center)}
                                      className={`${
                                        active ? "bg-gray-100" : ""
                                      } flex justify-between items-center w-full px-4 py-2 text-sm text-gray-700`}
                                    >
                                      Assign Center to Partner{" "}
                                      <MdAssignmentAdd className="ml-2" />
                                    </button>
                                  )}
                                </MenuItem>
                                <MenuItem>
                                  {({ active }) => (
                                    <button
                                      // onClick={() => openEditModal(center)}
                                      className={`${
                                        active ? "bg-gray-100" : ""
                                      } flex justify-between items-center w-full px-4 py-2 text-sm text-gray-700`}
                                    >
                                      Unassign Center to Partner{" "}
                                      <IoArrowUndoCircleSharp className="ml-2" />
                                    </button>
                                  )}
                                </MenuItem>
                                <MenuItem>
                                  {({ active }) => (
                                    <button
                                      // onClick={() => openEditModal(center)}
                                      className={`${
                                        active ? "bg-gray-100" : ""
                                      } flex justify-between items-center w-full px-4 py-2 text-sm text-gray-700`}
                                    >
                                      Assign Center to Rep{" "}
                                      <MdAssignmentAdd className="ml-2" />
                                    </button>
                                  )}
                                </MenuItem>
                                <MenuItem>
                                  {({ active }) => (
                                    <button
                                      // onClick={() => openEditModal(center)}
                                      className={`${
                                        active ? "bg-gray-100" : ""
                                      } flex justify-between items-center w-full px-4 py-2 text-sm text-gray-700`}
                                    >
                                      Unassign Center to Rep{" "}
                                      <IoArrowUndoCircleSharp className="ml-2" />
                                    </button>
                                  )}
                                </MenuItem>
                                <MenuItem>
                                  {({ active }) => (
                                    <button
                                      onClick={() => openDeleteModal(center)}
                                      className={`${
                                        active ? "bg-gray-100" : ""
                                      } flex justify-between items-center w-full px-4 py-2 text-sm text-red-600`}
                                    >
                                      Delete Center <FaTrash className="ml-2" />
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
            {centers
              .filter(
                (center) =>
                  center.name
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                  center.shopCode
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
              )
              .map((center) => (
                <div
                  key={center.id}
                  className="border rounded-lg p-4 shadow-sm bg-white"
                >
                  <div className="mb-1 text-base font-semibold text-[#1A1A27]">
                    {center.name}
                  </div>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>
                      <span className="font-medium">Shop Code:</span>{" "}
                      {center.shopCode}
                    </p>
                    <p>
                      <span className="font-medium">State:</span>{" "}
                      {center.state || "—"}
                    </p>
                    <p>
                      <span className="font-medium">Region:</span>{" "}
                      {center.region || "—"}
                    </p>
                    <p>
                      <span className="font-medium">Choice:</span>{" "}
                      {center.choice || "—"}
                    </p>
                    <p>
                      <span className="font-medium">Partner Status:</span>{" "}
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          center.status === "ASSIGNED-TO-PARTNER"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {center.status}
                      </span>
                    </p>
                    <p>
                      <span className="font-medium">Rep Status:</span>{" "}
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          center.status2 === "ASSIGNED-TO-REP"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {center.status2}
                      </span>
                    </p>
                  </div>

                  {/* Action buttons */}
                  <div className="flex justify-end gap-3 mt-3">
                    <button
                      className="text-blue-600 hover:text-blue-800"
                      onClick={() => openModal(center)}
                    >
                      <FaEye />
                    </button>
                    <button
                      className="text-green-600 hover:text-green-800"
                      onClick={() => openEditModal(center)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="text-red-600 hover:text-red-800"
                      onClick={() => openDeleteModal(center)}
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
      <CenterModal
        isOpen={isModalOpen}
        closeCenterModal={closeAll}
        center={selectedCenter}
      />
      <EditCenterModal
        isOpen={isModalOpen2}
        closeCenterModal={closeAll}
        center={selectedCenter}
        onUpdate={onUpdate}
      />
      <DeleteCenterModal
        isOpen={isModalOpen3}
        closeDeleteModal={closeAll}
        center={selectedCenter}
        onDelete={onDelete}
      />
      <AddCenterModal
        isOpen={isModalOpen4}
        closeCenterModal={closeAll}
        onUpdate={onUpdate}
      />
    </div>
  );
};

export default Centers;

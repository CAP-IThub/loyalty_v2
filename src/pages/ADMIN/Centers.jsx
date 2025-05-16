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
import AssignPartnerModal from "../../adminComponents/modals/centerModal/AssignPartnerModal";
import UnassignPartnerModal from "../../adminComponents/modals/centerModal/UnassignPartnerModal";
import AssignRepModal from "../../adminComponents/modals/centerModal/AssignRepModal";
import UnassignRepModal from "../../adminComponents/modals/centerModal/UnassignRepModal";
import { RiUploadCloud2Fill } from "react-icons/ri";

const Centers = () => {
  const [allCenters, setAllCenters] = useState([]);
  const [displayedCenters, setDisplayedCenters] = useState([]);
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("default");
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
  const [isModalOpen5, setIsModalOpen5] = useState(false);
  const [isModalOpen6, setIsModalOpen6] = useState(false);
  const [isModalOpen7, setIsModalOpen7] = useState(false);
  const [isModalOpen8, setIsModalOpen8] = useState(false);

  const fetchCenters = async () => {
    setLoading(true);
    try {
      const params = {
        per_page: perPage,
        page: currentPage,
        search: searchTerm,
        ...(sortBy && { sort_by: sortBy }),
        ...(sortOrder !== "default" && { sort_order: sortOrder }),
      };
      const res = await axios.get("/shop", { params });
      setCenters(res.data.data.data);
      setTotal(res.data.data.total || 0);
    } catch (err) {
      console.error("Failed to fetch centers", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCenters();
  }, [searchTerm, sortBy, sortOrder, currentPage, perPage]);

  const handleSortChange = (value) => {
    if (value === sortBy) {
      setSortOrder((prev) =>
        prev === "asc" ? "desc" : prev === "desc" ? "default" : "asc"
      );
    } else {
      setSortBy(value);
      setSortOrder("asc");
    }
    setCurrentPage(1);
  };

  const sortOptions = [
    { label: "Default", value: "" },
    { label: "Name", value: "name" },
    { label: "Shop Code", value: "shopCode" },
    { label: "Region", value: "region" },
  ];

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
  const openAssignModal1 = (center) => {
    setSelectedCenter(center);
    setIsModalOpen5(true);
  };
  const openUnassignModal1 = (center) => {
    setSelectedCenter(center);
    setIsModalOpen6(true);
  };
  const openAssignModal2 = (center) => {
    setSelectedCenter(center);
    setIsModalOpen7(true);
  };
  const openUnassignModal2 = (center) => {
    setSelectedCenter(center);
    setIsModalOpen8(true);
  };

  const closeAll = () => {
    setIsModalOpen(false);
    setIsModalOpen2(false);
    setIsModalOpen3(false);
    setIsModalOpen4(false);
    setIsModalOpen5(false);
    setIsModalOpen6(false);
    setIsModalOpen7(false);
    setIsModalOpen8(false);
    setSelectedCenter(null);
  };

  const onUpdate = () => fetchCenters();
  const onDelete = () => fetchCenters();

  const sortByDisplay = (value) => {
    const found = sortOptions.find((opt) => opt.value === value);
    return found ? found.label : "Default";
  };

const handleExport = async () => {
  try {
    const res = await axios.get("/shop", {
      params: {
        per_page: 10000,
        page: 1,
        search: searchTerm,
        ...(sortBy && { sort_by: sortBy }),
        ...(sortOrder !== "default" && { sort_order: sortOrder }),
      },
    });

    const allData = res.data.data.data;

    const csvHeader = [
      "Shop Code",
      "Name",
      "State",
      "Region",
      "Choice",
      "Partner Status",
      "Rep Status",
    ];
    const rows = allData.map((center) => [
      center.shopCode,
      center.name,
      center.address?.state || "—",
      center.address?.region || "—",
      center.choice || "—",
      center.status || "—",
      center.status2 || "—",
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [csvHeader, ...rows].map((e) => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "centers_export.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error("Export failed:", error);
    alert("Failed to export data. Please try again.");
  }
};



  return (
    <div className="py-6 px-2 space-y-6">
      {/* Header */}
      <div>
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-2 gap-4">
          <div>
            <h2 className="md:text-lg font-semibold">Centers</h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              className="flex items-center gap-2 bg-gray-400 text-white rounded-md px-4 py-2 text-sm hover:opacity-90"
              onClick={handleExport}
            >
              <RiUploadCloud2Fill size={16} />
            </button>
            <button
              className="flex items-center gap-2 bg-[#FC7B00] text-white rounded-md px-4 py-2 text-sm hover:opacity-90"
              onClick={() => setIsModalOpen4(true)}
            >
              <IoIosPersonAdd size={16} /> Add Center
            </button>
          </div>
        </div>

        <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
          <div className="flex gap-2">
            <Menu as="div" className="relative">
              <MenuButton className="flex items-center gap-2 border border-gray-300 px-4 py-2 rounded-lg text-sm shadow-sm bg-white">
                <span className="text-gray-700 font-medium">
                  Sort by:{" "}
                  {sortOptions.find((opt) => opt.value === sortBy)?.label ||
                    "Default"}
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
                  {sortOptions.map((opt) => (
                    <MenuItem key={opt.value}>
                      {({ active }) => (
                        <button
                          onClick={() => handleSortChange(opt.value)}
                          className={`w-full px-4 py-2 text-left text-sm ${
                            active ? "bg-gray-100" : ""
                          }`}
                        >
                          {opt.label}
                        </button>
                      )}
                    </MenuItem>
                  ))}
                </MenuItems>
              </Transition>
            </Menu>

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
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
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
      ) : centers.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">
          No centers found for your search.
        </p>
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
                {centers.map((center) => (
                  <tr
                    key={center.id}
                    onClick={() => openModal(center)}
                    className="bg-white border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
                  >
                    <td className="px-3 py-4">{center.shopCode}</td>
                    <td className="px-3 py-4 capitalize">{center.name}</td>
                    <td className="px-3 py-4 capitalize">
                      {center.address?.state || "—"}
                    </td>
                    <td className="px-3 py-4 capitalize">
                      {center.address?.region || "—"}
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
                                    onClick={() => openAssignModal1(center)}
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
                                    onClick={() => openUnassignModal1(center)}
                                    className={`${
                                      active ? "bg-gray-100" : ""
                                    } flex justify-between items-center w-full px-4 py-2 text-sm text-gray-700`}
                                  >
                                    Unassign Center from Partner{" "}
                                    <IoArrowUndoCircleSharp className="ml-2" />
                                  </button>
                                )}
                              </MenuItem>
                              <MenuItem>
                                {({ active }) => (
                                  <button
                                    onClick={() => openAssignModal2(center)}
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
                                    onClick={() => openUnassignModal2(center)}
                                    className={`${
                                      active ? "bg-gray-100" : ""
                                    } flex justify-between items-center w-full px-4 py-2 text-sm text-gray-700`}
                                  >
                                    Unassign Center from Rep{" "}
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
            {centers.map((center) => (
              <div
                key={center.id}
                className="border rounded-lg p-4 shadow-sm bg-white"
              >
                <div className="flex items-center justify-between">
                  <div className="mb-1 text-base font-semibold text-[#1A1A27] capitalize">
                    {center.name}
                  </div>
                  <div>
                    <Menu as="div" className="relative inline-block text-left">
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
                        <MenuItems className="absolute right-3 bottom-0 mt-2  w-[15rem] origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                          <div className="py-1 flex flex-col">
                            <MenuItem>
                              {({ active }) => (
                                <button
                                  onClick={() => openAssignModal1(center)}
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
                                  onClick={() => openUnassignModal1(center)}
                                  className={`${
                                    active ? "bg-gray-100" : ""
                                  } flex justify-between items-center w-full px-4 py-2 text-sm text-gray-700`}
                                >
                                  Unassign Center from Partner{" "}
                                  <IoArrowUndoCircleSharp className="ml-2" />
                                </button>
                              )}
                            </MenuItem>
                            <MenuItem>
                              {({ active }) => (
                                <button
                                  onClick={() => openAssignModal2(center)}
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
                                  onClick={() => openUnassignModal2(center)}
                                  className={`${
                                    active ? "bg-gray-100" : ""
                                  } flex justify-between items-center w-full px-4 py-2 text-sm text-gray-700`}
                                >
                                  Unassign Center from Rep{" "}
                                  <IoArrowUndoCircleSharp className="ml-2" />
                                </button>
                              )}
                            </MenuItem>
                          </div>
                        </MenuItems>
                      </Transition>
                    </Menu>
                  </div>
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
                  <p className="capitalize">
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
      <AssignPartnerModal
        isOpen={isModalOpen5}
        closeCenterModal={closeAll}
        center={selectedCenter}
        onUpdate={onUpdate}
      />
      <UnassignPartnerModal
        isOpen={isModalOpen6}
        closeCenterModal={closeAll}
        center={selectedCenter}
        onUpdate={onUpdate}
      />
      <AssignRepModal
        isOpen={isModalOpen7}
        closeCenterModal={closeAll}
        center={selectedCenter}
        onUpdate={onUpdate}
      />
      <UnassignRepModal
        isOpen={isModalOpen8}
        closeCenterModal={closeAll}
        center={selectedCenter}
        onUpdate={onUpdate}
      />
    </div>
  );
};

export default Centers;

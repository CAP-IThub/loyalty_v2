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
import RoleModal from "../../adminComponents/modals/roleModal/RoleModal";
import AddRoleModal from "../../adminComponents/modals/roleModal/AddRoleModal";
import DeleteRoleModal from "../../adminComponents/modals/roleModal/DeleteRoleModal";
import EditRoleModal from "../../adminComponents/modals/roleModal/EditRoleModal";

const Roles = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [roles, setRoles] = useState([]);
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [isModalOpen3, setIsModalOpen3] = useState(false);
  const [isModalOpen4, setIsModalOpen4] = useState(false);

  const fetchRoles = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/role");

      const formatted = res.data.data.map((p) => ({
        id: p.id,
        name: p.name,
        guard_name: p.guard_name,
        created_at: p.created_at,
        updated_at: p.updated_at,
      }));

      setRoles(formatted);
    } catch (err) {
      console.error("Failed to fetch roles", err);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchRoles();
  }, []);

  const filtered = roles.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginated = filtered.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  const openModal = (role) => {
    setSelectedRole(role);
    setIsModalOpen(true);
  };

  const openEditModal = (role) => {
    setSelectedRole(role);
    setIsModalOpen2(true);
  };

  const openDeleteModal = (role) => {
    setSelectedRole(role);
    setIsModalOpen3(true);
  };

  return (
    <div className="py-6 px-2 space-y-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
        <div>
          <h2 className="md:text-lg font-semibold">Roles</h2>
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
            <MdAssignmentTurnedIn size={16} /> Add Role
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-10">
          <ClipLoader size={30} color="#0B1C39" />
        </div>
      ) : (
        <>
          <div className="hidden md:block overflow-x-auto border border-gray-200 rounded-xl">
            <table className="w-full text-sm whitespace-nowrap">
              <thead className="bg-gray-100 text-gray-600 text-xs uppercase tracking-wide">
                <tr>
                  <th className="text-left px-3 py-4 border-b">ID</th>
                  <th className="text-left px-3 py-4 border-b">Name</th>
                  <th className="text-left px-3 py-4 border-b">View</th>
                  <th className="text-left px-3 py-4 border-b">Action</th>
                  <th className="text-left px-3 py-4 border-b"></th>
                </tr>
              </thead>
              <tbody>
                {paginated.map((role) => (
                  <tr
                    onClick={() => openModal(role)}
                    key={role.id}x
                    className="bg-white border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
                  >
                    <td className="px-3 py-4">{role.id}</td>
                    <td className="px-3 py-4 capitalize">{role.name}</td>
                    <td className="px-3 py-4">
                      <button
                        className="text-blue-600"
                        onClick={() => openModal(role)}
                      >
                        <FaEye />
                      </button>
                    </td>
                    <td className="px-3 py-4">
                      <button
                        className="text-green-600"
                        onClick={() => openEditModal(role)}
                      >
                        <FaEdit />
                      </button>
                    </td>
                    <td className="px-3 py-4">
                      <button
                        className="text-red-600"
                        onClick={() => openDeleteModal(role)}
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Grid */}
          <div className="md:hidden space-y-4 mt-4">
            {paginated.map((role) => (
              <div
                key={role.id}
                className="border border-gray-200 rounded-lg p-4 shadow-md bg-white"
              >
                <div className="mb-2 font-semibold text-[#0B0F28] text-base">
                  {role.name}
                </div>

                <div className="text-sm text-gray-600 space-y-1">
                  <p>
                    <span className="font-semibold">Name:</span>{" "}
                    {role.name || "—"}
                  </p>
                  <p>
                    <span className="font-semibold">Created At:</span>{" "}
                    {role.created_at
                      ? new Date(role.created_at).toLocaleDateString()
                      : "—"}
                  </p>
                </div>

                <div className="flex justify-end gap-3 mt-3">
                  <button
                    className="text-blue-600 hover:text-blue-800"
                    onClick={() => openModal(role)}
                  >
                    <FaEye />
                  </button>
                  <button
                    className="text-green-600 hover:text-green-800"
                    onClick={() => openEditModal(role)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="text-red-600 hover:text-red-800"
                    onClick={() => openDeleteModal(role)}
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

      <RoleModal
        isOpen={isModalOpen}
        closeRoleModal={() => setIsModalOpen(false)}
        role={selectedRole}
      />
      <EditRoleModal
        isOpen={isModalOpen2}
        closeRoleModal={() => setIsModalOpen2(false)}
        role={selectedRole}
        onUpdate={fetchRoles}
      />
      <DeleteRoleModal
        isOpen={isModalOpen3}
        closeDeleteModal={() => setIsModalOpen3(false)}
        role={selectedRole}
        onDelete={fetchRoles}
      />
      <AddRoleModal
        isOpen={isModalOpen4}
        closeRoleModal={() => setIsModalOpen4(false)}
        onUpdate={fetchRoles}
      />
    </div>
  );
};

export default Roles;

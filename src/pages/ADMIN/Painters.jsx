import React, { useEffect, useState } from "react";
import axios from "../../utils/axiosInstance";
import { FaSearch, FaEye, FaEdit, FaTrash } from "react-icons/fa";
import Pagination from "../../components/Pagination";
import { ClipLoader } from "react-spinners";
import PainterModal from "../../adminComponents/modals/painterModal/PainterModal";
import EditPainterModal from "../../adminComponents/modals/painterModal/EditPainterModal";
import DeletePainterModal from "../../adminComponents/modals/painterModal/DeletePainterModal";
import AddPainterModal from "../../adminComponents/modals/painterModal/AddPainterModal";

const Painters = () => {
  const [searchStatus, setSearchStatus] = useState("ALL");
  const [sortBy, setSortBy] = useState("firstName");
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [painters, setPainters] = useState([]);
  const [total, setTotal] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedPainter, setSelectedPainter] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [isModalOpen3, setIsModalOpen3] = useState(false);
  const [isModalOpen4, setIsModalOpen4] = useState(false);

  const fetchPainters = async () => {
    try {
      setLoading(true);
      let url = `/customer?page=${currentPage}&per_page=${perPage}&sort_by=${sortBy}`;
      if (searchStatus !== "ALL") url += `&search=${searchStatus}`;

      const res = await axios.get(url);
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
      }));

      setPainters(formatted);
      setTotal(res.data.data.total);
    } catch (err) {
      console.error("Failed to fetch painters", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPainters();
  }, [currentPage, perPage, searchStatus, sortBy]);

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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center md:pt-[2rem]">
        <button
          className="bg-[#1A1A27] text-white px-6 py-2 rounded-full shadow font-medium"
          onClick={() => setIsModalOpen4(true)}
        >
          Add Painter
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-8">
          <ClipLoader size={30} color="#0B1C39" />
        </div>
      ) : (
        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex flex-wrap gap-4 md:items-center justify-between mb-4">
            <div className="flex flex-wrap gap-2">
              <select
                value={searchStatus}
                onChange={(e) => {
                  setCurrentPage(1);
                  setSearchStatus(e.target.value);
                }}
                className="border border-gray-300 px-3 py-2 rounded-full text-sm"
              >
                <option value="ALL">All Status</option>
                <option value="ACTIVE">Active</option>
                <option value="INACTIVE">Inactive</option>
              </select>

              <select
                value={sortBy}
                onChange={(e) => {
                  setCurrentPage(1);
                  setSortBy(e.target.value);
                }}
                className="border border-gray-300 px-3 py-2 rounded-full text-sm"
              >
                <option value="firstName">Sort by First Name</option>
                <option value="id">Sort by ID</option>
              </select>

              <select
                value={perPage}
                onChange={(e) => {
                  setCurrentPage(1);
                  setPerPage(Number(e.target.value));
                }}
                className="border border-gray-300 px-3 py-2 rounded-full text-sm"
              >
                {[10, 25, 50, 75, 100].map((num) => (
                  <option key={num}>{num}</option>
                ))}
              </select>
            </div>

            <div className="relative w-full md:max-w-sm">
              <input
                type="text"
                placeholder="Search by name"
                className="w-full border border-gray-300 rounded-full px-4 py-2 pl-10 text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
            </div>
          </div>

          <div className="overflow-x-auto hidden md:block">
            <table className="w-full text-left text-sm border-t ">
              <thead className="bg-[#eef4fa] text-gray-700 font-semibold">
                <tr>
                  <th className="py-3 px-4">ID</th>
                  <th className="py-3 px-4">Name</th>
                  <th className="py-3 px-4">Phone</th>
                  <th className="py-3 px-4">Address</th>
                  <th className="py-3 px-4">Email</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {painters
                  .filter((p) =>
                    p.name.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((painter, index) => (
                    <tr
                      key={painter.id}
                      className={index % 2 === 1 ? "bg-gray-100" : ""}
                    >
                      <td className="py-3 px-4">{painter.id}</td>
                      <td className="py-3 px-4 capitalize">{painter.name}</td>
                      <td className="py-3 px-4">{painter.phone}</td>
                      <td className="py-3 px-4">{painter.address || "—"}</td>
                      <td className="py-3 px-4">{painter.email || "—"}</td>
                      <td className="py-3 px-4">
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
                      <td className="py-3 px-4 flex items-center gap-2">
                        <button
                          onClick={() => openModal(painter)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <FaEye />
                        </button>
                        <button
                          onClick={() => openEditModal(painter)}
                          className="text-green-600 hover:text-green-800"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => openDeleteModal(painter)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Grid View */}
          <div className="md:hidden space-y-4 mt-4">
            {painters
              .filter((p) =>
                p.name.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((painter) => (
                <div
                  key={painter.id}
                  className="border rounded-lg p-4 shadow-sm bg-white"
                >
                  <div className="mb-1 text-base font-semibold text-[#1A1A27]">
                    {painter.name}
                  </div>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>
                      <span className="font-medium">Phone:</span>{" "}
                      {painter.phone}
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
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          painter.status === "ACTIVE"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
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

          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(total / perPage)}
            onPageChange={setCurrentPage}
            totalEntries={total}
            perPage={perPage}
          />
        </div>
      )}

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

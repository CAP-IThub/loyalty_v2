import React, { useEffect, useState } from "react";
import axios from "../../utils/axiosInstance";
import { FaSearch, FaEye, FaEdit, FaTrash } from "react-icons/fa";
import Pagination from "../../components/Pagination";
import { ClipLoader } from "react-spinners";
import AddCenterModal from "../../adminComponents/modals/centerModal/AddCenterModal";
import DeleteCenterModal from "../../adminComponents/modals/centerModal/DeleteCenterModal";
import EditCenterModal from "../../adminComponents/modals/centerModal/EditCenterModal";
import CenterModal from "../../adminComponents/modals/centerModal/CenterModal";

const Centers = () => {
  const [sortBy, setSortBy] = useState("name");
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
      const url = `/shop?page=${currentPage}&per_page=${perPage}&sort_by=${sortBy}&sort_order=asc`;
      const res = await axios.get(url);
      setCenters(res.data.data.data);
      setTotal(res.data.data.total);
    } catch (err) {
      console.error("Failed to fetch centers", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCenters();
  }, [currentPage, perPage, sortBy]);

  const openModal = (c) => {
    setSelectedCenter(c);
    setIsModalOpen(true);
  };
  const openEditModal = (c) => {
    setSelectedCenter(c);
    setIsModalOpen2(true);
  };
  const openDeleteModal = (c) => {
    setSelectedCenter(c);
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

  const filtered = centers.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center md:pt-[2rem]">
        <button
          className="bg-[#1A1A27] text-white px-6 py-2 rounded-full shadow font-medium"
          onClick={() => setIsModalOpen4(true)}
        >
          Add Center
        </button>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md">
        <div className="flex flex-wrap gap-4 md:items-center justify-between mb-4">
          <div className="flex gap-2">
            <select
              value={sortBy}
              onChange={(e) => {
                setCurrentPage(1);
                setSortBy(e.target.value);
              }}
              className="border border-gray-300 px-3 py-2 rounded-full text-sm"
            >
              <option value="name">Sort by Name</option>
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

        {/* Desktop Table */}
        {loading ? (
          <div className="flex justify-center py-8">
            <ClipLoader size={30} color="#0B1C39" />
          </div>
        ) : (
          <div className="overflow-x-auto hidden md:block">
            <table className="w-full text-left text-sm border-t">
              <thead className="bg-[#eef4fa] text-gray-700 font-semibold">
                <tr>
                  <th className="py-3 px-4">ID</th>
                  <th className="py-3 px-4">Shop Code</th>
                  <th className="py-3 px-4">Name</th>
                  <th className="py-3 px-4">Address</th>
                  <th className="py-3 px-4">Choice</th>
                  <th className="py-3 px-4">Partner Status</th>
                  <th className="py-3 px-4">Rep Status</th>
                  <th className="py-3 px-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((center, index) => (
                  <tr
                    key={center.id}
                    className={index % 2 ? "bg-gray-100" : ""}
                  >
                    <td className="py-3 px-4">{center.id}</td>
                    <td className="py-3 px-4">{center.shopCode}</td>
                    <td className="py-3 px-4 capitalize">{center.name}</td>
                    <td className="py-3 px-4">{center.address || "—"}</td>
                    <td className="py-3 px-4 capitalize">
                      {center.choice || "—"}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium flex items-center justify-center ${
                          center.status === "ASSIGNED-TO-PARTNER"
                            ? "bg-green-100 text-green-700 text-center"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {center.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium flex items-center justify-center ${
                          center.status2 === "ASSIGNED-TO-REP"
                            ? "bg-green-100 text-green-700 text-center"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {center.status2}
                      </span>
                    </td>
                    <td className="py-3 px-4 flex items-center gap-2">
                      <button
                        onClick={() => openModal(center)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <FaEye />
                      </button>
                      <button
                        onClick={() => openEditModal(center)}
                        className="text-green-600 hover:text-green-800"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => openDeleteModal(center)}
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
        )}

        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(total / perPage)}
          onPageChange={setCurrentPage}
          totalEntries={total}
          perPage={perPage}
        />
      </div>

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

import React, { useEffect, useState } from "react";
import axios from "../../utils/axiosInstance";
import { FaSearch, FaEye, FaEdit, FaTrash } from "react-icons/fa";
import Pagination from "../../components/Pagination";
import { ClipLoader } from "react-spinners";
import AddRepModal from "../../adminComponents/modals/repModal/AddRepModal";
import DeleteRepModal from "../../adminComponents/modals/repModal/DeleteRepModal";
import EditRepModal from "../../adminComponents/modals/repModal/EditRepModal";
import RepModal from "../../adminComponents/modals/repModal/RepModal";

const Reps = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [reps, setReps] = useState([]);
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedRep, setSelectedRep] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [isModalOpen3, setIsModalOpen3] = useState(false);
  const [isModalOpen4, setIsModalOpen4] = useState(false);

  const fetchReps = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/reps");
      const formatted = res.data.data.rep.map((rep) => ({
        id: rep.id,
        name: `${
          rep.firstName[0].toUpperCase() + rep.firstName.slice(1).toLowerCase()
        } ${
          rep.lastName[0].toUpperCase() + rep.lastName.slice(1).toLowerCase()
        }`,
        firstName: `${
          rep.firstName[0].toUpperCase() + rep.firstName.slice(1).toLowerCase()
        }`,
        lastName: `${
          rep.lastName[0].toUpperCase() + rep.lastName.slice(1).toLowerCase()
        }`,
        phone: rep.phoneNum,
        email: rep.email,
      }));
      setReps(formatted);
    } catch (err) {
      console.error("Failed to fetch reps", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReps();
  }, []);

  const filtered = reps.filter((rep) =>
    rep.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginated = filtered.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  const openModal = (rep) => {
    setSelectedRep(rep);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRep(null);
  };

  const openEditModal = (rep) => {
    setSelectedRep(rep);
    setIsModalOpen2(true);
  };

  const closeEditModal = () => {
    setIsModalOpen2(false);
    setSelectedRep(null);
  };

  const openDeleteModal = (rep) => {
    setSelectedRep(rep);
    setIsModalOpen3(true);
  };

  const closeDeleteModal = () => {
    setIsModalOpen3(false);
    setSelectedRep(null);
  };

  const openAddModal = () => {
    setIsModalOpen4(true);
  };

  const closeAddModal = () => {
    setIsModalOpen4(false);
  };

  const onUpdate = () => {
    fetchReps();
  };

  const onDelete = () => {
    fetchReps();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center md:pt-[2rem]">
        <button
          className="bg-[#1A1A27] text-white px-6 py-2 rounded-lg shadow font-medium"
          onClick={() => openAddModal()}
        >
          Add Rep
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-8">
          <ClipLoader size={30} color="#0B1C39" />
        </div>
      ) : (
        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
            <div className="relative w-full md:max-w-sm">
              <input
                type="text"
                placeholder="Search table"
                className="w-full border border-gray-300 rounded-full px-4 py-2 pl-10 text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
            </div>
            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-600">No. of Column</label>
              <select
                value={perPage}
                onChange={(e) => setPerPage(Number(e.target.value))}
                className="border border-gray-300 px-3 py-2 rounded-full text-sm"
              >
                {[5, 10, 20, 50].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left text-sm border-t">
              <thead className="bg-[#eef4fa] text-gray-700 font-semibold">
                <tr>
                  <th className="py-3 px-4">ID</th>
                  <th className="py-3 px-4">Name</th>
                  <th className="py-3 px-4">Phone</th>
                  <th className="py-3 px-4">Email</th>
                  <th className="py-3 px-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {paginated.map((rep, index) => (
                  <tr key={rep.id} className={index % 2 ? "bg-gray-100" : ""}>
                    <td className="py-3 px-4 text-sm">{rep.id}</td>
                    <td className="py-3 px-4 text-sm capitalize">{rep.name}</td>
                    <td className="py-3 px-4 text-sm">{rep.phone}</td>
                    <td className="py-3 px-4 text-sm">{rep.email || "—"}</td>
                    <td className="py-3 px-4 flex items-center gap-2">
                      <button
                        onClick={() => openModal(rep)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <FaEye />
                      </button>
                      <button
                        className="text-green-600 hover:text-green-800"
                        onClick={() => openEditModal(rep)}
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="text-red-600 hover:text-red-800"
                        onClick={() => openDeleteModal(rep)}
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
          <div className="md:hidden space-y-4">
            {paginated.map((rep) => (
              <div
                key={rep.id}
                className="border border-gray-200 rounded-lg p-4 shadow-sm"
              >
                <div className="mb-2 font-semibold text-[#0B0F28] text-base">
                  {rep.name}
                </div>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>
                    <span className="font-semibold">Phone:</span> {rep.phone}
                  </p>
                  <p>
                    <span className="font-semibold">Email:</span>{" "}
                    {rep.email || "—"}
                  </p>
                </div>
                <div className="flex justify-end gap-3 mt-3">
                  <button
                    className="text-blue-600 hover:text-blue-800"
                    onClick={() => openModal(rep)}
                  >
                    <FaEye />
                  </button>
                  <button
                    className="text-green-600 hover:text-green-800"
                    onClick={() => openEditModal(rep)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="text-red-600 hover:text-red-800"
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
            totalPages={Math.ceil(filtered.length / perPage)}
            onPageChange={setCurrentPage}
            totalEntries={filtered.length}
            perPage={perPage}
          />
        </div>
      )}

      <RepModal
        isOpen={isModalOpen}
        closeRepModal={closeModal}
        rep={selectedRep}
      />

      <EditRepModal
        isOpen={isModalOpen2}
        closeRepModal={closeEditModal}
        rep={selectedRep}
        onUpdate={onUpdate}
      />

      <DeleteRepModal
        isOpen={isModalOpen3}
        closeDeleteModal={closeDeleteModal}
        rep={selectedRep}
        onDelete={onDelete}
      />

      <AddRepModal
        isOpen={isModalOpen4}
        closeRepModal={closeAddModal}
        onUpdate={onUpdate}
      />
    </div>
  );
};

export default Reps;

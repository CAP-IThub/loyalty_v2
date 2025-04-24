import React, { useEffect, useState } from "react";
import axios from "../../utils/axiosInstance";
import { FaSearch, FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { MdPerson } from "react-icons/md";
import Pagination from "../../components/Pagination";
import { ClipLoader } from "react-spinners";
import PartnerModal from "../../adminComponents/modals/partnerModal/PartnerModal";
import EditPartnerModal from "../../adminComponents/modals/partnerModal/EditPartnerModal";
import DeletePartnerModal from "../../adminComponents/modals/partnerModal/DeletePartnerModal";
import AddPartnerModal from "../../adminComponents/modals/partnerModal/AddPartnerModal";

const Partners = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [partners, setPartners] = useState([]);
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [isModalOpen3, setIsModalOpen3] = useState(false);
  const [isModalOpen4, setIsModalOpen4] = useState(false);

  const fetchPartners = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/partner");
      const formatted = res.data.data.partner.map((p) => ({
        id: p.id,
        name: `${
          p.firstName[0].toUpperCase() + p.firstName.slice(1).toLowerCase()
        } ${p.lastName[0].toUpperCase() + p.lastName.slice(1).toLowerCase()}`,
        firstName: `${
          p.firstName[0].toUpperCase() + p.firstName.slice(1).toLowerCase()
        }`,
        lastName: `${
          p.lastName[0].toUpperCase() + p.lastName.slice(1).toLowerCase()
        }`,
        phone: p.phoneNum,
        address: p.address,
        email: p.email,
      }));
      setPartners(formatted);
    } catch (err) {
      console.error("Failed to fetch partners", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPartners();
  }, []);

  const filtered = partners.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginated = filtered.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  const openModal = (partner) => {
    setSelectedPartner(partner);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPartner(null);
  };

  const openEditModal = (partner) => {
    setSelectedPartner(partner);
    setIsModalOpen2(true);
  };

  const closeEditModal = () => {
    setIsModalOpen2(false);
    setSelectedPartner(null);
  };

  const openDeleteModal = (partner) => {
    setSelectedPartner(partner);
    setIsModalOpen3(true);
  };

  const closeDeleteModal = () => {
    setIsModalOpen3(false);
    setSelectedPartner(null);
  };

  const openAddModal = () => {
    setIsModalOpen4(true);
  };

  const closeAddModal = () => {
    setIsModalOpen4(false);
  };

  const onUpdate = () => {
    fetchPartners();
  };

  const onDelete = () => {
    fetchPartners();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center md:pt-[2rem]">
        <button
          className="bg-[#1A1A27] text-white px-6 py-2 rounded-lg shadow font-medium"
          onClick={() => openAddModal()}
        >
          Add Partner
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
                  <th className="py-3 px-4">Address</th>
                  <th className="py-3 px-4">Email</th>
                  <th className="py-3 px-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {paginated.map((partner, index) => (
                  <tr
                    key={partner.id}
                    className={index % 2 ? "bg-gray-100" : ""}
                  >
                    <td className="py-3 px-4 text-sm">{partner.id}</td>
                    <td className="py-3 px-4 text-sm capitalize">
                      {partner.name}
                    </td>
                    <td className="py-3 px-4 text-sm">{partner.phone}</td>
                    <td className="py-3 px-4 text-sm">
                      {partner.address || "—"}
                    </td>
                    <td className="py-3 px-4 text-sm">
                      {partner.email || "—"}
                    </td>
                    <td className="py-3 px-4 flex items-center gap-2">
                      <button
                        onClick={() => openModal(partner)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <FaEye />
                      </button>
                      <button
                        className="text-green-600 hover:text-green-800"
                        onClick={() => openEditModal(partner)}
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="text-red-600 hover:text-red-800"
                        onClick={() => openDeleteModal(partner)}
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
            {paginated.map((partner) => (
              <div
                key={partner.id}
                className="border border-gray-200 rounded-lg p-4 shadow-sm"
              >
                <div className="mb-2 font-semibold text-[#0B0F28] text-base">
                  {partner.name}
                </div>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>
                    <span className="font-semibold">Phone:</span>{" "}
                    {partner.phone}
                  </p>
                  <p className="truncate">
                    <span className="font-semibold">Address:</span>{" "}
                    {partner.address || "—"}
                  </p>
                  <p>
                    <span className="font-semibold">Email:</span>{" "}
                    {partner.email || "—"}
                  </p>
                </div>
                <div className="flex justify-end gap-3 mt-3">
                  <button
                    className="text-blue-600 hover:text-blue-800"
                    onClick={() => openModal(partner)}
                  >
                    <FaEye />
                  </button>
                  <button
                    className="text-green-600 hover:text-green-800"
                    onClick={() => openEditModal(partner)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="text-red-600 hover:text-red-800"
                    onClick={() => openDeleteModal(partner)}
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

      <PartnerModal
        isOpen={isModalOpen}
        closePartnerModal={closeModal}
        partner={selectedPartner}
      />

      <EditPartnerModal
        isOpen={isModalOpen2}
        closePartnerModal={closeEditModal}
        partner={selectedPartner}
        onUpdate={onUpdate}
      />

      <DeletePartnerModal
        isOpen={isModalOpen3}
        closeDeleteModal={closeDeleteModal}
        partner={selectedPartner}
        onDelete={onDelete}
      />

      <AddPartnerModal
        isOpen={isModalOpen4}
        closePartnerModal={closeAddModal}
        onUpdate={onUpdate}
      />
    </div>
  );
};

export default Partners;

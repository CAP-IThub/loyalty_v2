import React, { useEffect, useState, Fragment } from "react";
import axios from "../../utils/axiosInstance";
import { FaSearch, FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { HiDotsVertical } from "react-icons/hi";
import Pagination from "../../components/Pagination";
import { ClipLoader } from "react-spinners";
import PartnerModal from "../../adminComponents/modals/partnerModal/PartnerModal";
import EditPartnerModal from "../../adminComponents/modals/partnerModal/EditPartnerModal";
import DeletePartnerModal from "../../adminComponents/modals/partnerModal/DeletePartnerModal";
import AddPartnerModal from "../../adminComponents/modals/partnerModal/AddPartnerModal";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { IoIosPersonAdd } from "react-icons/io";

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

  const truncateAddress = (address, wordLimit = 3) => {
    const words = address.split(" ");
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..."
      : address;
  };

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

  const openEditModal = (partner) => {
    setSelectedPartner(partner);
    setIsModalOpen2(true);
  };

  const openDeleteModal = (partner) => {
    setSelectedPartner(partner);
    setIsModalOpen3(true);
  };

  return (
    <div className="py-6 px-2 space-y-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
        <div>
          <h2 className="md:text-lg font-semibold">Partners</h2>
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
            <IoIosPersonAdd size={16} /> Add Partner
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
                  <th className="text-left px-3 py-4 border-b">Name</th>
                  <th className="text-left px-3 py-4 border-b">Phone</th>
                  <th className="text-left px-3 py-4 border-b">Address</th>
                  <th className="text-left px-3 py-4 border-b">Email</th>
                  <th className="text-left px-3 py-4 border-b">View</th>
                  <th className="text-left px-3 py-4 border-b"></th>
                </tr>
              </thead>
              <tbody>
                {paginated.map((partner) => (
                  <tr
                    key={partner.id}
                    className="bg-white border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="px-3 py-4 capitalize">{partner.name}</td>
                    <td className="px-3 py-4">{partner.phone}</td>
                    <td className="px-3 py-4">
                      {truncateAddress(partner.address)}
                    </td>
                    <td className="px-3 py-4">{partner.email}</td>
                    <td className="px-3 py-4">
                      <button
                        className="text-blue-600"
                        onClick={() => openModal(partner)}
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
                          <MenuItems className="absolute right-0 mt-2 w-28 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                            <div className="py-1 flex flex-col">
                              <MenuItem>
                                {({ active }) => (
                                  <button
                                    onClick={() => openEditModal(partner)}
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
                                    onClick={() => openDeleteModal(partner)}
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
            {paginated.map((partner) => (
              <div
                key={partner.id}
                className="border border-gray-200 rounded-lg p-4 shadow-md bg-white"
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
        </>
      )}

      <PartnerModal
        isOpen={isModalOpen}
        closePartnerModal={() => setIsModalOpen(false)}
        partner={selectedPartner}
      />
      <EditPartnerModal
        isOpen={isModalOpen2}
        closePartnerModal={() => setIsModalOpen2(false)}
        partner={selectedPartner}
        onUpdate={fetchPartners}
      />
      <DeletePartnerModal
        isOpen={isModalOpen3}
        closeDeleteModal={() => setIsModalOpen3(false)}
        partner={selectedPartner}
        onDelete={fetchPartners}
      />
      <AddPartnerModal
        isOpen={isModalOpen4}
        closePartnerModal={() => setIsModalOpen4(false)}
        onUpdate={fetchPartners}
      />
    </div>
  );
};

export default Partners;

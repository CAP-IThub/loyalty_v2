import React, { useEffect, useState, Fragment } from "react";
import axios from "../../../../utils/axiosInstance";
import { FaSearch, FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { HiDotsVertical } from "react-icons/hi";
import { ClipLoader } from "react-spinners";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { MdAssignmentTurnedIn } from "react-icons/md";
import AddTierModal from "../../../../adminComponents/modals/settingsModals/tierModal/AddTierModal";
import EditTierModal from "../../../../adminComponents/modals/settingsModals/tierModal/EditTierModal";
import DeleteTierModal from "../../../../adminComponents/modals/settingsModals/tierModal/DeleteTierModal";
import TierModal from "../../../../adminComponents/modals/settingsModals/tierModal/TierModal";
import Pagination from "../../../../components/Pagination";

const LoyaltyTierLevels = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [tiers, setTiers] = useState([]);
  const [selectedTier, setSelectedTier] = useState(null);
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [isModalOpen3, setIsModalOpen3] = useState(false);
  const [isModalOpen4, setIsModalOpen4] = useState(false);

  const fetchTiers = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/v2/loyaltytier");
      const formatted = res.data.data.data.map((t) => ({
        id: t.id,
        name: t.name,
        min_points: t.min_points,
        max_points: t.max_points,
        description: t.description,
        created_at: t.created_at,
        updated_at: t.updated_at,
        serial_num: t.serial_num,
      }));
      setTiers(formatted);
    } catch (err) {
      console.error("Failed to fetch tiers", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTiers();
  }, []);

  const filtered = tiers.filter((t) =>
    t.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginated = filtered.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  const openModal = (tier) => {
    setSelectedTier(tier);
    setIsModalOpen(true);
  };

  const openEditModal = (tier) => {
    setSelectedTier(tier);
    setIsModalOpen2(true);
  };

  const openDeleteModal = (tier) => {
    setSelectedTier(tier);
    setIsModalOpen3(true);
  };

  const onUpdate = () => fetchTiers();
  const onDelete = () => fetchTiers();

  return (
    <div className="pb-6 px-2 space-y-3">
      <div>
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
          <h2 className="md:text-lg font-semibold">Loyalty Tier Levels</h2>
          <div className="flex gap-4 flex-wrap">
            <div>
              <div className="relative w-[100px] md:w-[350px]">
                <input
                  type="text"
                  placeholder="Search by tier name..."
                  className="w-full border border-gray-300 rounded-md px-4 py-2 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-[#FC7B00]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <FaSearch className="absolute left-3 top-3 text-gray-400" />
              </div>
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
              <MdAssignmentTurnedIn size={16} /> Add Tier
            </button>
          </div>
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
                  <th className="text-left px-3 py-4 border-b">S/N</th>
                  <th className="text-left px-3 py-4 border-b">Name</th>
                  <th className="text-left px-3 py-4 border-b">Min Points</th>
                  <th className="text-left px-3 py-4 border-b">Max Points</th>
                  <th className="text-left px-3 py-4 border-b">View</th>
                  <th className="text-left px-3 py-4 border-b"></th>
                </tr>
              </thead>
              <tbody>
                {paginated.map((tier) => (
                  <tr
                    key={tier.id}
                    className="bg-white border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="px-3 py-4">{tier.serial_num}</td>
                    <td className="px-3 py-4">{tier.name}</td>
                    <td className="px-3 py-4">{tier.min_points}</td>
                    <td className="px-3 py-4">{tier.max_points}</td>
                    <td className="px-3 py-4">
                      <button
                        className="text-blue-600"
                        onClick={() => openModal(tier)}
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
                          leaveFrom="opacity-100 scale-100"
                          leaveTo="opacity-0 scale-95"
                        >
                          <MenuItems className="absolute right-3 bottom-0 mt-2 w-28 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                            <div className="py-1 flex flex-col">
                              <MenuItem>
                                {({ active }) => (
                                  <button
                                    onClick={() => openEditModal(tier)}
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
                                    onClick={() => openDeleteModal(tier)}
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

          <div className="md:hidden space-y-4">
            {paginated.map((tier) => (
              <div
                key={tier.id}
                className="border border-gray-200 rounded-lg p-4 shadow-md bg-white"
              >
                <div className="mb-2 font-semibold text-[#0B0F28] text-base">
                  {tier.name}
                </div>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>
                    <span className="font-semibold">Min Points:</span>{" "}
                    {tier.min_points}
                  </p>
                  <p>
                    <span className="font-semibold">Max Points:</span>{" "}
                    {tier.max_points}
                  </p>
                </div>
                <div className="flex justify-end gap-3 mt-3">
                  <button
                    className="text-blue-600 hover:text-blue-800"
                    onClick={() => openModal(tier)}
                  >
                    <FaEye />
                  </button>
                  <button
                    className="text-green-600 hover:text-green-800"
                    onClick={() => openEditModal(tier)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="text-red-600 hover:text-red-800"
                    onClick={() => openDeleteModal(tier)}
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

      <TierModal
        isOpen={isModalOpen}
        closeTierModal={() => setIsModalOpen(false)}
        tier={selectedTier}
      />
      <EditTierModal
        isOpen={isModalOpen2}
        closeTierModal={() => setIsModalOpen2(false)}
        tier={selectedTier}
        onUpdate={onUpdate}
      />
      <DeleteTierModal
        isOpen={isModalOpen3}
        closeDeleteModal={() => setIsModalOpen3(false)}
        tier={selectedTier}
        onDelete={onDelete}
      />
      <AddTierModal
        isOpen={isModalOpen4}
        closeTierModal={() => setIsModalOpen4(false)}
        onUpdate={onUpdate}
      />
    </div>
  );
};

export default LoyaltyTierLevels;

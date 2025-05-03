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
import { IoIosPersonAdd } from "react-icons/io";
import { MdAssignmentTurnedIn } from "react-icons/md";
import AddCampaignModal from "../../../../adminComponents/modals/settingsModals/campaignsModal/AddCampaignModal";
import EditCampaignModal from "../../../../adminComponents/modals/settingsModals/campaignsModal/EditCampaignModal";
import DeleteCampaignModal from "../../../../adminComponents/modals/settingsModals/campaignsModal/DeleteCampaignModal";
import CampaignModal from "../../../../adminComponents/modals/settingsModals/campaignsModal/CampaignModal";
import Pagination from "../../../../components/Pagination";

const LoyaltyCampaigns = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchStatus, setSearchStatus] = useState("ALL");
  const [campaigns, setCampaigns] = useState([]);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [isModalOpen3, setIsModalOpen3] = useState(false);
  const [isModalOpen4, setIsModalOpen4] = useState(false);

  const fetchCampaigns = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/v2/campaigns");
      const formatted = res.data.data.data.map((p) => ({
        id: p.id,
        name: p.name,
        campaign_code: p.campaign_code,
        description: p.description,
        store_type: p.store_type,
        category: p.category,
        start_date: p.start_date,
        end_date: p.end_date,
        tier: p.tier,
        discount: p.discount,
        referral_bonus: p.referral_bonus,
        status: p.status,
        serial_num: p.serial_num,
      }));

      setCampaigns(formatted);
    } catch (err) {
      console.error("Failed to fetch campaigns", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const filtered = campaigns.filter((p) => {
    const matchSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.campaign_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.category &&
        p.category.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchStatus =
      searchStatus === "ALL" ||
      p.status.toLowerCase() === searchStatus.toLowerCase();

    return matchSearch && matchStatus;
  });


  const paginated = filtered.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  const openModal = (campaign) => {
    setSelectedCampaign(campaign);
    setIsModalOpen(true);
  };

  const openEditModal = (campaign) => {
    setSelectedCampaign(campaign);
    setIsModalOpen2(true);
  };

  const openDeleteModal = (campaign) => {
    setSelectedCampaign(campaign);
    setIsModalOpen3(true);
  };

  const onUpdate = () => fetchCampaigns();
  const onDelete = () => fetchCampaigns();

  return (
    <div className="pb-6 px-2 space-y-3">
      <div>
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-2 gap-4">
          <div>
            <h2 className="md:text-lg font-semibold">Loyalty Campaigns</h2>
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
              <MdAssignmentTurnedIn size={16} /> Add Campaign
            </button>
          </div>
        </div>
        <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
          <div className="flex gap-2 items-center">
            <div className="text-sm">Filter by:</div>
            <select
              value={searchStatus}
              onChange={(e) => {
                setCurrentPage(1);
                setSearchStatus(e.target.value);
              }}
              className="border border-gray-300 px-4 py-2 rounded-lg text-sm shadow-sm"
            >
              <option value="ALL">Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
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
        <div className="flex justify-center py-10">
          <ClipLoader size={30} color="#0B1C39" />
        </div>
      ) : (
        <>
          <div className="hidden md:block overflow-x-auto border border-gray-200 rounded-xl ">
            <table className="w-full text-sm whitespace-nowrap">
              <thead className="bg-gray-100 text-gray-600 text-xs uppercase tracking-wide">
                <tr>
                  <th className="text-left px-3 py-4 border-b">S/N</th>
                  <th className="text-left px-3 py-4 border-b">
                    Campaign Code
                  </th>
                  <th className="text-left px-3 py-4 border-b">Name</th>
                  <th className="text-left px-3 py-4 border-b">Category</th>
                  <th className="text-left px-3 py-4 border-b">Discount(%)</th>
                  <th className="text-left px-3 py-4 border-b">Status</th>
                  <th className="text-left px-3 py-4 border-b">View</th>
                  <th className="text-left px-3 py-4 border-b"></th>
                </tr>
              </thead>
              <tbody>
                {paginated.map((campaign) => (
                  <tr
                    key={campaign.id}
                    className="bg-white border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="px-3 py-4 capitalize">
                      {campaign.serial_num}
                    </td>
                    <td className="px-3 py-4 capitalize">
                      {campaign.campaign_code}
                    </td>
                    <td className="px-3 py-4">{campaign.name}</td>
                    <td className="px-3 py-4">{campaign.category || "—"}</td>
                    <td className="px-3 py-4">{campaign.discount}</td>
                    <td className="px-3 py-4">
                      <span
                        className={`px-2 py-1 rounded-md  text-xs font-medium capitalize ${
                          campaign.status === "active"
                            ? "text-white bg-green-500"
                            : "text-white bg-red-500"
                        }`}
                      >
                        {campaign.status}
                      </span>
                    </td>
                    <td className="px-3 py-4">
                      <button
                        className="text-blue-600"
                        onClick={() => openModal(campaign)}
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
                                    onClick={() => openEditModal(campaign)}
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
                                    onClick={() => openDeleteModal(campaign)}
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
            {paginated.map((campaign) => (
              <div
                key={campaign.id}
                className="border border-gray-200 rounded-lg p-4 shadow-md bg-white"
              >
                <div className="mb-2 font-semibold text-[#0B0F28] text-base">
                  {campaign.name}
                </div>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>
                    <span className="font-semibold">Campaign Code:</span>{" "}
                    {campaign.campaign_code}
                  </p>
                  <p>
                    <span className="font-semibold">Category:</span>{" "}
                    {campaign.category || "—"}
                  </p>
                  <p>
                    <span className="font-semibold">Discount:</span>{" "}
                    {campaign.discount || "—"}
                  </p>
                  <p>
                    <span className="font-medium">Status:</span>{" "}
                    <span
                      className={`px-2 py-1 rounded-md text-xs font-medium capitalize  ${
                        campaign.status === "active"
                          ? "text-white bg-green-500"
                          : "text-white bg-red-500"
                      }`}
                    >
                      {campaign.status}
                    </span>
                  </p>
                </div>
                <div className="flex justify-end gap-3 mt-3">
                  <button
                    className="text-blue-600 hover:text-blue-800"
                    onClick={() => openModal(campaign)}
                  >
                    <FaEye />
                  </button>
                  <button
                    className="text-green-600 hover:text-green-800"
                    onClick={() => openEditModal(campaign)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="text-red-600 hover:text-red-800"
                    onClick={() => openDeleteModal(campaign)}
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

      <CampaignModal
        isOpen={isModalOpen}
        closeCampaignModal={() => setIsModalOpen(false)}
        campaign={selectedCampaign}
      />
      <EditCampaignModal
        isOpen={isModalOpen2}
        closeCampaignModal={() => setIsModalOpen2(false)}
        campaign={selectedCampaign}
        onUpdate={onUpdate}
      />
      <DeleteCampaignModal
        isOpen={isModalOpen3}
        closeDeleteModal={() => setIsModalOpen3(false)}
        campaign={selectedCampaign}
        onDelete={onDelete}
      />
      <AddCampaignModal
        isOpen={isModalOpen4}
        closeCampaignModal={() => setIsModalOpen4(false)}
        onUpdate={onUpdate}
      />
    </div>
  );
};

export default LoyaltyCampaigns;

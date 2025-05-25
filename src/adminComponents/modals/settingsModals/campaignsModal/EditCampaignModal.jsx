import React, { useState, useEffect, Fragment } from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { IoClose } from "react-icons/io5";
import axios from "../../../../utils/axiosInstance";
import toast from "react-hot-toast";

const EditCampaignModal = ({
  isOpen,
  closeCampaignModal,
  campaign,
  onUpdate,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    start_date: "",
    end_date: "",
    status: "active",
    discount: "",
    description: "",
    category: "",
    store_type: "dulux",
  });
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  const formatDateToInput = (dateStr) => {
    if (!dateStr) return "";
    const [day, monthStr, year] = dateStr.split("-");
    const monthMap = {
      Jan: "01",
      Feb: "02",
      Mar: "03",
      Apr: "04",
      May: "05",
      Jun: "06",
      Jul: "07",
      Aug: "08",
      Sep: "09",
      Oct: "10",
      Nov: "11",
      Dec: "12",
    };
    const month = monthMap[monthStr];
    return `${year}-${month}-${day.padStart(2, "0")}`;
  };
  

  useEffect(() => {
    if (campaign) {
      setFormData({
        name: campaign.name || "",
        start_date: formatDateToInput(campaign.start_date),
        end_date: formatDateToInput(campaign.end_date),
        status: campaign.status || "active",
        discount: campaign.discount || "",
        description: campaign.description || "",
        category: campaign.category || "",
        store_type: campaign.store_type || "",
      });
    }
  }, [campaign]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("/v2/paintercategory");
        const names = res.data.data.data.map((c) => c.name);
        setCategories(names);
      } catch (err) {
        console.error("Failed to fetch categories", err);
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      ...formData,
      description:
        formData.description.trim() === "" ? null : formData.description,
    };

    const today = new Date().toISOString().split("T")[0];
    if (formData.start_date < today) {
      toast.error("Start date cannot be in the past");
      setLoading(false);
      return;
    }

    try {
      await axios.patch(`/v2/campaigns/${campaign.id}`, payload);
      toast.success("Campaign updated successfully");
      onUpdate();
      closeCampaignModal();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update campaign");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-[999]"
        onClose={closeCampaignModal}
      >
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/80" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white px-8 md:px-20 py-9 text-left align-middle shadow-2xl transition-all">
                <div className="flex items-center justify-between mb-6">
                  <DialogTitle
                    as="h3"
                    className="text-2xl font-semibold text-[#1A1A27]"
                  >
                    Edit Campaign
                  </DialogTitle>
                  <button onClick={closeCampaignModal}>
                    <IoClose
                      size={28}
                      className="text-gray-700 hover:text-gray-500"
                    />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium">
                      Campaign Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="mt-1 w-full border border-gray-300 px-4 py-2 rounded text-sm"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium">
                        Start Date
                      </label>
                      <input
                        type="date"
                        name="start_date"
                        value={formData.start_date}
                        onChange={handleChange}
                        required
                        min={new Date().toISOString().split("T")[0]}
                        className="mt-1 w-full border border-gray-300 px-4 py-2 rounded text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium">
                        End Date
                      </label>
                      <input
                        type="date"
                        name="end_date"
                        value={formData.end_date}
                        onChange={handleChange}
                        required
                        min={new Date().toISOString().split("T")[0]}
                        className="mt-1 w-full border border-gray-300 px-4 py-2 rounded text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium">
                      Discount (%)
                    </label>
                    <input
                      type="number"
                      name="discount"
                      value={formData.discount}
                      onChange={handleChange}
                      required
                      className="mt-1 w-full border border-gray-300 px-4 py-2 rounded text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium">
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows={3}
                      className="mt-1 w-full border border-gray-300 px-4 py-2 rounded text-sm"
                      placeholder="(Optional)"
                    ></textarea>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium">
                        Status
                      </label>
                      <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        required
                        className="mt-1 w-full border border-gray-300 px-4 py-2 rounded text-sm"
                      >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium">
                        Store Type
                      </label>
                      <select
                        name="store_type"
                        value={formData.store_type}
                        onChange={handleChange}
                        className="mt-1 w-full border border-gray-300 px-4 py-2 rounded text-sm"
                      >
                        <option value="">All Store Types</option>
                        <option value="dulux">Dulux</option>
                        <option value="sandtex">Sandtex</option>
                        <option value="combo">Combo</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium">
                      Category
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="mt-1 w-full border border-gray-300 px-4 py-2 rounded text-sm"
                    >
                      <option value="">All Categories</option>
                      {categories.map((name) => (
                        <option key={name} value={name}>
                          {name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="pt-4 text-right">
                    <button
                      type="submit"
                      disabled={loading}
                      className="bg-[#FC7B00] hover:bg-orange-600 text-white font-medium py-2 px-6 rounded-md text-sm"
                    >
                      {loading ? "Saving..." : "Save Changes"}
                    </button>
                  </div>
                </form>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default EditCampaignModal;

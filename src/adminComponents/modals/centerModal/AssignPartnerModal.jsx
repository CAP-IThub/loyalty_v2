import React, { useState, useEffect, Fragment } from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { IoClose } from "react-icons/io5";
import axios from "../../../utils/axiosInstance";
import toast from "react-hot-toast";

const AssignPartnerModal = ({ isOpen, closeCenterModal, onUpdate, center }) => {
  const [partners, setPartners] = useState([]);
  const [formData, setFormData] = useState({
    shopId: "",
    partnerId: "",
  });
  const [loading, setLoading] = useState(false);
//   console.log(center);
  

  useEffect(() => {
    if (center) {
      setFormData((prev) => ({ ...prev, shopId: center.id }));
    }
  }, [center]);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const res = await axios.get("/partner");
        setPartners(res.data.data.data);
        // console.log(res.data.data.data);
        
      } catch (error) {
        console.error("Failed to fetch partners", error);
        toast.error("Could not load partners");
      }
    };

    if (isOpen) fetchPartners();
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post("/shop/assign", formData);
      const successMsg = res?.data?.data || "Center successfully assigned";
      toast.success(successMsg);
      onUpdate();
      closeCenterModal();
    } catch (err) {
      console.error("Assignment failed", err);
      const errMsg = err?.response?.data?.message || "Failed to unassign center";
      toast.error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-[999]" onClose={closeCenterModal}>
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
                    Assign Center to Partner
                  </DialogTitle>
                  <button
                    type="button"
                    className="text-[#1A1A27] hover:text-gray-600"
                    onClick={closeCenterModal}
                  >
                    <IoClose size={28} />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Center Name
                    </label>
                    <input
                      type="text"
                      value={center?.name || ""}
                      disabled
                      className="mt-1 w-full border border-gray-300 bg-gray-100 rounded-md px-4 py-2 text-sm focus:outline-none placeholder:text-xs"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Partner
                    </label>
                    <select
                      name="partnerId"
                      value={formData.partnerId}
                      onChange={handleChange}
                      className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#FC7B00]"
                      required
                    >
                      <option value="">Select a partner</option>
                      {partners?.map((partner) => (
                        <option key={partner.id} value={partner.id}>
                          {partner.firstName} {partner.lastName}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-[#FC7B00] hover:bg-orange-600 text-white font-medium py-3 px-6 rounded-md text-sm transition"
                    >
                      {loading ? "Assigning..." : "Proceed to Assign Center"}
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

export default AssignPartnerModal;

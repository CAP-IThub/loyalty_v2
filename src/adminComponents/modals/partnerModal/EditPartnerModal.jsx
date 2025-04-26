import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { Fragment } from "react";
import { IoClose } from "react-icons/io5";
import axios from "../../../utils/axiosInstance";
import toast from "react-hot-toast";

const EditPartnerModal = ({ isOpen, closePartnerModal, partner, onUpdate }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNum: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (partner) {
      setFormData({
        firstName: partner.firstName || "",
        lastName: partner.lastName || "",
        phoneNum: partner.phone || "",
        email: partner.email || "",
      });
    }
  }, [partner]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.patch(`/partner/${partner.id}`, formData);
      toast.success("Partner info updated");
      onUpdate();
      closePartnerModal();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update partner");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-[999]" onClose={closePartnerModal}>
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
              <DialogPanel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white px-8 md:px-20 py-9 text-left align-middle shadow-2xl transition-all">
                <div className="flex items-center justify-between mb-4">
                  <DialogTitle
                    as="h3"
                    className="text-2xl font-semibold text-[#1A1A27]"
                  >
                    Edit Partner's Information
                  </DialogTitle>
                  <button
                    type="button"
                    className="text-[#1A1A27]"
                    onClick={closePartnerModal}
                  >
                    <IoClose size={28} />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        First Name
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#FC7B00]"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#FC7B00]"
                        required
                      />
                    </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      name="phone"
                      value={formData.phoneNum}
                      onChange={handleChange}
                      className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#FC7B00]"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      type="text"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FC7B00] text-sm"
                      required
                    />
                  </div>
                  <div className="md:col-span-2 mt-4 text-right">
                    <button
                      type="submit"
                      disabled={loading}
                      className="bg-[#FC7B00] hover:bg-orange-600 text-white font-medium py-2 px-6 rounded-md disabled:opacity-70 text-sm"
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

export default EditPartnerModal;

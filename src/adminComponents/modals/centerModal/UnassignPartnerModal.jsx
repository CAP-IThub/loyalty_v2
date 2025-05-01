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

const UnassignPartnerModal = ({
  isOpen,
  closeCenterModal,
  onUpdate,
  center,
}) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post("/shop/unassign", { id: center.id });

      const successMsg = res?.data?.data || "Center successfully unassigned";
      toast.success(successMsg);

      onUpdate();
      closeCenterModal();
    } catch (err) {
      console.error("Unassignment failed", err);
      const resData = err?.response?.data;
      const message =
        resData?.message &&
        typeof resData.message === "string" &&
        resData.message.trim()
          ? resData.message
          : resData?.error || "Failed to unassign center";
      toast.error(message);
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
              <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white px-8 py-8 text-left align-middle shadow-2xl transition-all">
                <div className="flex items-center justify-between mb-4">
                  <DialogTitle className="text-xl font-semibold text-[#1A1A27]">
                    Unassign Center from Partner
                  </DialogTitle>
                  <button
                    type="button"
                    className="text-[#1A1A27] hover:text-gray-600"
                    onClick={closeCenterModal}
                  >
                    <IoClose size={26} />
                  </button>
                </div>

                <p className="text-sm text-gray-700 mb-6">
                  Are you sure you want to unassign the center:{" "}
                  <strong>{center?.name}</strong>?
                </p>

                <form onSubmit={handleSubmit}>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#FC7B00] hover:bg-orange-600 text-white font-medium py-3 px-6 rounded-md text-sm transition"
                  >
                    {loading ? "Unassigning..." : "Confirm Unassign"}
                  </button>
                </form>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default UnassignPartnerModal;

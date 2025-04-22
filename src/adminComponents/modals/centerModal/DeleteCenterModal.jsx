import React, { useState } from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { Fragment } from "react";
import { IoClose } from "react-icons/io5";
import axiosInstance from "../../../utils/axiosInstance";
import { toast } from "react-hot-toast";

const DeleteCenterModal = ({
  isOpen,
  closeDeleteModal,
  partner,
  onDelete,
}) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!partner?.id) return;
    try {
      setLoading(true);
      await axiosInstance.delete(`/partner/${partner.id}`);
      toast.success("Partner deleted successfully");
      closeDeleteModal();
      if (onDelete) onDelete();
    } catch (error) {
      console.error("Failed to delete partner", error);
      toast.error("Failed to delete partner");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-[999]" onClose={closeDeleteModal}>
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
              <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <div className="flex items-center justify-between mb-4">
                  <DialogTitle className="text-lg font-medium text-[#1A1A27]">
                    Delete Partner
                  </DialogTitle>
                  <button
                    type="button"
                    className="text-[#1A1A27]"
                    onClick={closeDeleteModal}
                  >
                    <IoClose size={24} />
                  </button>
                </div>

                <p className="text-sm text-gray-600 mb-6">
                  Are you sure you want to delete{" "}
                  <strong>
                    {partner?.firstName} {partner?.lastName}
                  </strong>
                  ? This action cannot be undone.
                </p>

                <div className="flex justify-end gap-4">
                  <button
                    onClick={closeDeleteModal}
                    className="px-4 py-2 rounded-md border border-gray-300 text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDelete}
                    disabled={loading}
                    className="px-4 py-2 rounded-md bg-red-600 text-white text-sm hover:bg-red-700 disabled:opacity-60"
                  >
                    {loading ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default DeleteCenterModal;

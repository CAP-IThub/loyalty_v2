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
import { ClipLoader } from "react-spinners";

const PayoutModal = ({
  isOpen,
  onClose,
  onConfirm,
  selectedIds,
  loading,
  actionType = "approve", 
}) => {
  const isApprove = actionType === "approve";
  const [comment, setComment] = useState("");

  const handleClose = () => {
    setComment("");
    onClose();
  };
  

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-[999]" onClose={onClose}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/70" />
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
                <div className="flex justify-between items-center mb-4">
                  <DialogTitle
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    {isApprove
                      ? "Confirm Payout Approval"
                      : "Confirm Payout Decline"}
                  </DialogTitle>
                  <button onClick={onClose}>
                    <IoClose
                      size={22}
                      onClick={handleClose}
                      className="text-gray-600 hover:text-gray-900"
                    />
                  </button>
                </div>

                <div className="mt-2 text-sm text-gray-600">
                  {selectedIds.length > 0 ? (
                    <p>
                      Are you sure you want to{" "}
                      <strong>{isApprove ? "approve" : "decline"}</strong>{" "}
                      <strong>{selectedIds.length}</strong> selected payout
                      {selectedIds.length > 1 && "s"}?
                    </p>
                  ) : (
                    <p>
                      Are you sure you want to{" "}
                      <strong>
                        {isApprove
                          ? "approve all payouts"
                          : "decline all payouts"}
                      </strong>
                      ?
                    </p>
                  )}
                </div>

                <div>
                  {!isApprove && (
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Reason for Decline
                      </label>
                      <textarea
                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                        rows={3}
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        required
                        placeholder="Enter reason for declining payout request..."
                      />
                    </div>
                  )}

                  <div className="mt-6 flex justify-end gap-3">
                    <button
                      onClick={handleClose}
                      className="px-4 py-2 text-sm font-medium bg-gray-200 rounded hover:bg-gray-300"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => onConfirm(comment)}
                      disabled={loading}
                      className={`px-4 py-2 text-sm font-medium text-white rounded flex items-center justify-center gap-2 ${
                        isApprove
                          ? "bg-green-600 hover:bg-green-700"
                          : "bg-red-600 hover:bg-red-700"
                      } ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
                    >
                      {loading
                        ? "Processing..."
                        : isApprove
                        ? "Approve"
                        : "Decline"}
                    </button>
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default PayoutModal;

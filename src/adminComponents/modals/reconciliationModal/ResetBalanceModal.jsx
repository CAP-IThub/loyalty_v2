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

const ResetBalanceModal = ({
  isOpen,
  onClose,
  onConfirm,
  selectedIds,
  loading,
  payoutType,
  setPayoutType,
}) => {
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
                    Confirm Payout
                  </DialogTitle>
                  <button onClick={onClose}>
                    <IoClose
                      size={22}
                      className="text-gray-600 hover:text-gray-900"
                    />
                  </button>
                </div>

                <div className="mt-2 text-sm text-gray-600">
                  {selectedIds.length > 0 ? (
                    <p>
                      Are you sure you want to pay the balance for{" "}
                      <strong>{selectedIds.length}</strong> selected account
                      {selectedIds.length > 1 && "s"}?
                    </p>
                  ) : (
                    <p>
                      Are you sure you want to pay{" "}
                      <strong>all account balances</strong>?
                    </p>
                  )}
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Payout Type
                  </label>
                  <select
                    value={payoutType}
                    onChange={(e) => setPayoutType(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                  >
                    <option value="gateway_payout">Gateway Payout</option>
                    <option value="manual_payout">Manual Payout</option>
                  </select>
                </div>

                <div className="mt-6 flex justify-end gap-3">
                  <button
                    onClick={onClose}
                    className="px-4 py-2 text-sm font-medium bg-gray-200 rounded hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={onConfirm}
                    disabled={loading}
                    className={`px-4 py-2 text-sm font-medium text-white rounded flex items-center justify-center gap-2 ${
                      loading
                        ? "bg-orange-300 cursor-not-allowed"
                        : "bg-[#FC7B00] hover:bg-orange-600"
                    }`}
                  >
                    {loading ? (
                      <>
                        <ClipLoader size={16} color="#fff" />
                      </>
                    ) : (
                      "Pay"
                    )}
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

export default ResetBalanceModal;

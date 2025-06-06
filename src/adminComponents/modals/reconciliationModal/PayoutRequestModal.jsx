import React, { Fragment } from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { IoClose } from "react-icons/io5";
import { format } from "date-fns";

const PayoutRequestModal = ({ isOpen, onClose, payout }) => {
  const formatDate = (date) =>
    date ? format(new Date(date), "yyyy-MM-dd HH:mm:ss") : "—";

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
          <div className="flex min-h-full items-center justify-center p-6 text-center">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <div className="flex items-center justify-between mb-4">
                  <DialogTitle className="text-xl font-semibold text-[#1A1A27]">
                    Payout Request Info
                  </DialogTitle>
                  <button
                    onClick={onClose}
                    className="text-gray-500 hover:text-black"
                  >
                    <IoClose size={24} />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
                  <div>
                    <p className="text-xs text-gray-400">Type</p>
                    <p className="font-medium capitalize">
                      {payout?.type || "—"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Initiator Type</p>
                    <p className="font-medium capitalize">
                      {payout?.initiator_type || "—"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Initiator Name</p>
                    <p className="font-medium capitalize">
                      {payout?.initiator_firstName} {payout?.initiator_lastName}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Amount</p>
                    <p className="font-medium">
                      ₦{payout?.amount?.toLocaleString() || "—"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Status</p>
                    <p className="font-medium capitalize">
                      {payout?.status || "—"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Payout Status</p>
                    <p className="font-medium capitalize">
                      {payout?.payout_status || "—"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Ref ID</p>
                    <p className="font-medium break-words">
                      {payout?.ref || "—"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Approved At</p>
                    <p className="font-medium">
                      {formatDate(payout?.approved_at)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Rejected At</p>
                    <p className="font-medium">
                      {formatDate(payout?.rejected_at)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Created At</p>
                    <p className="font-medium">
                      {formatDate(payout?.created_at)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Updated At</p>
                    <p className="font-medium">
                      {formatDate(payout?.updated_at)}
                    </p>
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

export default PayoutRequestModal;

import React, { useState } from "react";
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from "@headlessui/react";
import { Fragment } from "react";
import { IoClose } from "react-icons/io5";
import userIcon from "../../assets/images/userIcon.png"

const AwardPointsModal = ({ isOpen, closeModal, awardResult }) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-[999]" onClose={closeModal}>
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
              <DialogPanel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left shadow-xl transition-all">
                <div className="flex justify-between items-center mb-4">
                  <DialogTitle className="text-xl font-bold text-orange-500">
                    🎉 Award Success
                  </DialogTitle>
                  <button onClick={closeModal}>
                    <IoClose size={22} />
                  </button>
                </div>

                <div className="space-y-2 text-sm text-gray-700">
                  <p>
                    <strong>Customer:</strong> {awardResult?.data?.customerName}
                  </p>
                  <p>
                    <strong>Phone:</strong> {awardResult?.data?.customerPhone}
                  </p>
                  <p>
                    <strong>Amount Purchased:</strong> ₦
                    {awardResult?.data?.amountPurchased}
                  </p>
                  <p>
                    <strong>Points Awarded:</strong>{" "}
                    {awardResult?.data?.awardedPoint}
                  </p>
                  <p>
                    <strong>Invoice Number:</strong>{" "}
                    {awardResult?.data?.invoiceNum}
                  </p>
                  <p>
                    <strong>Center:</strong> {awardResult?.data?.center}
                  </p>
                  <p>
                    <strong>New Total Points:</strong>{" "}
                    {awardResult?.data?.totalPoints}
                  </p>
                </div>

                <p className="mt-4 text-green-600 font-medium">
                  ✅ {awardResult?.message}
                </p>

                <div className="mt-6">
                  <button
                    onClick={closeModal}
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-md"
                  >
                    Close
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

export default AwardPointsModal;

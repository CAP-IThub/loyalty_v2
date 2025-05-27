import React, { useState, useEffect, Fragment } from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { IoClose } from "react-icons/io5";
import axios from "../../utils/axiosInstance";
import toast from "react-hot-toast";

const RedeemPointsModal = ({ isOpen, closeModal, statData, onSuccess }) => {
  const [formData, setFormData] = useState({ amount: "" });
  const [loading, setLoading] = useState(false);

  const availablePoints = statData?.currentPoints || 0;

  const nairaEquivalent = availablePoints.toLocaleString("en-NG", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.amount) return toast.error("Please enter an amount");
    if (Number(formData.amount) > availablePoints)
      return toast.error("Insufficient points");

    if (!statData?.accountNumber || !statData?.sortCode) {
      return toast.error("Bank details are incomplete.");
    }

    try {
      setLoading(true);
      const res = await axios.post("/v2/customer/withdraw", {
        amount: formData.amount,
        account_num: statData?.accountNumber,
        bank_code: statData?.sortCode,
      });

      const message = res.data?.message || "Withdrawal request submitted!";
      toast.success(message);
      closeModal();
      onSuccess?.();
    } catch (err) {
      const errorMessage =
        err?.response?.data?.message || "Failed to redeem points";
      toast.error(errorMessage);
      console.error("Withdrawal error:", err);
    } finally {
      setLoading(false);
    }
  };

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
                    Cash Withdrawal
                  </DialogTitle>
                  <button
                    type="button"
                    className="text-[#1A1A27] hover:text-gray-600"
                    onClick={closeModal}
                  >
                    <IoClose size={28} />
                  </button>
                </div>

                <p className="text-sm text-gray-500 mb-6">
                  Convert your points to cash
                </p>

                {/* Points Summary */}
                <div className="bg-white border rounded-lg p-5 flex justify-between items-center mb-6">
                  <div>
                    <p className="text-gray-500 text-sm">Available Points</p>
                    <p className="text-2xl font-semibold text-black">
                      {availablePoints.toLocaleString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-500 text-sm">Equivalent to</p>
                    <p className="text-xl font-bold text-green-600">
                      ₦{nairaEquivalent}
                    </p>
                  </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Amount to Redeem (₦)
                    </label>
                    <input
                      type="text"
                      name="amount"
                      value={formData.amount}
                      onChange={handleChange}
                      placeholder="Enter amount"
                      className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#FC7B00] hover:opacity-90 text-white text-sm font-medium px-4 py-3 rounded-md disabled:opacity-50"
                  >
                    {loading ? "Processing..." : "Withdraw"}
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

export default RedeemPointsModal;

import React, { useEffect, useState, Fragment } from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { IoClose } from "react-icons/io5";
import userIcon from "../../assets/images/userIcon.png";
import axios from "../../utils/axiosInstance";

const PainterInfoModal = ({ isOpen, closePainterModal }) => {
  const [painterData, setPainterData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPainter = async () => {
      try {
        setLoading(true);
        const res = await axios.get("/v2/customer/details");
        setPainterData(res.data.data);
      } catch (err) {
        console.error("Failed to fetch painter details", err);
      } finally {
        setLoading(false);
      }
    };

    if (isOpen) fetchPainter();
  }, [isOpen]);

  const customer = painterData?.customerDetails;
  const bank = customer?.details;

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-[999]" onClose={closePainterModal}>
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
              <DialogPanel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white px-6 py-8 text-left align-middle shadow-2xl transition-all">
                <div className="flex items-center justify-between mb-6">
                  <DialogTitle
                    as="h3"
                    className="text-xl font-semibold text-[#1A1A27]"
                  >
                    Painter Information
                  </DialogTitle>
                  <button
                    type="button"
                    className="text-gray-600 hover:text-gray-900"
                    onClick={closePainterModal}
                  >
                    <IoClose size={26} />
                  </button>
                </div>

                {loading ? (
                  <p className="text-center text-gray-500">Loading...</p>
                ) : (
                  <div className="space-y-8">
                    <div className="flex flex-col items-center justify-center gap-4">
                      <div className="w-[120px] h-[120px] rounded-full overflow-hidden border-4 border-[#FC7B00] shadow-md">
                        <img
                          src={userIcon}
                          alt="avatar"
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="w-full space-y-4 text-sm text-gray-700 pl-10">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-gray-400 text-xs uppercase">
                              First Name
                            </p>
                            <p className="font-medium">
                              {customer?.firstName || "-"}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-400 text-xs uppercase">
                              Last Name
                            </p>
                            <p className="font-medium">
                              {customer?.lastName || "-"}
                            </p>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-gray-400 text-xs uppercase">
                              Email
                            </p>
                            <p className="font-medium break-all">
                              {customer?.email || "-"}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-400 text-xs uppercase">
                              Phone Number
                            </p>
                            <p className="font-medium">
                              {customer?.phoneNum || "-"}
                            </p>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-gray-400 text-xs uppercase">
                              Gender
                            </p>
                            <p className="font-medium">
                              {customer?.gender || "-"}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-400 text-xs uppercase">
                              Tier
                            </p>
                            <p className="font-medium">
                              {painterData?.loyalty_tier?.name || "-"}
                            </p>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-gray-400 text-xs uppercase">
                              Current Balance
                            </p>
                            <p className="font-medium text-green-600">
                              {painterData?.current_balance?.point?.toLocaleString() ||
                                0}{" "}
                              pts
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-400 text-xs uppercase">
                              Lifetime Points
                            </p>
                            <p className="font-medium text-green-600">
                              {painterData?.lifetime_points?.toLocaleString() ||
                                0}{" "}
                              pts
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="pl-10">
                      <h4 className="text-sm font-semibold mb-2">
                        Bank Information
                      </h4>
                      {bank ? (
                        <ul className="list-disc ml-6 text-sm text-gray-700 space-y-1">
                          <li>
                            <strong>Bank Name:</strong> {bank.bank_name}
                          </li>
                          <li>
                            <strong>Account Name:</strong> {bank.account_name}
                          </li>
                          <li>
                            <strong>Account Number:</strong> {bank.account_num}
                          </li>
                          <li>
                            <strong>Sort Code:</strong> {bank.sort_code}
                          </li>
                        </ul>
                      ) : (
                        <p className="text-gray-500 text-sm italic">
                          No bank details available.
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default PainterInfoModal;

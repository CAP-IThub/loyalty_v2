import React from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { Fragment } from "react";
import { IoClose } from "react-icons/io5";
import userIcon from "../../../assets/images/userIcon.png";

const CenterModal = ({ isOpen, closeCenterModal, center }) => {
  return (
    <div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-[999]"
          onClose={closeCenterModal}
        >
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
                <DialogPanel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white px-6 py-8 text-left align-middle shadow-2xl transition-all">
                  <div className="flex items-center justify-between mb-6">
                    <DialogTitle
                      as="h3"
                      className="text-xl font-semibold text-[#1A1A27]"
                    >
                      Center's Information
                    </DialogTitle>
                    <button
                      type="button"
                      className="text-gray-600 hover:text-gray-900"
                      onClick={closeCenterModal}
                    >
                      <IoClose size={26} />
                    </button>
                  </div>

                  <div className="flex flex-col items-center justify-between gap-6">
                    <div className="w-[120px] h-[120px] rounded-full overflow-hidden border-4 border-[#FC7B00] shadow-md">
                      <img
                        src={userIcon}
                        alt="avatar"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="w-full space-y-4 text-sm text-gray-700 pl-10">
                      <div className="grid grid-cols-2 md:grid-cols-3  gap-4">
                        <div>
                          <p className="text-gray-400 text-xs uppercase">
                            Center Name
                          </p>
                          <p className="font-medium">{center?.name || "-"}</p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-xs uppercase">
                            Shop Code
                          </p>
                          <p className="font-medium">
                            {center?.shopCode || "-"}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-xs uppercase">
                            Choice
                          </p>
                          <p className="font-medium capitalize">
                            {center?.choice || "-"}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-3  gap-4">
                        <div>
                          <p className="text-gray-400 text-xs uppercase">
                            Location
                          </p>
                          <p className="font-medium">
                            {center?.location || "-"}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-xs uppercase">
                            Country
                          </p>
                          <p className="font-medium">
                            {center?.address?.country || "-"}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-xs uppercase">
                            Center ID
                          </p>
                          <p className="font-medium">{center?.id || "-"}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-3  gap-4">
                        <div>
                          <p className="text-gray-400 text-xs uppercase">
                            State
                          </p>
                          <p className="font-medium">
                            {center?.address?.state || "-"}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-xs uppercase">
                            Region
                          </p>
                          <p className="font-medium">
                            {center?.address?.region || "-"}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-xs uppercase">
                            Street
                          </p>
                          <p className="font-medium">
                            {center?.address?.street || "-"}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <div>
                          <p className="text-gray-400 text-xs uppercase">
                            Partner Status
                          </p>
                          <p className="font-medium mt-1">
                            <span
                              className={`px-2 py-1 rounded-md text-xs font-medium ${
                                center?.status === "ASSIGNED-TO-PARTNER"
                                  ? "text-white bg-green-500"
                                  : "text-white bg-red-500"
                              }`}
                            >
                              {center?.status || "-"}
                            </span>
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-xs uppercase">
                            Rep Status
                          </p>
                          <p className="font-medium mt-1">
                            <span
                              className={`px-2 py-1 rounded-md text-xs font-medium ${
                                center?.status2 === "ASSIGNED-TO-REP"
                                  ? "text-white bg-green-500"
                                  : "text-white bg-red-500"
                              }`}
                            >
                              {center?.status2 || "-"}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default CenterModal;

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
import userIcon from "../../../assets/images/userIcon.png";

const PainterModal = ({ isOpen, closePainterModal, painter }) => {
  return (
    <div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-[999]"
          onClose={closePainterModal}
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

                  <div className="flex flex-col items-center justify-center gap-4">
                    <div className="w-[120px] h-[120px] rounded-full overflow-hidden border-4 border-[#FC7B00] shadow-md">
                      {painter?.image == !"default.png" ? (
                        <div>
                          <img
                            src={painter.image}
                            alt="avatar"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <div>
                          <img
                            src={userIcon}
                            alt="avatar"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                    </div>

                    <div className="w-full space-y-4 text-sm text-gray-700 pl-10">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-gray-400 text-xs uppercase">
                            First Name
                          </p>
                          <p className="font-medium">
                            {painter?.firstName || "-"}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-xs uppercase">
                            Last Name
                          </p>
                          <p className="font-medium">
                            {painter?.lastName || "-"}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-gray-400 text-xs uppercase">
                            Phone
                          </p>
                          <p className="font-medium">{painter?.phone || "-"}</p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-xs uppercase">
                            Email
                          </p>
                          <p className="font-medium break-all">
                            {painter?.email || "-"}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-gray-400 text-xs uppercase">
                            painter ID
                          </p>
                          <p className="font-medium">{painter?.id || "-"}</p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-xs uppercase">
                            Address
                          </p>
                          <p className="font-medium">
                            {painter?.address || "-"}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-gray-400 text-xs uppercase">
                            Gender
                          </p>
                          <p className="font-medium">
                            {painter?.gender || "-"}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-xs uppercase">
                            Status
                          </p>
                          <p className="font-medium mt-1">
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${
                                painter?.status === "ACTIVE"
                                  ? "bg-green-100 text-green-700"
                                  : "bg-red-100 text-red-700"
                              }`}
                            >
                              {painter?.status || "-"}
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

export default PainterModal;

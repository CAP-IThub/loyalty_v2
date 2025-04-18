import React, { useState } from "react";
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from "@headlessui/react";
import { Fragment } from "react";
import { IoClose } from "react-icons/io5";
import userIcon from "../../assets/images/userIcon.png"

const ProfileModal = ({ isOpen, closeProfileModal, rep }) => {
  return (
    <div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-[999]"
          onClose={closeProfileModal}
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
                <DialogPanel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <DialogTitle
                      as="h3"
                      className="text-lg font-medium leading-6 text-purple-700"
                    >
                      Rep's Information
                    </DialogTitle>
                    <button
                      type="button"
                      className="text-purple-600 hover:text-purple-800"
                      onClick={closeProfileModal}
                    >
                      <IoClose size={24} />
                    </button>
                  </div>

                  <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="w-32 h-32 rounded-full overflow-hidden border bg-[#E87C2E]">
                      <img
                        src={userIcon}
                        alt="avatar"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-purple-800">
                      <p>
                        <strong>Rep ID:</strong> {rep?.id || "-"}
                      </p>
                      <p>
                        <strong>First Name:</strong> {rep?.first_name || "-"}
                      </p>
                      <p>
                        <strong>Last Name:</strong> {rep?.last_name || "-"}
                      </p>
                      <p>
                        <strong>Phone Number:</strong> {rep?.phone || "-"}
                      </p>
                      <p>
                        <strong>Email:</strong> {rep?.email || "-"}
                      </p>
                      <p>
                        <strong>Registration Date:</strong>{" "}
                        {rep?.registration_date || "-"}
                      </p>
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

export default ProfileModal;

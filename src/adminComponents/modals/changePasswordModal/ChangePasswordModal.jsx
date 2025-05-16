import React, { useState, useEffect, Fragment } from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { IoClose } from "react-icons/io5";
import axios from "../../../utils/axiosInstance";
import toast from "react-hot-toast";
// import userIcon from "../../../assets/images/userIcon.png";
import logo from "../../../assets/images/sideLogo.png";
import { Link } from "react-router-dom";

const ChangePasswordModal = ({ isOpen, closePasswordModal }) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-[999]"
        onClose={closePasswordModal}
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
              <DialogPanel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white px-20 py-8 text-left align-middle shadow-2xl transition-all">
                <div className="flex items-center justify-center mb-6">
                  <DialogTitle
                    as="h3"
                    className="w-[100px] h-[100px] rounded-full overflow-hidden border-4 border-[#FC7B00] shadow-md"
                  >
                    <img
                      src={logo}
                      alt="avatar"
                      className="w-full h-full"
                    />
                  </DialogTitle>
                  <button
                    type="button"
                    className="text-gray-600 hover:text-gray-900 absolute top-5 right-8"
                    onClick={closePasswordModal}
                  >
                    <IoClose size={26} />
                  </button>
                </div>

                <div className="flex flex-col items-center justify-center gap-4">
                  <div className="flex flex-col items-center justify-center">
                    <p className="text-xl text-black font-semibold mb-3">
                      Set New Password
                    </p>
                    <p className="text-gray-400 text-center text-sm">
                      Your new password must be different from previously used
                      password
                    </p>
                  </div>

                  <div className="w-full space-y-4 text-sm">
                    <Link to="/admin/set-new-password">
                      <div className="w-full bg-[#FC7B00] hover:bg-orange-600 text-white font-medium py-3 px-6 rounded-md text-sm transition text-center">
                        Proceed to change password
                      </div>
                    </Link>
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

export default ChangePasswordModal;

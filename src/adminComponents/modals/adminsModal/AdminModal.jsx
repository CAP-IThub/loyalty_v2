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
import userIcon from "../../../assets/images/userIcon.png";

const AdminModal = ({ isOpen, closeAdminModal, admin }) => {
  const [roleNames, setRoleNames] = useState([]);

  useEffect(() => {
    const fetchAdminRoles = async () => {
      try {
        if (!admin?.id) return;
        const res = await axios.get(`/admin/${admin.id}`);
        const roles = res.data.data?.role || [];
        setRoleNames(roles);
      } catch (err) {
        console.error("Failed to fetch admin roles", err);
        toast.error("Could not load admin roles");
      }
    };
    if (isOpen) fetchAdminRoles();
  }, [isOpen, admin]);

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-[999]" onClose={closeAdminModal}>
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
              <DialogPanel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white px-6 py-8 text-left align-middle shadow-2xl transition-all">
                <div className="flex items-center justify-between mb-6">
                  <DialogTitle
                    as="h3"
                    className="text-xl font-semibold text-[#1A1A27]"
                  >
                    Admin's Information
                  </DialogTitle>
                  <button
                    type="button"
                    className="text-gray-600 hover:text-gray-900"
                    onClick={closeAdminModal}
                  >
                    <IoClose size={26} />
                  </button>
                </div>

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
                        <p className="font-medium">{admin?.firstName || "-"}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-xs uppercase">
                          Last Name
                        </p>
                        <p className="font-medium">{admin?.lastName || "-"}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-gray-400 text-xs uppercase">
                          Department
                        </p>
                        <p className="font-medium">{admin?.dept || "-"}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-xs uppercase">Email</p>
                        <p className="font-medium break-all">
                          {admin?.email || "-"}
                        </p>
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Roles
                      </label>
                      <div className="border border-gray-300 rounded-md p-4 mt-2 bg-gray-50">
                        {roleNames.length > 0 ? (
                          <div className="flex flex-wrap gap-2">
                            {roleNames.map((name, idx) => (
                              <span
                                key={idx}
                                className="bg-[#FC7B00]/10 text-[#FC7B00] text-xs px-3 py-1 rounded-full"
                              >
                                {name}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <p className="text-gray-500 text-sm italic">
                            No Roles Assigned
                          </p>
                        )}
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
  );
};

export default AdminModal;

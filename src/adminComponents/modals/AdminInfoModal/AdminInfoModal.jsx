import React, { useEffect, useState } from "react";
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
import axios from "../../../utils/axiosInstance";

const AdminInfoModal = ({ isOpen, closeAdminModal }) => {
  const [adminData, setAdminData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/v2/auth/admin`);
        setAdminData(res.data.data["0"]);
      } catch (err) {
        console.error("Failed to fetch Admin details", err);
      } finally {
        setLoading(false);
      }
    };

    if (isOpen) fetchAdmin();
  }, [isOpen]);

  

  return (
    <div>
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
                      Admin Information
                    </DialogTitle>
                    <button
                      type="button"
                      className="text-gray-600 hover:text-gray-900"
                      onClick={closeAdminModal}
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
                                {adminData?.firstName || "-"}
                              </p>
                            </div>
                            <div>
                              <p className="text-gray-400 text-xs uppercase">
                                Last Name
                              </p>
                              <p className="font-medium">
                                {adminData?.lastName || "-"}
                              </p>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-gray-400 text-xs uppercase">
                                Department
                              </p>
                              <p className="font-medium">
                                {adminData?.dept || "-"}
                              </p>
                            </div>
                            <div>
                              <p className="text-gray-400 text-xs uppercase">
                                Email
                              </p>
                              <p className="font-medium break-all">
                                {adminData?.email || "-"}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="pl-10">
                        <h4 className="text-sm font-semibold mb-2">Roles</h4>
                        {adminData?.roles.length > 0 ? (
                          <ul className="list-disc ml-6 text-sm text-gray-700 space-y-1">
                            {adminData.roles.map((role, index) => (
                              <li key={index}>{JSON.stringify(role.name)}</li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-gray-500 text-sm italic">
                            No roles assigned.
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
    </div>
  );
};

export default AdminInfoModal;

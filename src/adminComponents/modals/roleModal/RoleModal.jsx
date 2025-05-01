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

const RoleModal = ({ isOpen, closeRoleModal, role }) => {
  const [assignedPermissions, setAssignedPermissions] = useState([]);

  useEffect(() => {
    const fetchRolePermissions = async () => {
      try {
        if (!role?.id) return;
        const res = await axios.get(`/roles/permissions/${role.id}`);
        const permMap = res.data.data.rolePermissions || {};
        const permissionLabels = Object.values(permMap);
        setAssignedPermissions(permissionLabels);
      } catch (err) {
        console.error("Failed to fetch role permissions", err);
        toast.error("Could not load role permissions");
      }
    };
    if (isOpen) fetchRolePermissions();
  }, [isOpen, role]);

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-[999]" onClose={closeRoleModal}>
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
                    Role's Information
                  </DialogTitle>
                  <button
                    type="button"
                    className="text-gray-600 hover:text-gray-900"
                    onClick={closeRoleModal}
                  >
                    <IoClose size={26} />
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-400 text-xs uppercase">
                        Name of Role
                      </p>
                      <p className="font-medium">{role?.name || "-"}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs uppercase">Role ID</p>
                      <p className="font-medium">{role?.id || "-"}</p>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Assigned Permissions
                    </label>
                    <div className="border border-gray-300 rounded-md p-4 mt-2 bg-gray-50">
                      {assignedPermissions.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                          {assignedPermissions.map((name, idx) => (
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
                          No permissions assigned
                        </p>
                      )}
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

export default RoleModal;

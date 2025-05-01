import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { Fragment } from "react";
import { IoClose } from "react-icons/io5";
import axios from "../../../utils/axiosInstance";
import toast from "react-hot-toast";
import { FaTimes } from "react-icons/fa";

const AddRoleModal = ({ isOpen, closeRoleModal, onUpdate }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: "", permissions: [] });
  const [permissionsList, setPermissionsList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const fetchPermissions = async () => {
      try {
        const res = await axios.get("/permissions");
        const data = res.data.data || {};
        const list = Object.entries(data).map(([id, label]) => ({ id, label }));
        setPermissionsList(list);
      } catch (err) {
        console.error("Failed to load permissions", err);
        toast.error("Could not load permissions");
      }
    };
    if (isOpen) fetchPermissions();
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectPermission = (perm) => {
    if (!formData.permissions.includes(perm.label)) {
      setFormData((prev) => ({
        ...prev,
        permissions: [...prev.permissions, perm.label], // use label
      }));
    }
    setSearchTerm("");
  };

  const handleRemovePermission = (label) => {
    setFormData((prev) => ({
      ...prev,
      permissions: prev.permissions.filter((permLabel) => permLabel !== label),
    }));
  };

  const filteredPermissions = permissionsList.filter(
    (perm) =>
      perm.label.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !formData.permissions.includes(perm.label)
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("/role", formData); 
      toast.success("Role added successfully");
      onUpdate();
      setFormData({ name: "", permissions: [] });
      closeRoleModal();
    } catch (err) {
      console.error("Failed to add role", err);
      const msg = err?.response?.data?.message || "Failed to add role";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

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
              <DialogPanel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white px-8 md:px-20 py-9 text-left align-middle shadow-2xl transition-all">
                <div className="flex items-center justify-between mb-6">
                  <DialogTitle
                    as="h3"
                    className="text-2xl font-semibold text-[#1A1A27]"
                  >
                    Add New Role
                  </DialogTitle>
                  <button
                    type="button"
                    className="text-[#1A1A27]"
                    onClick={closeRoleModal}
                  >
                    <IoClose size={28} />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Name of Role
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#FC7B00] placeholder:text-xs"
                      placeholder="Enter name"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Select Permissions
                    </label>
                    <div className="border border-gray-300 rounded-md p-2 mt-1 ">
                      <div className="flex flex-wrap gap-2 mb-2">
                        {formData.permissions.map((label) => (
                          <span
                            key={label}
                            className="bg-[#FC7B00]/10 text-[#FC7B00] text-xs px-2 py-1 rounded-full flex items-center gap-1"
                          >
                            {label}
                            <button
                              type="button"
                              className="ml-1 text-[#FC7B00] hover:text-red-600"
                              onClick={() => handleRemovePermission(label)}
                            >
                              <FaTimes className="text-xs" />
                            </button>
                          </span>
                        ))}
                      </div>
                      <input
                        type="text"
                        placeholder="Search permissions..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() =>
                          setTimeout(() => setIsFocused(false), 200)
                        }
                        className="w-full px-3 py-2 border border-gray-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#FC7B00]"
                      />
                      {isFocused && filteredPermissions.length > 0 && (
                        <ul className="mt-1 max-h-40 overflow-y-auto bg-white border border-gray-200 rounded-md shadow text-sm">
                          {filteredPermissions.map((perm) => (
                            <li
                              key={perm.id}
                              className="px-4 py-2 hover:bg-orange-100 cursor-pointer"
                              onClick={() => handleSelectPermission(perm)}
                            >
                              {perm.label}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-[#FC7B00] hover:bg-orange-600 text-white font-medium py-3 px-6 rounded-md text-sm transition"
                    >
                      {loading ? "Adding..." : "Proceed to adding role"}
                    </button>
                  </div>
                </form>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default AddRoleModal;

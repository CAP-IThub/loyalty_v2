import React, { useState, useEffect, Fragment } from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { IoClose } from "react-icons/io5";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { FaTimes } from "react-icons/fa";
import axios from "../../../utils/axiosInstance";
import toast from "react-hot-toast";

const EditAdminModal = ({ isOpen, closeAdminModal, admin, onUpdate }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dept: "",
    email: "",
    password: "",
    roles: [],
  });

  const [loading, setLoading] = useState(false);
  const [rolesList, setRolesList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const res = await axios.get("/role");
        const roles = res.data.data || [];
        setRolesList(roles);
      } catch (err) {
        toast.error("Could not load roles");
      }
    };

    const fetchAdminDetails = async () => {
      try {
        if (!admin?.id) return;
        const res = await axios.get(`/admin/${admin.id}`);
        const data = res.data.data;
        setFormData((prev) => ({
          ...prev,
          firstName: data.admin.firstName || "",
          lastName: data.admin.lastName || "",
          dept: data.admin.dept || "",
          email: data.admin.email || "",
          roles: data.role || [], // This is the array of role names
        }));
      } catch (err) {
        toast.error("Failed to fetch admin roles");
      }
    };

    if (isOpen) {
      fetchRoles();
      fetchAdminDetails();
    }
  }, [isOpen, admin]);

  useEffect(() => {
    const newErrors = {};
    const { password } = formData;

    if (password.length > 0 && password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (password.length > 12) {
      newErrors.password = "Password cannot exceed 12 characters";
    }

    setErrors(newErrors);
  }, [formData.password]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectRole = (role) => {
    if (!formData.roles.includes(role.name)) {
      setFormData((prev) => ({
        ...prev,
        roles: [...prev.roles, role.name],
      }));
    }
    setSearchTerm("");
  };

  const handleRemoveRole = (name) => {
    setFormData((prev) => ({
      ...prev,
      roles: prev.roles.filter((r) => r !== name),
    }));
  };

  const filteredRoles = rolesList.filter(
    (r) =>
      r.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !formData.roles.includes(r.name)
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.patch(`/admin/${admin.id}`, formData);
      toast.success("Admin info updated");
      onUpdate();
      closeAdminModal();
    } catch (err) {
      toast.error("Failed to update Admin");
    } finally {
      setLoading(false);
    }
  };

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
              <DialogPanel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white px-8 py-9 text-left align-middle shadow-2xl transition-all">
                <div className="flex items-center justify-between mb-4">
                  <DialogTitle
                    as="h3"
                    className="text-2xl font-semibold text-[#1A1A27]"
                  >
                    Edit Admin's Information
                  </DialogTitle>
                  <button
                    type="button"
                    className="text-[#1A1A27]"
                    onClick={closeAdminModal}
                  >
                    <IoClose size={28} />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-3">
                  {["firstName", "lastName", "email", "dept"].map((field) => (
                    <div key={field}>
                      <label className="text-sm font-medium text-gray-700 capitalize">
                        {field.replace(/([A-Z])/g, " $1")}
                      </label>
                      <input
                        type="text"
                        name={field}
                        value={formData[field]}
                        onChange={handleChange}
                        className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#FC7B00]"
                        placeholder={`Enter ${field}`}
                        required
                      />
                    </div>
                  ))}

                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#FC7B00]"
                      />
                      <span
                        className="absolute right-3 top-[14px] cursor-pointer text-gray-500"
                        onClick={() => setShowPassword((prev) => !prev)}
                      >
                        {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                      </span>
                      {errors.password && (
                        <p className="text-xs text-red-500 mt-1">
                          {errors.password}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Select Roles
                    </label>
                    <div className="border border-gray-300 rounded-md p-2 mt-1">
                      <div className="flex flex-wrap gap-2 mb-2">
                        {formData.roles.map((role) => (
                          <span
                            key={role}
                            className="bg-[#FC7B00]/10 text-[#FC7B00] text-xs px-2 py-1 rounded-full flex items-center gap-1"
                          >
                            {role}
                            <button
                              type="button"
                              className="ml-1 text-[#FC7B00] hover:text-red-600"
                              onClick={() => handleRemoveRole(role)}
                            >
                              <FaTimes className="text-xs" />
                            </button>
                          </span>
                        ))}
                      </div>
                      <input
                        type="text"
                        placeholder="Search roles..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() =>
                          setTimeout(() => setIsFocused(false), 200)
                        }
                        className="w-full px-3 py-2 border border-gray-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#FC7B00]"
                      />
                      {isFocused && filteredRoles.length > 0 && (
                        <ul className="mt-1 max-h-40 overflow-y-auto bg-white border border-gray-200 rounded-md shadow text-sm">
                          {filteredRoles.map((rol) => (
                            <li
                              key={rol.id}
                              className="px-4 py-2 hover:bg-orange-100 cursor-pointer"
                              onClick={() => handleSelectRole(rol)}
                            >
                              {rol.name}
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
                      {loading ? "Updating..." : "Update Admin"}
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

export default EditAdminModal;

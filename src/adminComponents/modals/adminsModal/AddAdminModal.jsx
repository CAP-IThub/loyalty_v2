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
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { FaTimes } from "react-icons/fa";

const AddAdminModal = ({ isOpen, closeAdminModal, onUpdate }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dept: "",
    email: "",
    password: "",
    password_confirmation: "",
    roles: [], 
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [rolesList, setRolesList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const res = await axios.get("/role");
        const list = res.data.data.map(({ id, name }) => ({ id, name }));
        setRolesList(list);
      } catch (err) {
        console.error("Failed to load Roles", err);
        toast.error("Could not load Roles");
      }
    };
    if (isOpen) fetchRoles();
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    const newErrors = {};
    const { password, password_confirmation } = formData;

    if (password.length > 0 && password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (password.length > 12) {
      newErrors.password = "Password cannot exceed 12 characters";
    }

    if (
      password &&
      password_confirmation &&
      password !== password_confirmation
    ) {
      newErrors.password_confirmation = "Passwords do not match";
    }

    setErrors(newErrors);
  }, [formData.password, formData.password_confirmation]);

  const handleSelectRole = (rol) => {
    if (!formData.roles.includes(rol.name)) {
      setFormData((prev) => ({
        ...prev,
        roles: [...prev.roles, rol.name],
      }));
    }
    setSearchTerm("");
  };

  const handleRemoveRole = (roleName) => {
    setFormData((prev) => ({
      ...prev,
      roles: prev.roles.filter((r) => r !== roleName),
    }));
  };

  const filteredRoles = rolesList.filter(
    (rol) =>
      rol.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !formData.roles.includes(rol.name)
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(`/admin`, formData);
      toast.success("Admin Added");
      onUpdate();
      setFormData({
        firstName: "",
        lastName: "",
        phoneNum: "",
        email: "",
        address: "",
        dept: "",
        password: "",
        password_confirmation: "",
        roles: [],
      });
      closeAdminModal();
    } catch (err) {
      console.error("Failed to add role", err);
      const msg = err?.response?.data?.message || "Failed to add Admin";
      toast.error(msg);
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
              <DialogPanel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white px-8 md:px-20 py-9 text-left align-middle shadow-2xl transition-all">
                <div className="flex items-center justify-between mb-6">
                  <DialogTitle
                    as="h3"
                    className="text-2xl font-semibold text-[#1A1A27]"
                  >
                    Add New Admin
                  </DialogTitle>
                  <button
                    type="button"
                    className="text-[#1A1A27] hover:text-gray-600"
                    onClick={closeAdminModal}
                  >
                    <IoClose size={28} />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#FC7B00] placeholder:text-xs"
                      placeholder="Enter first name"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#FC7B00] placeholder:text-xs"
                      placeholder="Enter last name"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      type="text"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#FC7B00] placeholder:text-xs"
                      placeholder="Enter Email"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Department
                    </label>
                    <input
                      type="text"
                      name="dept"
                      value={formData.dept}
                      onChange={handleChange}
                      className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#FC7B00] placeholder:text-xs"
                      placeholder="Enter Department"
                      required
                    />
                  </div>

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
                        className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FC7B00] text-sm"
                        required
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
                      Confirm Password
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        name="password_confirmation"
                        value={formData.password_confirmation}
                        onChange={handleChange}
                        className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FC7B00] text-sm"
                        required
                      />
                      <span
                        className="absolute right-3 top-[14px] cursor-pointer text-gray-500"
                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                      >
                        {showConfirmPassword ? (
                          <AiFillEyeInvisible />
                        ) : (
                          <AiFillEye />
                        )}
                      </span>
                      {errors.password_confirmation && (
                        <p className="text-xs text-red-500 mt-1">
                          {errors.password_confirmation}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Select Roles
                    </label>
                    <div className="border border-gray-300 rounded-md p-2 mt-1 ">
                      <div className="flex flex-wrap gap-2 mb-2">
                        {formData.roles.map((roleName) => (
                          <span
                            key={roleName}
                            className="bg-[#FC7B00]/10 text-[#FC7B00] text-xs px-2 py-1 rounded-full flex items-center gap-1"
                          >
                            {roleName}
                            <button
                              type="button"
                              className="ml-1 text-[#FC7B00] hover:text-red-600"
                              onClick={() => handleRemoveRole(roleName)}
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
                      {loading ? "Adding..." : "Proceed to adding Admin"}
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

export default AddAdminModal;

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

const AddPainterModal = ({ isOpen, closePainterModal, onUpdate }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNum: "",
    address: "",
    gender: "Male",
    email: ""
  });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    Object.entries(formData).forEach(([key, val]) => data.append(key, val));
    if (image) data.append("image", image);

    try {
      await axios.post("/customer", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Painter Added");
      onUpdate();
      closePainterModal();
    } catch (err) {
      console.error(err);
      toast.error("Failed to Add Painter");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-[999]" onClose={closePainterModal}>
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
                    className="text-lg font-medium leading-6 text-[#1A1A27]"
                  >
                    Add Painter
                  </DialogTitle>
                  <button
                    type="button"
                    className="text-[#1A1A27]"
                    onClick={closePainterModal}
                  >
                    <IoClose size={24} />
                  </button>
                </div>

                <form onSubmit={handleSubmit} encType="multipart/form-data">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        First Name
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full px-4 py-2 mt-1 border rounded-lg text-sm focus:outline-none focus:border-[#FC7B00]"
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
                        className="w-full px-4 py-2 mt-1 border rounded-lg text-sm focus:outline-none focus:border-[#FC7B00]"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Phone Number
                      </label>
                      <input
                        type="text"
                        name="phoneNum"
                        value={formData.phoneNum}
                        onChange={handleChange}
                        className="w-full px-4 py-2 mt-1 border rounded-lg text-sm focus:outline-none focus:border-[#FC7B00]"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Gender
                      </label>
                      <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        className="w-full px-4 py-2 mt-1 border rounded-lg text-sm"
                        required
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
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
                        className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:border-[#FC7B00] text-sm"
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="text-sm font-medium text-gray-700">
                      Address
                    </label>
                    <textarea
                      name="address"
                      rows="2"
                      value={formData.address}
                      onChange={handleChange}
                      className="w-full px-4 py-2 mt-1 border rounded-lg text-sm focus:outline-none focus:border-[#FC7B00]"
                      required
                    ></textarea>
                  </div>

                  <div className="mb-4">
                    <label className="text-sm font-medium text-gray-700">
                      Upload Image
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="block mt-1 text-sm"
                    />
                    {imagePreview && (
                      <div className="w-24 h-24 mt-3 rounded-full overflow-hidden border-2 border-gray-300">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>

                  <div className="text-right">
                    <button
                      type="submit"
                      disabled={loading}
                      className="bg-[#FC7B00] hover:bg-orange-600 text-white font-medium py-2 px-6 rounded-md disabled:opacity-70 text-sm"
                    >
                      {loading ? "Adding..." : "Add Painter"}
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

export default AddPainterModal;

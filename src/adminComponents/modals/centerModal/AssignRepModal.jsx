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

const AssignRepModal = ({ isOpen, closeCenterModal, onUpdate, center }) => {
  const [reps, setReps] = useState([]);
  const [formData, setFormData] = useState({
    shopId: "",
    repId: "",
  });
  const [loading, setLoading] = useState(false);
//   console.log(center);

  useEffect(() => {
    if (center) {
      setFormData((prev) => ({ ...prev, shopId: center.id }));
    }
  }, [center]);

  useEffect(() => {
    const fetchRep = async () => {
      try {
        const res = await axios.get("/reps");
        setReps(res.data.data.rep);
      } catch (error) {
        console.error("Failed to fetch reps", error);
        toast.error("Could not load reps");
      }
    };

    if (isOpen) fetchRep();
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post("/shop/assign/rep", formData);
      const successMsg = res?.data?.data || "Center successfully assigned";
      toast.success(successMsg);
      onUpdate();
      closeCenterModal();
    } catch (err) {
      console.error("Assignment failed", err);
      const errMsg =
        err?.response?.data?.message || "Failed to assign center";
      toast.error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-[999]" onClose={closeCenterModal}>
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
                    className="text-xl font-semibold text-[#1A1A27]"
                  >
                    Assign Center to Representative
                  </DialogTitle>
                  <button
                    type="button"
                    className="text-[#1A1A27] hover:text-gray-600"
                    onClick={closeCenterModal}
                  >
                    <IoClose size={28} />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Center Name
                    </label>
                    <input
                      type="text"
                      value={center?.name || ""}
                      disabled
                      className="mt-1 w-full border border-gray-300 bg-gray-100 rounded-md px-4 py-2 text-sm focus:outline-none placeholder:text-xs"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Representatives
                    </label>
                    <select
                      name="repId"
                      value={formData.repId}
                      onChange={handleChange}
                      className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#FC7B00]"
                      required
                    >
                      <option value="">Select a rep</option>
                      {reps.map((rep) => (
                        <option key={rep.id} value={rep.id}>
                          {rep.firstName} {rep.lastName}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-[#FC7B00] hover:bg-orange-600 text-white font-medium py-3 px-6 rounded-md text-sm transition"
                    >
                      {loading ? "Assigning..." : "Proceed to Assign Center"}
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

export default AssignRepModal;

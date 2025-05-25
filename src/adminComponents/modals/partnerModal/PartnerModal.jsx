import React, { useState, Fragment, useEffect } from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { IoClose } from "react-icons/io5";
import userIcon from "../../../assets/images/userIcon.png";
import axios from "../../../utils/axiosInstance";
import { ClipLoader } from "react-spinners";

const PartnerModal = ({ isOpen, closePartnerModal, partner }) => {
  const [partnerInfo, setPartnerInfo] = useState(null);
  const [assignedShops, setAssignedShops] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPartnerData = async () => {
      setLoading(true);
      if (!partner?.id) return;
      try {
        const res = await axios.get(`/partner/${partner.id}`);
        const partnerData = res.data.data.partner[0];
        const shops = res.data.data.assignedShops || [];
        setPartnerInfo(partnerData);
        setAssignedShops(shops);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch partner details", err);
      }
    };
    

    if (isOpen) {
      fetchPartnerData();
    }
  }, [isOpen, partner?.id]);
  
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-[999]" onClose={closePartnerModal}>
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
                    Partner Information
                  </DialogTitle>
                  <button
                    type="button"
                    className="text-gray-600 hover:text-gray-900"
                    onClick={closePartnerModal}
                  >
                    <IoClose size={26} />
                  </button>
                </div>

                {loading ? (
                  <div className="flex justify-center items-center py-12">
                    <ClipLoader size={30} color="#FC7B00" />
                  </div>
                ) : (
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
                            {partnerInfo?.firstName || "-"}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-xs uppercase">
                            Last Name
                          </p>
                          <p className="font-medium">
                            {partnerInfo?.lastName || "-"}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-gray-400 text-xs uppercase">
                            Phone
                          </p>
                          <p className="font-medium">
                            {partnerInfo?.phone || "-"}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-xs uppercase">
                            Email
                          </p>
                          <p className="font-medium break-all">
                            {partnerInfo?.email || "-"}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-gray-400 text-xs uppercase">
                            Address
                          </p>
                          <p className="font-medium">
                            {partnerInfo?.address || "-"}
                          </p>
                        </div>

                        <div>
                          {/* <p className="text-gray-400 text-xs uppercase">
                            Partner ID
                          </p>
                          <p className="font-medium">
                            {partnerInfo?.id || "-"}
                          </p> */}
                        </div>
                      </div>

                      {assignedShops.length > 0 && (
                        <div className="mt-6">
                          <p className="text-gray-600 text-sm font-semibold mb-2">
                            Assigned Shops
                          </p>
                          <ul className="list-disc ml-5 space-y-1 text-sm text-gray-700">
                            {assignedShops.map((shop) => (
                              <li key={shop.id}>
                                {shop.name} –{" "}
                                <span className="text-gray-500">
                                  {shop.location}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
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
  );
};

export default PartnerModal;

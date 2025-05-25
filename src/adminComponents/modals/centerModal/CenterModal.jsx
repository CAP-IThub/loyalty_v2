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
import axios from "../../../utils/axiosInstance";
import userIcon from "../../../assets/images/userIcon.png";

const CenterModal = ({ isOpen, closeCenterModal, center }) => {
  const [centerDetails, setCenterDetails] = useState(null);

  useEffect(() => {
    const fetchCenterDetails = async () => {
      if (!center?.id) return;
      try {
        const res = await axios.get(`/shop/${center.id}`);
        setCenterDetails(res.data.data);
      } catch (err) {
        console.error("Failed to fetch center details", err);
      }
    };
    fetchCenterDetails();
  }, [center]);

  const info = centerDetails?.info?.[0];
  const partner = centerDetails?.assignedPartner?.[0];
  const rep = centerDetails?.assignedRep?.[0];

  const parsedAddress =
    info?.shopAddress && typeof info.shopAddress === "string"
      ? JSON.parse(info.shopAddress)
      : info?.shopAddress;



  return (
    <div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-[999]"
          onClose={closeCenterModal}
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
                <DialogPanel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white px-6 py-8 text-left align-middle shadow-2xl transition-all">
                  <div className="flex items-center justify-between mb-6">
                    <DialogTitle
                      as="h3"
                      className="text-xl font-semibold text-[#1A1A27]"
                    >
                      Center's Information
                    </DialogTitle>
                    <button
                      type="button"
                      className="text-gray-600 hover:text-gray-900"
                      onClick={closeCenterModal}
                    >
                      <IoClose size={26} />
                    </button>
                  </div>

                  <div className="flex flex-col items-center justify-between gap-6">
                    <div className="w-[120px] h-[120px] rounded-full overflow-hidden border-4 border-[#FC7B00] shadow-md">
                      <img
                        src={userIcon}
                        alt="avatar"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="w-full space-y-4 text-sm text-gray-700">
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <div>
                          <p className="text-gray-400 text-xs uppercase">
                            Center Name
                          </p>
                          <p className="font-medium">{info?.shopName || "-"}</p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-xs uppercase">
                            Shop Code
                          </p>
                          <p className="font-medium">{info?.Code || "-"}</p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-xs uppercase">
                            Choice
                          </p>
                          <p className="font-medium capitalize">
                            {info?.type || "-"}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <div>
                          <p className="text-gray-400 text-xs uppercase">
                            Location
                          </p>
                          <p className="font-medium">
                            {info?.shopLocation || "-"}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-xs uppercase">
                            Center ID
                          </p>
                          <p className="font-medium">{info?.shopID || "-"}</p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-xs uppercase">
                            Address
                          </p>
                          <p className="font-medium">
                            {parsedAddress
                              ? [
                                  parsedAddress.street,
                                  parsedAddress.region,
                                  parsedAddress.state,
                                  parsedAddress.country,
                                ]
                                  .filter(Boolean)
                                  .join(", ")
                              : "-"}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <div>
                          <p className="text-gray-400 text-xs uppercase">
                            Partner Name
                          </p>
                          <p className="font-medium">
                            {partner
                              ? `${partner.firstName} ${partner.lastName}`
                              : "-"}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-xs uppercase">
                            Phone
                          </p>
                          <p className="font-medium">
                            {partner?.phoneNum || "-"}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-xs uppercase">
                            Email
                          </p>
                          <p className="font-medium">{partner?.email || "-"}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <div>
                          <p className="text-gray-400 text-xs uppercase">
                            Rep Name
                          </p>
                          <p className="font-medium">
                            {rep ? `${rep.firstName} ${rep.lastName}` : "-"}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-xs uppercase">
                            Phone
                          </p>
                          <p className="font-medium">{rep?.phoneNum || "-"}</p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-xs uppercase">
                            Email
                          </p>
                          <p className="font-medium">{rep?.email || "-"}</p>
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
    </div>
  );
};

export default CenterModal;

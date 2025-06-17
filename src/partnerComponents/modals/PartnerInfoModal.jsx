import React, { useEffect, useState, Fragment } from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { IoClose } from "react-icons/io5";
import userIcon from "../../assets/images/userIcon.png";
import axios from "../../utils/axiosInstance";

const PartnerInfoModal = ({ isOpen, closePartnerModal }) => {
  const [partnerData, setPartnerData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPartner = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/auth/partner`);
        setPartnerData(res.data.data);
      } catch (err) {
        console.error("Failed to fetch partner details", err);
      } finally {
        setLoading(false);
      }
    };

    if (isOpen) fetchPartner();
  }, [isOpen]);

  const partner = partnerData?.partner?.[0];
  const assignedShops = partnerData?.assignedShops || [];

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
                  <p className="text-center text-gray-500">Loading...</p>
                ) : (
                  <>
                    <div className="flex flex-col items-center gap-4 mb-8">
                      <div className="w-[100px] h-[100px] rounded-full overflow-hidden border-4 border-[#FC7B00]">
                        <img
                          src={userIcon}
                          alt="avatar"
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="w-full text-sm text-gray-700 ml-24">
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div>
                            <p className="text-gray-400 text-xs uppercase">
                              First Name
                            </p>
                            <p className="font-medium">
                              {partner?.firstName || "-"}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-400 text-xs uppercase">
                              Last Name
                            </p>
                            <p className="font-medium">
                              {partner?.lastName || "-"}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-400 text-xs uppercase">
                              Email
                            </p>
                            <p className="font-medium break-all">
                              {partner?.email || "-"}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-400 text-xs uppercase">
                              Phone Number
                            </p>
                            <p className="font-medium">
                              {partner?.phoneNumber || "-"}
                            </p>
                          </div>
                          <div className="col-span-2">
                            <p className="text-gray-400 text-xs uppercase">
                              Address
                            </p>
                            <p className="font-medium">
                              {partner?.address || "-"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4">
                      <h4 className="font-semibold text-sm mb-3 text-[#1A1A27]">
                        Assigned Shops
                      </h4>

                      {assignedShops.length === 0 ? (
                        <p className="text-gray-500 text-sm">
                          No assigned shops.
                        </p>
                      ) : (
                        <div className="space-y-4 text-sm text-gray-700 mx-8">
                          {assignedShops.map((shop) => (
                            <div
                              key={shop.id}
                              className="border border-gray-200 rounded-md p-4"
                            >
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <p className="text-gray-400 text-xs uppercase">
                                    Shop Code
                                  </p>
                                  <p className="font-medium">{shop.shopCode}</p>
                                </div>
                                <div>
                                  <p className="text-gray-400 text-xs uppercase">
                                    Name
                                  </p>
                                  <p className="font-medium">{shop.name}</p>
                                </div>
                                <div>
                                  <p className="text-gray-400 text-xs uppercase">
                                    Location
                                  </p>
                                  <p className="font-medium">
                                    {shop.location || "-"}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-gray-400 text-xs uppercase">
                                    Status
                                  </p>
                                  <p className="font-medium">{shop.status}</p>
                                </div>
                                <div className="col-span-2">
                                  <p className="text-gray-400 text-xs uppercase">
                                    Address
                                  </p>
                                  <p className="font-medium">
                                    {shop.address
                                      ? `${shop.address.street}, ${shop.address.state}, ${shop.address.country}`
                                      : "—"}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </>
                )}
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default PartnerInfoModal;

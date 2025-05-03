import React, { Fragment } from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { IoClose } from "react-icons/io5";
import userIcon from "../../../../assets/images/userIcon.png";

const CampaignModal = ({ isOpen, closeCampaignModal, campaign }) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-[999]"
        onClose={closeCampaignModal}
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
              <DialogPanel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white px-6 py-8 text-left align-middle shadow-2xl transition-all">
                <div className="flex items-center justify-between mb-6">
                  <DialogTitle
                    as="h3"
                    className="text-xl font-semibold text-[#1A1A27]"
                  >
                    Campaign Information
                  </DialogTitle>
                  <button
                    type="button"
                    className="text-gray-600 hover:text-gray-900"
                    onClick={closeCampaignModal}
                  >
                    <IoClose size={26} />
                  </button>
                </div>

                <div className="flex flex-col items-center justify-center gap-4">
                  <div className="w-full space-y-4 text-sm text-gray-700">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-gray-400 text-xs uppercase">Name</p>
                        <p className="font-medium">{campaign?.name || "-"}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-xs uppercase">Code</p>
                        <p className="font-medium">
                          {campaign?.campaign_code || "-"}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-gray-400 text-xs uppercase">
                          Start Date
                        </p>
                        <p className="font-medium">
                          {campaign?.start_date || "-"}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-xs uppercase">
                          End Date
                        </p>
                        <p className="font-medium">
                          {campaign?.end_date || "-"}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-gray-400 text-xs uppercase">Tier</p>
                        <p className="font-medium">{campaign?.tier || "-"}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-xs uppercase">
                          Category
                        </p>
                        <p className="font-medium">
                          {campaign?.category || "-"}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-gray-400 text-xs uppercase">
                          Store Type
                        </p>
                        <p className="font-medium capitalize">
                          {campaign?.store_type || "—"}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-xs uppercase">
                          Discount
                        </p>
                        <p className="font-medium">{campaign?.discount}%</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-gray-400 text-xs uppercase">
                          Referral Bonus
                        </p>
                        <p className="font-medium">
                          {campaign?.referral_bonus ?? 0}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-xs uppercase">
                          Status
                        </p>
                        <span
                          className={`inline-block px-2 py-1 rounded text-xs font-medium text-white ${
                            campaign?.status === "active"
                              ? "bg-green-500"
                              : "bg-red-500"
                          }`}
                        >
                          {campaign?.status}
                        </span>
                      </div>
                    </div>

                    <div>
                      <p className="text-gray-400 text-xs uppercase">
                        Description
                      </p>
                      <p className="font-medium whitespace-pre-wrap">
                        {campaign?.description || "—"}
                      </p>
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

export default CampaignModal;

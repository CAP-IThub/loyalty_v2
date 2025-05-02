import React, { Fragment } from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { IoClose } from "react-icons/io5";

const PainterCategoryModal = ({ isOpen, closeCategoryModal, category }) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-[999]"
        onClose={closeCategoryModal}
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
              <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white px-6 py-8 text-left align-middle shadow-2xl transition-all">
                <div className="flex items-center justify-between mb-6">
                  <DialogTitle
                    as="h3"
                    className="text-xl font-semibold text-[#1A1A27]"
                  >
                    Painter Category Info
                  </DialogTitle>
                  <button
                    type="button"
                    className="text-gray-600 hover:text-gray-900"
                    onClick={closeCategoryModal}
                  >
                    <IoClose size={26} />
                  </button>
                </div>

                <div className="space-y-4 text-sm text-gray-700">
                  <div>
                    <p className="text-gray-400 text-xs uppercase">Name</p>
                    <p className="font-medium">{category?.name || "—"}</p>
                  </div>

                  <div>
                    <p className="text-gray-400 text-xs uppercase">
                      Description
                    </p>
                    <p className="font-medium whitespace-pre-wrap">
                      {category?.description || "—"}
                    </p>
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

export default PainterCategoryModal;

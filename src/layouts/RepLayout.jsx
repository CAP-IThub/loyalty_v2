import React from "react";
import RepSidebar from "../repComponents/RepSidebar";
import { Fragment, useEffect, useState } from "react";
import { FaBell, FaKey, FaUserCircle } from "react-icons/fa";
import capLogo from "../assets/images/cap-logo.png";
import { useDispatch, useSelector } from "react-redux";
import { GoSignOut } from "react-icons/go";
import { logoutUser } from "../slices/authSlice";
import userIcon from "../assets/images/userIcon.png";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { HiChevronDown } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import AdminInfoModal from "../adminComponents/modals/AdminInfoModal/AdminInfoModal";
import ChangePasswordModal from "../adminComponents/modals/changePasswordModal/ChangePasswordModal";
// import axios from "../../utils/axiosInstance";
// import { ClipLoader } from "react-spinners";

const RepLayout = ({ children }) => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isModalOpen2, setIsModalOpen2] = useState(false);

  //  const openModal = () => {
  //    setIsModalOpen(true);
  //  };

  // const closeModal = () => {
  //   setIsModalOpen(false);
  // };

  //  const openPasswordModal = () => {
  //    setIsModalOpen2(true);
  //  };

  //  const closePasswordModal = () => {
  //    setIsModalOpen2(false);
  //  };
  
  return (
    <div className="w-full flex h-screen">
      <RepSidebar />
      <main className="flex-1 pt-20 px-4 pb-4 md:pt-0 md:px-3 overflow-y-auto h-screen">
        <div className="hidden md:flex justify-between items-center bg-white p-4 w-full rounded-xl shadow-md sticky top-0 z-20">
          <img src={capLogo} alt="/" width={120} />

          <div className="flex items-center">
            {/* <div className="flex items-center gap-2">
              <FaBell className="text-xl text-[#0B0F28]" />
              <span className="text-xs">Notifications</span>
            </div> */}

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <img
                  src={userIcon}
                  className="rounded-full bg-[#E87C2E]"
                  alt="profile"
                  width={30}
                />
                <span className="text-xs">Hi, {auth.first_name}</span>
              </div>
              <div>
                <Menu as="div" className="relative text-left ml-1">
                  <div>
                    <MenuButton className="flex items-center justify-center">
                      <HiChevronDown size={20} />
                    </MenuButton>
                  </div>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <MenuItems className="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                      <div className="py-1">
                        <MenuItem>
                          <div
                            className={`block px-4 py-2 text-sm text-center cursor-default`}
                          >
                            Welcome! 👋
                          </div>
                        </MenuItem>

                        <MenuItem>
                          {({ active }) => (
                            <button
                              onClick={openModal}
                              className={`$${
                                active
                                  ? "bg-gray-100 text-gray-900"
                                  : "text-gray-700"
                              } flex justify-between items-center w-full px-4 py-2 text-sm`}
                            >
                              View Info <FaUserCircle className="ml-2" />
                            </button>
                          )}
                        </MenuItem>

                        <MenuItem>
                          {({ active }) => (
                            <button
                              onClick={openPasswordModal}
                              className={`$${
                                active
                                  ? "bg-gray-100 text-gray-900"
                                  : "text-gray-700"
                              } flex justify-between items-center w-full px-4 py-2 text-sm`}
                            >
                              Change Password <FaKey className="ml-2" />
                            </button>
                          )}
                        </MenuItem>

                        <MenuItem>
                          {({ active }) => (
                            <button
                              onClick={() => {
                                dispatch(logoutUser());
                                navigate("/rep-login");
                              }}
                              className={`$${
                                active
                                  ? "bg-gray-100 text-gray-900"
                                  : "text-gray-700"
                              } flex justify-between items-center w-full px-4 py-2 text-sm`}
                            >
                              Logout <GoSignOut className="ml-2" />
                            </button>
                          )}
                        </MenuItem>
                      </div>
                    </MenuItems>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>
        </div>
        {children}
      </main>

      {/* <AdminInfoModal isOpen={isModalOpen} closeAdminModal={closeModal} />
      <ChangePasswordModal
        isOpen={isModalOpen2}
        closePasswordModal={closePasswordModal}
      /> */}

      {/* Info Modal */}
      {/* <ProfileModal
        isOpen={showModal}
        closeProfileModal={() => setShowModal(false)}
        rep={repInfo}
      /> */}
    </div>
  );
};

export default RepLayout;

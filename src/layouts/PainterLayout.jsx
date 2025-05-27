import React from "react";
import AdminSidebar from "../adminComponents/AdminSidebar";
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
import PainterSidebar from "../painterComponents/PainterSidebar";
import PainterInfoModal from "../painterComponents/modals/PainterInfoModal";
import ChangePainterPasswordModal from "../painterComponents/modals/ChangePainterPasswordModal";
// import axios from "../../utils/axiosInstance";
// import { ClipLoader } from "react-spinners";

const PainterLayout = ({ children }) => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [painterModalOpen, setPainterModalOpen] = useState(false);
  const [passwordModal, setPasswordModal] = useState(false);

  useEffect(() => {
    if (document.getElementById("zsiqscript")) return;

    window.$zoho = window.$zoho || {};
    window.$zoho.salesiq = {
      widgetcode:
        "siqf3f0ab8d8af41a162f9dc9755f982de1821aec335d8e9c6b8aaea4475e1761b0",
      values: {},
      ready: function () {},
    };

    const script = document.createElement("script");
    script.id = "zsiqscript";
    script.src = "https://salesiq.zohopublic.com/widget";
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      const existing = document.getElementById("zsiqscript");
      if (existing) existing.remove();
      delete window.$zoho?.salesiq;
    };
  }, []);

  return (
    <div className="w-full flex h-screen">
      <PainterSidebar />
      <main className="flex-1 pt-20 px-4 pb-4 md:pt-0 md:px-3 overflow-y-auto h-screen">
        <div className="hidden md:flex justify-between items-center bg-white p-4 w-full rounded-xl shadow-md sticky top-0 z-20">
          <img src={capLogo} alt="/" width={120} />

          <div className="flex items-center">
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
                              onClick={() => setPainterModalOpen(true)}
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
                              onClick={() => setPasswordModal(true)}
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
                                navigate("/");
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

      <PainterInfoModal
        isOpen={painterModalOpen}
        closePainterModal={() => setPainterModalOpen(false)}
      />
      <ChangePainterPasswordModal
        isOpen={passwordModal}
        closePasswordModal={() => setPasswordModal(false)}
      />
    </div>
  );
};

export default PainterLayout;

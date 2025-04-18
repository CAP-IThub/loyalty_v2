import React, { Fragment, useEffect, useState } from "react";
import capLogo from "../../assets/images/cap-logo.png";
import {
  FaBell,
  FaFileInvoice,
  FaHistory,
  FaKey,
  FaShoppingBag,
  FaUserCircle,
} from "react-icons/fa";
import userIcon from "../../assets/images/userIcon.png";
import { useDispatch, useSelector } from "react-redux";
import { GoSignOut } from "react-icons/go";
import { logoutUser } from "../../slices/authSlice";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { Link, useNavigate } from "react-router-dom";
import { HiChevronDown } from "react-icons/hi";
import axios from "../../utils/axiosInstance";
import { baseUrl } from "../../utils/baseUrl";
import ProfileModal from "../../partnerComponents/modals/ProfileModal";
import PartnerMetrics from "../../partnerComponents/PartnerMetrics";
import PurchaseAnalytics from "../../partnerComponents/PurchaseAnalytics";
import RecentOrders from "../../partnerComponents/RecentOrders";

const PartnerDashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const [partnerInfo, setPartnerInfo] = useState(null);

  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchPartner = async () => {
      try {
        const res = await axios.get(`${baseUrl}/auth/partner`);
        console.log(res.data.data.partner[0]);
        console.log(res.data.data);
        const user = res.data.data.partner[0];
        const mappedUser = {
          id: user.id,
          first_name: user.firstName,
          last_name: user.lastName,
          email: user.email,
          phone: user.phoneNumber,
        };
        setPartnerInfo(mappedUser);
      } catch (err) {
        console.error("Failed to fetch Partner info:", err);
      }
    };

    fetchPartner();
  }, []);

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Topbar */}
      <div className="hidden md:flex justify-between items-center bg-white p-4 w-full rounded-xl shadow-md sticky top-0 z-20">
        <img src={capLogo} alt="/" width={120} />

        <div className="flex items-center space-x-6">
          <div className="flex items-center gap-2">
            <FaBell className="text-xl text-[#0B0F28]" />
            <span className="text-xs">Notifications</span>
          </div>

          <div className="flex items-center justify-between mr-10">
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
                            onClick={() => setShowModal(true)}
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
                          <Link
                            to="/change-password"
                            className={`$${
                              active
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-700"
                            } flex justify-between items-center px-4 py-2 text-sm`}
                          >
                            Change Password <FaKey className="ml-2" />
                          </Link>
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

      {/* Dashboard Overview */}
      <div className="space-y-3 px-2">
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-gray-800">Metrics</h2>
        </div>
        <div>
          <PartnerMetrics />
        </div>
        {/* Quick Actions */}
        <div className="py-3">
          <h2 className="font-semibold text-gray-800 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-[#d7e2f3] text-center p-5 rounded-xl">
              <FaFileInvoice
                size={24}
                className="mx-auto mb-2 text-[#0B1F47]"
              />
              <p className="text-sm font-medium">Account Statements</p>
            </div>
            <div className="bg-[#d7e2f3] text-center p-5 rounded-xl">
              <FaHistory size={24} className="mx-auto mb-2 text-[#0B1F47]" />
              <p className="text-sm font-medium">History</p>
            </div>
            <div className="bg-[#d7e2f3] text-center p-5 rounded-xl">
              <FaShoppingBag
                size={24}
                className="mx-auto mb-2 text-[#0B1F47]"
              />
              <p className="text-sm font-medium">Order Now</p>
            </div>
          </div>
        </div>
        {/* Purchase Analytics */}
        <div className="py-3">
          <h2 className="font-semibold text-gray-800 mb-4">
            Purchase Analytics
          </h2>
          <div>
            <PurchaseAnalytics />
          </div>
        </div>
        {/* Recent Orders */}
        <div className="py-3">
          <RecentOrders />
        </div>
      </div>

      <ProfileModal
        isOpen={showModal}
        closeProfileModal={() => setShowModal(false)}
        partner={partnerInfo}
      />
    </div>
  );
};

export default PartnerDashboard;

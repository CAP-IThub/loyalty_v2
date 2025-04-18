import React, { Fragment, useEffect, useState } from "react";
import capLogo from "../../assets/images/cap-logo.png";
import { FaBell, FaKey, FaUserCircle } from "react-icons/fa";
import StatCard from "../../repComponents/StatCard";
import commissionIcon from "../../assets/images/commissionIcon.png";
import ordersIcon from "../../assets/images/ordersIcon.png";
import totalIcon from "../../assets/images/totalIcon.png";
import completedIcon from "../../assets/images/completedIcon.png";
import deliveredIcon from "../../assets/images/deliveredIcon.png";
import pendingIcon from "../../assets/images/pendingIcon.png";
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
import ProfileModal from "../../repComponents/modals/ProfileModal";

const RepDashboard = () => {
  const [data, setData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [repInfo, setRepInfo] = useState(null);

  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    // Dummy API data
    setData({
      totalVisits: 9700,
      totalPurchases: 4000,
      totalPoints: 3000349,
      returnedClaimed: 590,
      totalOrders: 40000000,
      completedOrders: 38000000,
    });

    const fetchRep = async () => {
      try {
        const res = await axios.get(`${baseUrl}/auth/rep`);
        console.log(res.data.data.rep);
        const user = res.data.data.rep;
        const mappedUser = {
          id: user.id,
          first_name: user.firstName,
          last_name: user.lastName,
          email: user.email,
          phone: user.phoneNum,
          registration_date: user.created_at?.split("T")[0],
        };
        setRepInfo(mappedUser);
      } catch (err) {
        console.error("Failed to fetch rep info:", err);
      }
    };

    fetchRep();
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
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <h2 className="md:text-xl font-semibold">Rep Overview</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
          <StatCard
            icon={commissionIcon}
            title="Total Visits"
            value={data.totalVisits?.toLocaleString()}
            growth={10}
            growthType="up"
          />
          <StatCard
            icon={ordersIcon}
            title="Total Purchases"
            value={data.totalPurchases?.toLocaleString()}
            growth={12}
            growthType="down"
          />
          <StatCard
            icon={pendingIcon}
            title="Total Points"
            value={data.totalPoints?.toLocaleString()}
            growth={45}
            growthType="up"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
          <StatCard
            icon={totalIcon}
            title="Total Claimed"
            value={data.totalOrders?.toLocaleString()}
            growth={24.5}
            growthType="up"
          />
          <StatCard
            icon={deliveredIcon}
            title="Total Orders"
            value={data.totalOrders?.toLocaleString()}
            growth={45}
            growthType="down"
          />
          <StatCard
            icon={completedIcon}
            title="Total Completed Orders"
            value={data.completedOrders?.toLocaleString()}
            growth={10}
            growthType="up"
          />
        </div>
      </div>

      {/* Info Modal */}
      <ProfileModal
        isOpen={showModal}
        closeProfileModal={() => setShowModal(false)}
        rep={repInfo}
      />
    </div>
  );
};

export default RepDashboard;

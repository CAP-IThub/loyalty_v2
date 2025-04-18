import React, { Fragment, useEffect, useState } from "react";
import { FaBell, FaKey, FaUserCircle } from "react-icons/fa";
import StatCard from "../../adminComponents/StatCard";
import salesIcon from "../../assets/images/salesIcon.png";
import usersIcon from "../../assets/images/usersIcon.png";
import commissionIcon from "../../assets/images/commissionIcon.png";
import ordersIcon from "../../assets/images/ordersIcon.png";
import totalIcon from "../../assets/images/totalIcon.png";
import completedIcon from "../../assets/images/completedIcon.png";
import deliveredIcon from "../../assets/images/deliveredIcon.png";
import pendingIcon from "../../assets/images/pendingIcon.png";
import capLogo from "../../assets/images/cap-logo.png";
import DashboardCharts from "../../adminComponents/DashboardCharts";
import BestSellingTable from "../../adminComponents/BestSellingTable";
import RecentTransactionsTable from "../../adminComponents/RecentTransactionsTable";
import { useSelector } from "react-redux";
import { GoSignOut } from "react-icons/go";
import { logoutUser } from "../../slices/authSlice";
import userIcon from "../../assets/images/userIcon.png";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { HiChevronDown } from "react-icons/hi";
import { Link } from "react-router-dom";
import axios from "../../utils/axiosInstance";
import { ClipLoader } from "react-spinners";
import StatisticsChartAndRecentActivity from "../../adminComponents/StatisticsChartandRecentActivity";
import TransactionsTable from "../../adminComponents/TransactionsTable";

const AdminDashboard = () => {
  const [data, setData] = useState({});
  const auth = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(true); 

  const previousData = {
    totalCustomer: 3200,
    totalCenter: 38,
    totalPartner: 18,
    totalRep: 30,
    totalVisits: 175,
    totalAP: 3800000,
    totalClaimed: 1800000,
    totalUnclaimed: 1700000,
  };

  const calculateGrowth = (current, previous) => {
    if (!previous || previous === 0) return { growth: 0, growthType: "up" };
    const diff = current - previous;
    const percent = Math.abs((diff / previous) * 100).toFixed(1);
    return {
      growth: percent,
      growthType: diff >= 0 ? "up" : "down",
    };
  };

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/dashboard/card/stats");
        const stats = response.data?.data;
        setData(stats);
      } catch (error) {
        console.error("Failed to fetch admin stats", error);
        toast.error("Failed to load dashboard stats.");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const formatValue = (val) => {
    if (loading || val === undefined) {
      return <ClipLoader size={15} color="#FC7B00" />;
    }
    return Number(val).toLocaleString();
  };

  const getGrowthProps = (current, previous) => {
    if (loading) return { growth: null, growthType: null };
    return calculateGrowth(current, previous);
  };


  return (
    <div className="space-y-4 md:space-y-6">
      {/* Topbar */}
      {/* <div className="hidden md:flex justify-between items-center bg-white p-4 w-full rounded-xl shadow-md sticky top-0 z-20">
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
      </div> */}

      {/* Dashboard Overview */}
      <div className="space-y-3 mt-4">
        <div className="flex justify-between items-center">
          <h2 className="md:text-xl font-semibold">Admin Overview</h2>
          <div className="hidden md:flex space-x-2 text-xs">
            {/* {["Monthly", "Quarter", "Yearly"].map((label, idx) => (
              <button
                key={label}
                className={`px-4 py-1 rounded-full text-xs font-medium ${
                  label === "Yearly"
                    ? "bg-[#09204A] text-white"
                    : "bg-[#F8F8F8]"
                }`}
              >
                {label}
              </button>
            ))} */}
          </div>
        </div>

        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
            <StatCard
              icon={usersIcon}
              title="Total Customers"
              value={formatValue(data.totalCustomer)}
              {...getGrowthProps(
                data.totalCustomer,
                previousData.totalCustomer
              )}
            />
            <StatCard
              icon={totalIcon}
              title="Total Centers"
              value={formatValue(data.totalCenter)}
              {...getGrowthProps(data.totalCenter, previousData.totalCenter)}
            />
            <StatCard
              icon={completedIcon}
              title="Total Partners"
              value={formatValue(data.totalPartner)}
              {...getGrowthProps(data.totalPartner, previousData.totalPartner)}
            />
            <StatCard
              icon={deliveredIcon}
              title="Total Reps"
              value={formatValue(data.totalRep)}
              {...getGrowthProps(data.totalRep, previousData.totalRep)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
            <StatCard
              icon={totalIcon}
              title="Total Visits"
              value={formatValue(data.totalVisits)}
              {...getGrowthProps(data.totalVisits, previousData.totalVisits)}
            />
            <StatCard
              icon={completedIcon}
              title="Total AP"
              value={formatValue(data.totalAP)}
              {...getGrowthProps(data.totalAP, previousData.totalAP)}
            />
            <StatCard
              icon={deliveredIcon}
              title="Total Claimed"
              value={formatValue(data.totalClaimed)}
              {...getGrowthProps(data.totalClaimed, previousData.totalClaimed)}
            />
            <StatCard
              icon={pendingIcon}
              title="Total Unclaimed"
              value={formatValue(data.totalUnclaimed)}
              {...getGrowthProps(
                data.totalUnclaimed,
                previousData.totalUnclaimed
              )}
            />
          </div>
        </>
      </div>

      {/* Charts Section */}
      <StatisticsChartAndRecentActivity/>
      <TransactionsTable />

      {/* Tables Section */}
      <BestSellingTable />
      <RecentTransactionsTable />
    </div>
  );
};

export default AdminDashboard;

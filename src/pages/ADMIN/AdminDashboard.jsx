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
import TopFivePainters from "../../adminComponents/TopFivePainters";
import TopFiveCenters from "../../adminComponents/TopFiveCenters";

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

  const formatValue = (val, isCurrency = false) => {
    if (loading || val === undefined) {
      return <ClipLoader size={15} color="#FC7B00" />;
    }
    const formatted = Number(val).toLocaleString();
    return isCurrency ? `₦${formatted}` : formatted;
  };


  const getGrowthProps = (current, previous) => {
    if (loading) return { growth: null, growthType: null };
    return calculateGrowth(current, previous);
  };


  return (
    <div className="space-y-4 md:space-y-6">
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
              value={formatValue(data.totalAP, true)}
              {...getGrowthProps(data.totalAP, previousData.totalAP)}
            />
            <StatCard
              icon={deliveredIcon}
              title="Total Claimed"
              value={formatValue(data.totalClaimed, true)}
              {...getGrowthProps(data.totalClaimed, previousData.totalClaimed)}
            />
            <StatCard
              icon={pendingIcon}
              title="Total Unclaimed"
              value={formatValue(data.totalUnclaimed, true)}
              {...getGrowthProps(
                data.totalUnclaimed,
                previousData.totalUnclaimed
              )}
            />
          </div>
        </>
      </div>

      {/* Charts Section */}
      <StatisticsChartAndRecentActivity />
      <TopFivePainters />
      <TopFiveCenters />

      {/* Tables Section */}
      <TransactionsTable />
      {/* <BestSellingTable />
      <RecentTransactionsTable /> */}
    </div>
  );
};

export default AdminDashboard;

import React, { useEffect, useState } from "react";
import { FaBell } from "react-icons/fa";
import StatCard from "../../adminComponents/StatCard";
import salesIcon from "../../assets/images/salesIcon.png";
import usersIcon from "../../assets/images/usersIcon.png";
import commissionIcon from "../../assets/images/commissionIcon.png";
import ordersIcon from "../../assets/images/ordersIcon.png";
import totalIcon from "../../assets/images/totalIcon.png";
import completedIcon from "../../assets/images/completedIcon.png";
import deliveredIcon from "../../assets/images/deliveredIcon.png";
import pendingIcon from "../../assets/images/pendingIcon.png";
import cancelledIcon from "../../assets/images/cancelledIcon.png";
import capLogo from "../../assets/images/cap-logo.png";
import logo from "../../assets/images/sideLogo.png";
import DashboardCharts from "../../adminComponents/DashboardCharts";
import BestSellingTable from "../../adminComponents/BestSellingTable";
import RecentTransactionsTable from "../../adminComponents/RecentTransactionsTable";

const AdminDashboard = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    // Dummy API data
    setData({
      totalSale: 30349700,
      totalUsers: 4000,
      totalCommission: 3000349,
      returnedOrders: 590,
      totalOrders: 40000000,
      completedOrders: 38000000,
      partlyDelivered: 24,
      pendingOrders: 254,
      cancelledOrders: 109,
    });
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

          <div className="flex items-center space-x-2">
            <img src={logo} className="rounded-full" alt="profile" width={40} />
            <span className="text-xs">Hi, Gleb</span>
          </div>
        </div>
      </div>

      {/* Dashboard Overview */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <h2 className="md:text-xl font-semibold">Admin Overview</h2>
          <div className="hidden md:flex space-x-2 text-xs">
            {["Monthly", "Quarter", "Yearly"].map((label, idx) => (
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
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
          <StatCard
            icon={salesIcon}
            title="Total Sale"
            value={`₦${data.totalSale?.toLocaleString()}`}
            growth={45}
            growthType="up"
          />
          <StatCard
            icon={usersIcon}
            title="Total Users"
            value={data.totalUsers?.toLocaleString()}
            growth={24.5}
            growthType="down"
          />
          <StatCard
            icon={commissionIcon}
            title="Total Commission Given"
            value={`₦${data.totalCommission?.toLocaleString()}`}
            growth={10}
            growthType="up"
          />
          <StatCard
            icon={ordersIcon}
            title="Total Returned Orders"
            value={data.returnedOrders?.toLocaleString()}
            growth={12}
            growthType="down"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
          <StatCard
            icon={totalIcon}
            title="Total Orders"
            value={data.totalOrders?.toLocaleString()}
            growth={24.5}
            growthType="up"
          />
          <StatCard
            icon={completedIcon}
            title="Total Completed Orders"
            value={data.completedOrders?.toLocaleString()}
            growth={10}
            growthType="up"
          />
          <StatCard
            icon={deliveredIcon}
            title="Partly Delivered"
            value={data.partlyDelivered?.toLocaleString()}
            growth={45}
            growthType="down"
          />
          <StatCard
            icon={pendingIcon}
            title="Total Pending Orders"
            value={data.pendingOrders?.toLocaleString()}
            growth={45}
            growthType="up"
          />
          {/* <StatCard
            icon={cancelledIcon}
            title="Total Cancelled Orders"
            value={data.cancelledOrders?.toLocaleString()}
            growth={12}
            growthType="down"
          /> */}
        </div>
      </div>

      {/* Charts Section */}
      <DashboardCharts />

      {/* Tables Section */}
      <BestSellingTable />
      <RecentTransactionsTable />
    </div>
  );
};

export default AdminDashboard;

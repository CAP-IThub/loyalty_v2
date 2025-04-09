import React, { useEffect, useState } from 'react'
import capLogo from "../../assets/images/cap-logo.png";
import logo from "../../assets/images/sideLogo.png";
import { FaBell } from 'react-icons/fa';
import StatCard from '../../repComponents/StatCard';
import commissionIcon from "../../assets/images/commissionIcon.png";
import ordersIcon from "../../assets/images/ordersIcon.png";
import totalIcon from "../../assets/images/totalIcon.png";
import completedIcon from "../../assets/images/completedIcon.png";
import deliveredIcon from "../../assets/images/deliveredIcon.png";
import pendingIcon from "../../assets/images/pendingIcon.png";

const RepDashboard = () => {
    const [data, setData] = useState({});

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
    </div>
  );
}

export default RepDashboard
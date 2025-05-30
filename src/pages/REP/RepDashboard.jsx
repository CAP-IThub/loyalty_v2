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
      {/* Dashboard Overview */}
      <div className="space-y-3 py-[2.4rem]">
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
};

export default RepDashboard;

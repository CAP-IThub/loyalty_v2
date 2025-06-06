import React, { useEffect, useState } from "react";
import axios from "../../utils/axiosInstance";
import { useParams } from "react-router-dom";
import usersIcon from "../../assets/images/usersIcon.png";
import totalIcon from "../../assets/images/totalIcon.png";
import deliveredIcon from "../../assets/images/deliveredIcon.png";
import pendingIcon from "../../assets/images/pendingIcon.png";
import StatCard from "../../partnerComponents/StatCard";
import PartnerCenterDetailsChart from "../../partnerComponents/PartnerCenterDetailsChart";
import CenterStats from "../../partnerComponents/CenterStats";

const PartnerCenterDetails = () => {
  const { id } = useParams();
  const [stats, setStats] = useState({});

  useEffect(() => {
    const fetchCenterStats = async () => {
      try {
        const res = await axios.get(`/dashboard/partner/card?centerId=${id}`);
        setStats(res.data.data || {});
      } catch (error) {
        console.error("Failed to fetch center overview stats", error);
      }
    };

    fetchCenterStats();
  }, [id]);

  const formatValue = (val) => {
    if (val === null || val === undefined) return "0";
    return Number(val).toLocaleString();
  };

  return (
    <div className="space-y-4 md:space-y-6 px-2">
      <div className="space-y-3 mt-4">
        <div className="flex justify-between items-center">
          <h2 className="md:text-xl font-semibold">Center Overview</h2>
        </div>

        {/* StatCard Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            icon={usersIcon}
            title="Total Customers"
            value={formatValue(stats.totalCustomer)}
          />
          <StatCard
            icon={totalIcon}
            title="Total Accrued"
            value={formatValue(stats.totalAccrued)}
          />
          <StatCard
            icon={deliveredIcon}
            title="Total Claimed"
            value={formatValue(stats.totalClaimed)}
          />
          <StatCard
            icon={pendingIcon}
            title="Total Unclaimed"
            value={formatValue(stats.totalUnclaimed)}
          />
        </div>

        {/* Chart Section */}
        <PartnerCenterDetailsChart />

        {/* Center Stats Section */}
        <CenterStats centerId={id} />
      </div>
    </div>
  );
};

export default PartnerCenterDetails;

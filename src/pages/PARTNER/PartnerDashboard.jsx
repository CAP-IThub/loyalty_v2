import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "../../utils/axiosInstance";
import StatCard from "../../adminComponents/StatCard";
import usersIcon from "../../assets/images/usersIcon.png";
import totalIcon from "../../assets/images/totalIcon.png";
import deliveredIcon from "../../assets/images/deliveredIcon.png";
import pendingIcon from "../../assets/images/pendingIcon.png";
import { ClipLoader } from "react-spinners";
import CenterTable from "../../partnerComponents/CenterTable";

const PartnerDashboard = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      const res = await axios.get("/dashboard/partner/card/all");
      setData(res.data.data || {});
    } catch (err) {
      console.error("Failed to fetch partner stats", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const formatValue = (val) => {
    if (loading || val === undefined) {
      return <ClipLoader size={15} color="#FC7B00" />;
    }
    return Number(val).toLocaleString();
  };  

  return (
    <div className="space-y-4 md:space-y-6 px-2">
      <div className="space-y-3 mt-4">
        <div className="flex justify-between items-center">
          <h2 className="md:text-xl font-semibold">Partner Overview</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
          <StatCard
            icon={usersIcon}
            title="Total Customers"
            value={formatValue(data.totalCustomer)}
          />
          <StatCard
            icon={totalIcon}
            title="Total Accrued"
            value={formatValue(data.totalAccrued)}
          />
          <StatCard
            icon={deliveredIcon}
            title="Total Claimed"
            value={formatValue(data.totalClaimed)}
          />
          <StatCard
            icon={pendingIcon}
            title="Total Unclaimed"
            value={formatValue(data.totalUnclaimed)}
          />
        </div>
      </div>

      <div className="mt-6">
        <h3 className="md:text-lg font-semibold mb-2">Partner Centers</h3>
        <CenterTable />
      </div>
    </div>
  );
};

export default PartnerDashboard;

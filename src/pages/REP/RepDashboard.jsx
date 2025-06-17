import React, { useEffect, useState } from "react";
import axios from "../../utils/axiosInstance";
import StatCard from "../../adminComponents/StatCard";
import usersIcon from "../../assets/images/usersIcon.png";
import totalIcon from "../../assets/images/totalIcon.png";
import deliveredIcon from "../../assets/images/deliveredIcon.png";
import pendingIcon from "../../assets/images/pendingIcon.png";
import { ClipLoader } from "react-spinners";
import { IoIosPersonAdd } from "react-icons/io";
import SageModal from "../../repComponents/modals/SageModal";
import { useSage } from "../../context/SageContext";

const RepDashboard = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [centerId, setCenterId] = useState(null);
  const [sageModalOpen, setSageModalOpen] = useState(false);
  const { isConnected } = useSage();

  const fetchRepInfo = async () => {
    try {
      const res = await axios.get("/auth/rep");
      const repData = res.data.data;

      localStorage.setItem("repInfo", JSON.stringify(repData));
      const repCenter = res.data.data.center;

      let extractedCenterId = null;
      if (Array.isArray(repCenter)) {
        extractedCenterId = repCenter[0]?.id;
      } else if (typeof repCenter === "object") {
        extractedCenterId = repCenter?.id;
      }

      if (extractedCenterId) {
        setCenterId(extractedCenterId);
        fetchStats(extractedCenterId);
      } else {
        console.warn("No valid center ID found");
        setLoading(false);
      }
    } catch (err) {
      console.error("Failed to fetch rep info", err);
      setLoading(false);
    }
  };

  const fetchStats = async (centerId) => {
    try {
      const res = await axios.get(`/dashboard/rep/card/stats`, {
        params: { centerId },
      });

      const stats = res.data.data || {};
      setData({
        customerVisits: stats.customerVisits,
        totalPurchases: stats.totalpurchases,
        totalPoints: stats.totalPoints,
        totalClaimed: stats.totalClaimed,
      });
    } catch (err) {
      console.error("Failed to fetch rep stats", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRepInfo();
  }, []);

  const formatValue = (val) => {
    if (loading || val === undefined) {
      return <ClipLoader size={15} color="#FC7B00" />;
    }
    return Number(val).toLocaleString();
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="space-y-3 py-[1rem]">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="md:text-xl font-semibold">Rep Overview</h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              disabled={isConnected}
              className={`flex items-center gap-2 ${
                isConnected
                  ? "bg-green-600 cursor-not-allowed"
                  : "bg-[#FC7B00] hover:bg-orange-600"
              } text-white rounded-md px-4 py-2 text-sm transition`}
              onClick={() => {
                if (!isConnected) setSageModalOpen(true);
              }}
            >
              {isConnected ? "Sage Connected" : "Connect to Sage"}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
          <StatCard
            icon={usersIcon}
            title="Customers Visits"
            value={formatValue(data.customerVisits)}
          />
          <StatCard
            icon={totalIcon}
            title="Total Purchases"
            value={formatValue(data.totalPurchases)}
          />
          <StatCard
            icon={deliveredIcon}
            title="Total Points"
            value={formatValue(data.totalPoints)}
          />
          <StatCard
            icon={pendingIcon}
            title="Total Claimed"
            value={formatValue(data.totalClaimed)}
          />
        </div>
      </div>

      <SageModal
        isOpen={sageModalOpen}
        closeSageModal={() => setSageModalOpen(false)}
      />
    </div>
  );
};

export default RepDashboard;

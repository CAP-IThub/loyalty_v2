import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import StatCard from "../../painterComponents/StatCard";
import axios from "../../utils/axiosInstance";
import TableComponent from "../../painterComponents/TableComponent";
import { MdRedeem } from "react-icons/md";
import RedeemPointsModal from "../../painterComponents/modals/RedeemPointsModal";

const PainterDashboard = () => {
  const [data, setData] = useState({});
  const auth = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(true);
  const [statData, setStatData] = useState(null);
  const [invoices, setInvoices] = useState([]);
  const [history, setHistory] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/v2/customer/details");
        const data = res.data.data;

        const currentPoints = data.current_balance.point;
        const lifetimePoints = data.lifetime_points;
        const tierName = data.loyalty_tier.name;
        const tiers = data.tiers;
        const joinedDate = data.customerDetails.created_at;

        const nextTier = tiers.find((tier) => tier.min_points > currentPoints);

        const nextTierName = nextTier?.name || null;
        const pointsToNextTier = nextTier
          ? nextTier.min_points - currentPoints
          : 0;
        const progress = nextTier
          ? Math.min(
              Math.round((currentPoints / nextTier.min_points) * 100),
              100
            )
          : 100;

        setStatData({
          currentPoints,
          lifetimePoints,
          tierName,
          nextTierName,
          pointsToNextTier,
          progress,
          joinedDate,
        });
      } catch (err) {
        console.error("Failed to load dashboard data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchTables = async () => {
      try {
        const invoicesRes = await axios.get("/v2/customer/invoices/history");

        const invoiceList = invoicesRes.data.data.data
          .slice(0, 4)
          .map((inv) => ({
            number: inv.invoiceCode,
            date: new Date(inv.created_at).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            }),
            amount: Math.round(inv.amount),
          }));

        const transactionRes = await axios.get("/v2/customer/transactions");

        const historyList = transactionRes.data.data.data
          .slice(0, 4)
          .map((item) => ({
            entryType: item.entry_type,
            points: item.value,
            created_at: item.created_at,
          }));

        setInvoices(invoiceList);
        setHistory(historyList);
      } catch (err) {
        console.error("Failed to load tables", err);
      }
    };

    fetchTables();
  }, []);

  return (
    <div className="space-y-4 md:space-y-6 px-2">
      <div className="space-y-3 mt-4 mb-2">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl md:text-2xl font-bold mb-1">
              Welcome back, {auth.first_name}!{" "}
              <span className="inline-block">👋</span>
            </h1>
            <p className="text-sm text-gray-600">
              Here's an overview of your rewards and activities
            </p>
          </div>
          <div>
            <button
              className="flex items-center gap-2 bg-[#FC7B00] text-white rounded-md px-4 py-2 text-sm hover:opacity-90"
              onClick={() => setIsModalOpen(true)}
            >
              <MdRedeem size={16} />
              Cash Withdrawals
            </button>
          </div>
        </div>
      </div>

      <div>
        <StatCard {...statData} loading={loading} />
        <TableComponent invoices={invoices} history={history} />
      </div>

      <RedeemPointsModal
        isOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
        statData={statData}
      />
    </div>
  );
};

export default PainterDashboard;

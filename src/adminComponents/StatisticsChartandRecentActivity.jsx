import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  CartesianGrid,
} from "recharts";
import { FaBell } from "react-icons/fa";
import axios from "../utils/axiosInstance";
import { ClipLoader } from "react-spinners";
import { Link } from "react-router-dom";

const StatisticsChartAndRecentActivity = () => {
  const [year, setYear] = useState("2025");
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activities, setActivities] = useState([]);

  const fetchBarStats = async (selectedYear) => {
    try {
      setLoading(true);
      const res = await axios.get(`/dashboard/bar/stats?year=${selectedYear}`);
      const raw = res.data.data;
      const [year, customers, enrolled, points, visits, claimed] = raw;
      const formatted = customers.map((_, i) => ({
        month: new Date(2023, i).toLocaleString("default", { month: "short" }),
        customers: customers[i],
        enrolled: enrolled[i],
        points: Number(points[i]),
        visits: visits[i],
        claimed: claimed[i],
      }));
      setChartData(formatted);
    } catch (err) {
      console.error("Failed to fetch chart stats", err);
    } finally {
      setLoading(false);
    }
  };

  const formatNumber = (value) => {
    return new Intl.NumberFormat().format(value);
  };


  const fetchRecentActivities = async () => {
    try {
      const res = await axios.get("/activity");
      setActivities(res.data.data.slice(0, 5));
    } catch (err) {
      console.error("Failed to fetch activities", err);
    }
  };

  useEffect(() => {
    fetchBarStats(year);
    fetchRecentActivities();
  }, [year]);

  return (
    <div className="grid md:grid-cols-3 gap-2 w-full">
      <div className="col-span-2 bg-white pt-4 px-2 rounded-xl shadow-md">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold">Statistics</h3>
          <select
            className="text-sm border px-2 py-1 rounded-md"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          >
            {[2025, 2024, 2023, 2022, 2021, 2020].map((yr) => (
              <option key={yr} value={yr}>
                {yr}
              </option>
            ))}
          </select>
        </div>
        <ResponsiveContainer width="100%" height={480}>
          <BarChart
            data={chartData}
            barSize={6}
            margin={{ top: 30, right: 0, left: 5, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" className="text-sm" />
            <YAxis className="text-xs" tickFormatter={formatNumber} />
            <Tooltip
              className="text-xs"
              formatter={(value) => formatNumber(value)}
              labelFormatter={(label) => `Month: ${label}`}
            />
            <Legend className="text-xs" />
            <Bar
              dataKey="customers"
              fill="#e74c3c"
              name="Total Customers"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="enrolled"
              fill="#2ecc71"
              name="Total Enrolled"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="points"
              fill="#8e44ad"
              name="Total Points"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="visits"
              fill="#e67e22"
              name="Total Visits"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="claimed"
              fill="#2980b9"
              name="Total Claimed"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
        {loading && (
          <div className="mt-4 flex justify-center">
            <ClipLoader size={25} color="#FC7B00" />
          </div>
        )}
      </div>

      <div className="bg-white p-4 rounded-xl shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Recent Activities</h3>
          <Link
            to="/admin/activities"
            className="text-sm text-[#0B0F28] font-medium hover:underline"
          >
            View All
          </Link>
        </div>
        <ul className="space-y-4">
          {activities.map((activity, index) => (
            <li
              key={activity.id || index}
              className="flex items-start gap-3 bg-[#F9FAFB] p-3 rounded-md shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="bg-[#E0E7FF] text-[#4338CA] p-2 rounded-full">
                <FaBell className="text-lg" />
              </div>
              <div>
                <p className="text-xs text-gray-700 font-medium leading-snug">
                  {activity.description}
                </p>
                <span className="text-xs text-gray-400">
                  {new Date(activity.created_at).toLocaleString()}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default StatisticsChartAndRecentActivity;

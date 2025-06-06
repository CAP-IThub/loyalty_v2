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
import { ClipLoader } from "react-spinners";
import axios from "../utils/axiosInstance";
import { useParams } from "react-router-dom";

const PartnerCenterDetailsChart = () => {
  const { id } = useParams();
  const [year, setYear] = useState("2025");
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchChartData = async (year) => {
    try {
      setLoading(true);
      const res = await axios.get(
        `/dashboard/partner/bar?year=${year}&centerId=${id}`
      );
      const [_, customers, visits, points, claimed] = res.data.data;

      const formatted = customers.map((_, i) => ({
        month: new Date(2025, i).toLocaleString("default", { month: "short" }),
        customers: customers[i],
        visits: visits[i],
        points: points[i],
        claimed: claimed[i],
      }));

      setChartData(formatted);
    } catch (err) {
      console.error("Error loading bar data", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChartData(year);
  }, [year]);

  return (
    <div className="bg-white rounded-xl shadow-md p-4 mt-4">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-semibold">Center Statistics</h3>
        <select
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="border px-2 py-1 text-sm rounded-md"
        >
          {[2025, 2024, 2023, 2022, 2021].map((yr) => (
            <option key={yr} value={yr}>
              {yr}
            </option>
          ))}
        </select>
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={chartData}
          barSize={8}
          margin={{ top: 20, right: 20, left: 5, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" className="text-xs" />
          <YAxis className="text-xs" />
          <Tooltip />
          <Legend className="text-xs" />
          <Bar
            dataKey="customers"
            fill="#e74c3c"
            name="Customers"
            radius={[4, 4, 0, 0]}
          />
          <Bar
            dataKey="visits"
            fill="#f39c12"
            name="Visits"
            radius={[4, 4, 0, 0]}
          />
          <Bar
            dataKey="points"
            fill="#8e44ad"
            name="Points"
            radius={[4, 4, 0, 0]}
          />
          <Bar
            dataKey="claimed"
            fill="#2980b9"
            name="Claimed"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>

      {loading && (
        <div className="flex justify-center mt-4">
          <ClipLoader size={25} color="#FC7B00" />
        </div>
      )}
    </div>
  );
};

export default PartnerCenterDetailsChart;

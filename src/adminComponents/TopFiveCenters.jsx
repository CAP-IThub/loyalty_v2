import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LabelList,
  CartesianGrid,
} from "recharts";
import axios from "../utils/axiosInstance";

const endpointMap = {
  "Top Center (Accrued)": "/center/top/accrued",
  "Top Center (Visits)": "/center/top/visit",
  "Top Partner (Claimed)": "/center/top/claim",
  "Top Partner (Enrolled)": "/center/top/enrol",
};

const centerColors = {
  "Top Center (Accrued)": "#3949ab",
  "Top Center (Visits)": "#00897b",
  "Top Partner (Claimed)": "#f4511e",
  "Top Partner (Enrolled)": "#6a1b9a",
};

const CenterBarChart = ({ title, data, color }) => (
  <div className="bg-white py-4 pr-5 rounded-xl shadow-md w-full">
    <h4 className="text-center text-base font-semibold mb-4 text-[#0B1C39]">
      {title}
    </h4>
    <ResponsiveContainer width="100%" height={250}>
      <BarChart layout="vertical" data={data} margin={{ right: 20, left: -20 }}>
        {/* <CartesianGrid strokeDasharray="3 3" /> */}
        <XAxis type="number" hide />
        <YAxis
          type="category"
          dataKey="name"
          width={120}
          tick={{ fontSize: 13 }}
        />
        <Tooltip formatter={(value) => value.toLocaleString()} />
        <Bar dataKey="value" fill={color} radius={[0, 6, 6, 0]} barSize={22}>
          <LabelList
            dataKey="value"
            position="right"
            formatter={(val) => val.toLocaleString()}
            style={{ fontSize: 13 }}
          />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  </div>
);

const TopFiveCenters = () => {
  const [centerData, setCenterData] = useState({});

  const fetchChartData = async () => {
    try {
      const chartEntries = await Promise.all(
        Object.entries(endpointMap).map(async ([title, endpoint]) => {
          const res = await axios.get(endpoint);
          const formatted = res.data.data.map((item) => ({
            name: item.name,
            value: item.amount ?? item.visit ?? item.points ?? item.customers,
          }));
          return [title, formatted];
        })
      );

      const result = Object.fromEntries(chartEntries);
      setCenterData(result);
    } catch (err) {
      console.error("Failed to fetch center data", err);
    }
  };

  useEffect(() => {
    fetchChartData();
  }, []);

  return (
    <div className="space-y-3">
      <h2 className="md:text-xl font-semibold">Top Five Centers</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(centerData).map(([title, data]) => (
          <CenterBarChart
            key={title}
            title={title}
            data={data}
            color={centerColors[title]}
          />
        ))}
      </div>
    </div>
  );
};

export default TopFiveCenters;

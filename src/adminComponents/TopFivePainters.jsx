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

const chartColors = {
  "Top Accruer": "#0B1C39",
  "Total Redeemed": "#1E88E5",
  "Total Unclaimed": "#F4511E",
  Visits: "#43A047",
};

const endpoints = {
  "Top Accruer": "/top/accruer",
  "Total Redeemed": "/top/redeemed",
  "Total Unclaimed": "/top/unclaimed",
  Visits: "/top/visit",
};

const CustomBarChart = ({ title, data, color }) => (
  <div className="bg-white py-4 pr-5 rounded-xl shadow-md w-full">
    <h4 className="text-center text-base font-semibold mb-4 text-[#0B1C39]">
      {title}
    </h4>
    <ResponsiveContainer width="100%" height={250}>
      <BarChart layout="vertical" data={data} margin={{ right: 0, left: 20 }}>
        <CartesianGrid strokeDasharray="3 3" />
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

const TopFivePainters = () => {
  const [dataMap, setDataMap] = useState({});

  const fetchChartData = async () => {
    try {
      const newDataMap = {};

      await Promise.all(
        Object.entries(endpoints).map(async ([label, endpoint]) => {
          const res = await axios.get(endpoint);
          const raw = res.data.data; // <- Accessing .data from API response

          const formattedData = raw.map((item) => ({
            name: `${item.firstName} ${item.lastName}`,
            value:
              item.points ||
              item.redeemed ||
              item.unclaimed ||
              item.visits ||
              0,
          }));

          newDataMap[label] = formattedData;
        })
      );

      setDataMap(newDataMap);
    } catch (error) {
      console.error("Failed to fetch top painters data", error);
    }
  };


  useEffect(() => {
    fetchChartData();
  }, []);

  return (
    <div className="space-y-6 pt-[2rem]">
      <h2 className="md:text-xl font-semibold">
        Top Five Painters
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(dataMap).map(([title, data]) => (
          <CustomBarChart
            key={title}
            title={title}
            data={data}
            color={chartColors[title]}
          />
        ))}
      </div>
    </div>
  );
};

export default TopFivePainters;

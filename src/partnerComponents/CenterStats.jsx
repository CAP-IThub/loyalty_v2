import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from "recharts";
import axios from "../utils/axiosInstance";

const performerMap = {
  "Top Accruer": "/dashboard/partner/top/accrued",
  "Top Visitor": "/dashboard/partner/top/visit",
  "Top Claimer": "/dashboard/partner/top/claimed",
};

const performerColors = {
  "Top Accruer": "#3949ab",
  "Top Visitor": "#00897b",
  "Top Claimer": "#f4511e",
};

const HorizontalBarChart = ({ title, data, color }) => (
  <div className="bg-white py-4 pr-5 rounded-xl shadow-md w-full">
    <h4 className="text-center text-base font-semibold mb-4 text-[#0B1C39]">
      {title}
    </h4>
    <ResponsiveContainer width="100%" height={250}>
      <BarChart layout="vertical" data={data} margin={{ right: 20, left: -20 }}>
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

const CenterStats = ({ centerId }) => {
  const [dataSets, setDataSets] = useState({});

  const fetchPerformerData = async () => {
    try {
      const entries = await Promise.all(
        Object.entries(performerMap).map(async ([title, endpoint]) => {
          const res = await axios.get(`${endpoint}?centerId=${centerId}`);
          const key = Object.keys(res.data.data)[0];
          const formatted = res.data.data[key].map((item) => ({
            name: `${item.firstName} ${item.lastName}`,
            value:
              item.totalPoints || item.totalVisit || item.totalClaimed || 0,
          }));
          return [title, formatted];
        })
      );
      setDataSets(Object.fromEntries(entries));
    } catch (err) {
      console.error("Failed to fetch top performers", err);
    }
  };

  useEffect(() => {
    if (centerId) fetchPerformerData();
  }, [centerId]);

  return (
    <div className="space-y-3 pt-2">
      <h2 className="md:text-xl font-semibold">Center top Performers</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(dataSets).map(([title, data]) => (
          <HorizontalBarChart
            key={title}
            title={title}
            data={data}
            color={performerColors[title]}
          />
        ))}
      </div>
    </div>
  );
};

export default CenterStats;

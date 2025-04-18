import React from "react";
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

const centerData = {
  "Top Center (Purchase)": [
    { name: "Shopper...", value: 9525670.38 },
    { name: "Swift and...", value: 4993550.44 },
    { name: "Breitenbe...", value: 1684771.3 },
    { name: "Gislason ...", value: 1305087 },
    { name: "Bauch Inc...", value: 1133500 },
  ],
  "Top Center (Frequency)": [
    { name: "Shopper...", value: 35 },
    { name: "Swift and...", value: 10 },
    { name: "Breitenbe...", value: 10 },
    { name: "Dietrich ...", value: 9 },
    { name: "Gislason ...", value: 7 },
  ],
  "Top Partner (Claimed)": [
    { name: "Shopper...", value: 219000 },
    { name: "Swift and...", value: 50625 },
    { name: "Breitenbe...", value: 37000 },
    { name: "Dietrich ...", value: 35500 },
    { name: "Gislason ...", value: 9000 },
  ],
  "Top Partner (Enrolled)": [
    { name: "Breitenbe...", value: 4 },
    { name: "Swift and...", value: 3 },
    { name: "Bauch Inc...", value: 3 },
    { name: "Dietrich ...", value: 3 },
    { name: "Gislason ...", value: 2 },
  ],
};

const centerColors = {
  "Top Center (Purchase)": "#3949ab",
  "Top Center (Frequency)": "#00897b",
  "Top Partner (Claimed)": "#f4511e",
  "Top Partner (Enrolled)": "#6a1b9a",
};

const CenterBarChart = ({ title, data, color }) => (
  <div className="bg-white py-4 pr-5 rounded-xl shadow-md w-full">
    <h4 className="text-center text-base font-semibold mb-4 text-[#0B1C39]">
      {title}
    </h4>
    <ResponsiveContainer width="100%" height={250}>
      <BarChart
        layout="vertical"
        data={data}
        // margin={{ top: 5, right: 40, bottom: 5, left: 10 }}
        margin={{ right: 20, left: -20, }}
      >
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

const TopFiveCenters = () => {
  return (
    <div className="space-y-6 mt-6">
      <h2 className="md:text-xl font-semibold text-center">Top Five Centers</h2>
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

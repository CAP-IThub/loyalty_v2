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

// Chart data
const chartData = {
  "Top Accruer": [
    { name: "CJ D.", value: 499738 },
    { name: "Emmanuel A.", value: 102379 },
    { name: "Charles M.", value: 89527 },
    { name: "Goke a.", value: 51011 },
    { name: "Moyinoluwa A.", value: 32648 },
  ],
  "Total Redeemed": [
    { name: "CJ D.", value: 259000 },
    { name: "Emmanuel A.", value: 37625 },
    { name: "Moyinoluwa A.", value: 30000 },
    { name: "Goke a.", value: 12070 },
    { name: "Sylvester U.", value: 10500 },
  ],
  "Total Unclaimed": [
    { name: "Charles M.", value: 79527.07 },
    { name: "Goke a.", value: 20127.75 },
    { name: "CJ D.", value: 2326.7 },
    { name: "Sylvester U.", value: 1422.04 },
    { name: "oludayo A.", value: 129 },
  ],
  Visits: [
    { name: "CJ D.", value: 19 },
    { name: "Goke a.", value: 9 },
    { name: "Sylvester U.", value: 4 },
    { name: "oludayo A.", value: 3 },
  ],
};

// Colors per chart
const chartColors = {
  "Top Accruer": "#0B1C39", // Dark navy
  "Total Redeemed": "#1E88E5", // Blue
  "Total Unclaimed": "#F4511E", // Orange
  Visits: "#43A047", // Green
};

// Chart component
const CustomBarChart = ({ title, data, color }) => (
  <div className="bg-white py-4 pr-5 rounded-xl shadow-md w-full">
    <h4 className="text-center text-base font-semibold mb-4 text-[#0B1C39]">
      {title}
    </h4>
    <ResponsiveContainer width="100%" height={250}>
      <BarChart
        layout="vertical"
        data={data}
        // margin={{ top: 5, right: 40, bottom: 5, left: 10 }}
        margin={{ right: 20, left: -20 }}
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

// Main section
const TopFivePainters = () => {
  return (
    <div className="space-y-6 mt-6">
      <h2 className="md:text-xl font-semibold text-center">Top Five Painters</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(chartData).map(([title, data]) => (
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

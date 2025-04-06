import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  Cell,
  PieChart,
  Pie,
  Legend,
} from "recharts";

const earningsData = [
  { name: "JAN", value: 600 },
  { name: "FEB", value: 900 },
  { name: "MAR", value: 800 },
  { name: "APR", value: 700 },
  { name: "MAY", value: 600 },
  { name: "JUNE", value: 500 },
  { name: "JULY", value: 400 },
  { name: "AUG", value: 450 },
  { name: "SEP", value: 700 },
  { name: "OCT", value: 1000 },
  { name: "NOV", value: 950 },
  { name: "DEC", value: 800 },
];

const transactionData = [
  { name: "Dcc Oworon", value: 60 },
  { name: "Dcc Opebi", value: 75 },
  { name: "Dcc Ikoyi", value: 55 },
  { name: "Dcc Admiralty", value: 95 },
  { name: "Dcc Ajah", value: 70 },
  { name: "Dcc Lekki", value: 72 },
];

const supportData = [
  {
    date: "2023-08-28",
    Complaints: 400000,
    Settled: 300000,
    Unattended: 250000,
    Pending: 200000,
  },
  {
    date: "2023-08-29",
    Complaints: 450000,
    Settled: 320000,
    Unattended: 260000,
    Pending: 210000,
  },
  {
    date: "2023-08-30",
    Complaints: 460000,
    Settled: 330000,
    Unattended: 270000,
    Pending: 220000,
  },
  {
    date: "2023-08-31",
    Complaints: 480000,
    Settled: 350000,
    Unattended: 290000,
    Pending: 230000,
  },
  {
    date: "2023-09-01",
    Complaints: 500000,
    Settled: 400000,
    Unattended: 300000,
    Pending: 240000,
  },
  {
    date: "2023-09-02",
    Complaints: 490000,
    Settled: 370000,
    Unattended: 280000,
    Pending: 220000,
  },
  {
    date: "2023-06-02",
    Complaints: 390000,
    Settled: 330000,
    Unattended: 180000,
    Pending: 240000,
  },
  {
    date: "2023-07-02",
    Complaints: 390000,
    Settled: 330000,
    Unattended: 230000,
    Pending: 270000,
  },
  {
    date: "2023-08-02",
    Complaints: 470000,
    Settled: 340000,
    Unattended: 260000,
    Pending: 120000,
  },
];

const pieData = [
  { name: "Dulux", value: 5000, fill: "#0B0F28" },
  { name: "Caplux", value: 5677, fill: "#FB923C" },
  { name: "Sandtex", value: 1845, fill: "#3B82F6" },
];

const maxValue = Math.max(...transactionData.map((d) => d.value));
const maxValue2 = Math.max(...earningsData.map((d) => d.value));

const DashboardCharts = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="bg-white p-4 rounded-xl shadow-md md:w-[70%]">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-lg">Company Earnings</h3>
            <div className="space-x-2">
              <button className="text-sm px-3 py-1 rounded-full bg-[#F8F8F8]">
                Daily
              </button>
              <button className="text-sm px-3 py-1 rounded-full bg-[#F8F8F8]">
                Weekly
              </button>
              <button className="text-sm px-3 py-1 rounded-full bg-[#F8F8F8]">
                Monthly
              </button>
              <button className="text-sm px-3 py-1 rounded-full bg-[#0B0F28] text-white">
                Yearly
              </button>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={earningsData} barSize={4}>
              <XAxis dataKey="name" className="text-sm" />
              <YAxis tickFormatter={(v) => `₦${v}M`} className="text-sm" />
              <Tooltip formatter={(v) => `₦${v}M`} />
              <Bar dataKey="value" fill="#E87C2E" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-md md:w-[30%]">
          <div className="mb-3">
            <h3 className="font-semibold text-lg">Users in last 30 minutes</h3>
            <p className="text-sm font-bold">16.5K</p>
            <span className="text-xs">Users per minute</span>
          </div>
          <ResponsiveContainer width="100%" height={50}>
            <LineChart
              data={new Array(40)
                .fill(0)
                .map((_, i) => ({ name: i, value: Math.random() * 100 }))}
            >
              <Line
                type="natural"
                dataKey="value"
                stroke="#E87C2E"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>

          <div className="mt-4">
            <h4 className="font-semibold text-sm mb-2">Sales by Centers</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-blue-700">DCC IKOYI</span>
                <span className="text-green-600">+25.8%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-blue-700">DCC GBAGADA</span>
                <span className="text-red-500">-16.2%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-blue-700">DCC OPEBI</span>
                <span className="text-green-600">+12.3%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-blue-700">DCC IKOYI</span>
                <span className="text-red-500">-11.9%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="bg-white p-4 rounded-xl shadow-md md:w-[70%]">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-lg">Transaction Volume</h3>
            <div className="space-x-2">
              <button className="text-sm px-3 py-1 rounded-full bg-[#F8F8F8]">
                Daily
              </button>
              <button className="text-sm px-3 py-1 rounded-full bg-[#F8F8F8]">
                Weekly
              </button>
              <button className="text-sm px-3 py-1 rounded-full bg-[#F8F8F8]">
                Monthly
              </button>
              <button className="text-sm px-3 py-1 rounded-full bg-[#0B0F28] text-white">
                2024
              </button>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={transactionData} barSize={300}>
              <XAxis dataKey="name" className="text-xs" />
              <YAxis tickFormatter={(v) => `${v}%`} className="text-sm" />
              <Tooltip formatter={(v) => `${v}%`} />
              {/* <Bar dataKey="value" fill="#E87C2E" radius={[6, 6, 0, 0]} /> */}
              <Bar dataKey="value">
                {transactionData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.value === maxValue ? "#E87C2E" : "#39CEF31A"} // Highlight max
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-md md:w-[30%]">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold text-lg">Top Centers</h3>
            <button className="text-sm bg-[#F8F8F8] px-3 py-1 rounded-full">
              This Week
            </button>
          </div>
          <ul className="space-y-2 text-sm">
            {[
              "DCC Oworonshoki",
              "DCC Opebi",
              "DCC Lekki",
              "DCC Ikoyi",
              "DCC Ikeja",
            ].map((center, i) => (
              <li
                key={center}
                className={`bg-gradient-to-r from-pink-500 to-purple-${
                  (5 - i) * 100
                } text-white px-3 py-2 rounded-lg`}
              >
                {center}
              </li>
            ))}
          </ul>
          <p className="text-xs text-gray-500 mt-2">
            *The Store with the highest volume in bars has the best performance
            per day.
          </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="bg-white p-4 rounded-xl shadow-md md:w-[70%]">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-lg">Sales</h3>
            <div className="space-x-2">
              <button className="text-sm px-3 py-1 rounded-full bg-[#F8F8F8]">
                Daily
              </button>
              <button className="text-sm px-3 py-1 rounded-full bg-[#F8F8F8]">
                Weekly
              </button>
              <button className="text-sm px-3 py-1 rounded-full bg-[#F8F8F8]">
                Monthly
              </button>
              <button className="text-sm px-3 py-1 rounded-full bg-[#0B0F28] text-white">
                2024
              </button>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={earningsData} barSize={100}>
              <XAxis dataKey="name" className="text-xs" />
              <YAxis className="text-xs" />
              <Tooltip formatter={(v) => `${v}%`} />
              {/* <Bar dataKey="value" fill="#FB923C" radius={[6, 6, 0, 0]} /> */}
              <Bar dataKey="value">
                {earningsData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.value === maxValue2 ? "#E87C2E" : "#39CEF31A"} // Highlight max
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-md md:w-[30%]">
          <h3 className="font-semibold text-lg mb-4">Top Selling Category</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                outerRadius={90}
                // label={({ name, value }) =>
                //   `${value.toLocaleString()} Per Day`
                // }
                className="text-xs"
              />
              <Legend layout="vertical" align="left" verticalAlign="top" />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="hidden md:block bg-white p-4 rounded-xl shadow-md">
        <h3 className="font-semibold text-lg mb-1">
          Customer Support Analysis
        </h3>
        <p className="text-sm text-gray-500 mb-4">
          Shows a snapshot of calls analysis on your system
        </p>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={supportData} barSize={10}>
            <XAxis dataKey="date" className="text-xs" />
            <YAxis className="text-xs" />
            <Tooltip />
            <Bar dataKey="Complaints" fill="#459C61" name="Total Complaints" />
            <Bar dataKey="Settled" fill="#4691E0" name="Total Settled" />
            <Bar dataKey="Unattended" fill="#D94040" name="Total Unattended" />
            <Bar dataKey="Pending" fill="#EA8D02" name="Total Pending" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DashboardCharts;

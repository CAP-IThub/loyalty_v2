import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { AreaChart, Area, ResponsiveContainer, Tooltip } from "recharts";

const metrics = [
  {
    label: "Total Orders",
    value: 0,
    percent: 0,
    compare: "Compared to 0 units Yesterday",
    data: [0, 0, 0, 0, 0, 0, 0],
  },
  {
    label: "Total Purchases",
    value: "₦0.00",
    percent: 0,
    compare: "Compared to (₦5,190.00 Yesterday)",
    data: [5, 3, 4, 6, 3, 2, 0],
  },
  {
    label: "Cancelled Orders",
    value: 0,
    percent: 0,
    compare: "Compared to 0 units Yesterday",
    data: [0, 0, 1, 0, 0, 0, 0],
  },
  {
    label: "Discount",
    value: "₦0.00",
    percent: -100,
    compare: "Compared to (₦1,061.64 Yesterday)",
    data: [5, 3, 6, 1, 3, 2, 0],
  },
];

const PurchaseAnalytics = () => {
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((item, i) => {
          const isPositive = item.percent > 0;

          const chartData = item.data.map((val, idx) => ({
            name: `Day ${idx + 1}`,
            value: val,
          }));

          return (
            <div
              key={i}
              className="bg-white rounded-xl p-5 border border-gray-200 relative overflow-hidden"
            >
              <div className="flex justify-between items-center text-sm text-gray-600">
                <span>{item.label}</span>
                <span
                  className={`flex items-center gap-1 font-semibold ${
                    isPositive ? "text-green-600" : "text-red-500"
                  }`}
                >
                  {Math.abs(item.percent)}%
                  {isPositive ? (
                    <FaArrowUp size={12} />
                  ) : (
                    <FaArrowDown size={12} />
                  )}
                </span>
              </div>

              <h3 className="text-2xl font-bold mt-2 text-gray-800">
                {item.value}
              </h3>

              <p className="text-xs text-gray-500 mt-1">{item.compare}</p>

              {/* Mini Chart with background gradient */}
              <div className="h-12 mt-3 -mb-3">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient
                        id={`chartColor-${i}`}
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#FC7B00"
                          stopOpacity={0.2}
                        />
                        <stop
                          offset="95%"
                          stopColor="#FC7B00"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <Tooltip
                      wrapperClassName="!bg-white !text-xs !shadow-md"
                      contentStyle={{ fontSize: 10 }}
                    />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="#FC7B00"
                      fillOpacity={1}
                      fill={`url(#chartColor-${i})`}
                      strokeWidth={2}
                      dot={false}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PurchaseAnalytics;

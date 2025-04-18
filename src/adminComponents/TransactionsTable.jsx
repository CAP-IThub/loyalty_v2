import React from "react";
import { Link } from "react-router-dom";

const recentAwarded = [
  {
    id: 84,
    amount: 75250,
    point: 752,
    painter: "oludayo A.",
    shop: "Bauch Inc.",
    address: "4516 Wolf",
  },
  {
    id: 83,
    amount: 75250,
    point: 752,
    painter: "oludayo A.",
    shop: "Bauch Inc.",
    address: "4516 Wolf",
  },
  {
    id: 82,
    amount: 752500,
    point: 7525,
    painter: "oludayo A.",
    shop: "Bauch Inc.",
    address: "4516 Wolf",
  },
  {
    id: 81,
    amount: 75250,
    point: 752,
    painter: "CJ D.",
    shop: "Berge, S...",
    address: "874 Windle",
  },
  {
    id: 80,
    amount: 75250,
    point: 752,
    painter: "CJ D.",
    shop: "Berge, S...",
    address: "874 Windle",
  },
];

const recentClaimed = [
  {
    id: 27,
    point: 37625,
    painter: "Emmanuel A.",
    shop: "Swift and...",
    address: "70908 Litt",
  },
  {
    id: 26,
    point: 8900,
    painter: "oludayo A.",
    shop: "Bauch Inc.",
    address: "4516 Wolf",
  },
  {
    id: 25,
    point: 1000,
    painter: "CJ D.",
    shop: "Berge, S...",
    address: "874 Windle",
  },
  {
    id: 24,
    point: 70,
    painter: "Goke a.",
    shop: "Bauch Inc.",
    address: "4516 Wolf",
  },
  {
    id: 23,
    point: 2500,
    painter: "CJ D.",
    shop: "Berge, S...",
    address: "874 Windle",
  },
];

const TransactionTable = ({ data, columns, title }) => {
  const getRoute = () => {
    if (title.toLowerCase().includes("awarded"))
      return "/admin/awarded-transactions";
    if (title.toLowerCase().includes("claimed"))
      return "/admin/claimed-transactions";
    return "/";
  };

  return (
    <div className="bg-white shadow-md rounded-xl p-4 w-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-[#0B0F28]">{title}</h3>
        <Link
          to={getRoute()}
          className="text-sm text-[#0B0F28] hover:underline"
        >
          View All
        </Link>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block">
        <table className="w-full text-sm text-left">
          <thead className="bg-[#f3f6fb] text-gray-600 font-semibold">
            <tr>
              {columns.map((col) => (
                <th key={col.accessor} className="py-3 px-4">
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => (
              <tr key={row.id} className={idx % 2 === 1 ? "bg-gray-50" : ""}>
                {columns.map((col) => (
                  <td key={col.accessor} className="py-2 px-4 text-gray-700">
                    {row[col.accessor]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Grid View */}
      <div className="md:hidden space-y-4">
        {data.map((row) => (
          <div key={row.id} className="bg-[#f9fafc] rounded-md p-3 shadow-sm">
            {columns.map((col) => (
              <div key={col.accessor} className="text-sm text-gray-700 mb-1">
                <span className="font-semibold text-gray-500">
                  {col.label}:{" "}
                </span>
                {row[col.accessor]}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};


const TransactionsTable = () => {
  return (
    <div>
      <div className="flex justify-between items-center">
        <h3 className="md:text-xl font-semibold">Transactions</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
        <TransactionTable
          title="Recent Awarded"
          data={recentAwarded}
          columns={[
            { label: "ID", accessor: "id" },
            { label: "Amount", accessor: "amount" },
            { label: "Point", accessor: "point" },
            { label: "Painter", accessor: "painter" },
            { label: "Shop", accessor: "shop" },
            { label: "Address", accessor: "address" },
          ]}
        />
        <TransactionTable
          title="Recent Claimed"
          data={recentClaimed}
          columns={[
            { label: "ID", accessor: "id" },
            { label: "Point", accessor: "point" },
            { label: "Painter", accessor: "painter" },
            { label: "Shop", accessor: "shop" },
            { label: "Address", accessor: "address" },
          ]}
        />
      </div>
    </div>
  );
};

export default TransactionsTable;

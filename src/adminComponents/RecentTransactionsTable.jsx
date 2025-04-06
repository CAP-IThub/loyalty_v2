// components/RecentTransactionsTable.jsx
import React, { useState } from "react";
import { FaEye } from "react-icons/fa";
import Pagination from "../components/Pagination";

const transactions = new Array(40).fill(null).map((_, i) => ({
  id: "#505689",
  center: `DCC ${
    [
      "Oworonshoki",
      "Opebi",
      "Gbagada",
      "Ikeja",
      "Ajah",
      "Admiralty",
      "Ikoyi",
      "Osolo Way",
      "Ajao",
    ][i % 9]
  } Center`,
  quantity: Math.floor(Math.random() * 150000 + 10000),
  amount: "₦550,000.00",
  date: "31/12/2023",
  time: "03:30pm",
  status: ["Successful", "Pending", "Failed"][i % 3],
}));

const statusColor = {
  Successful: "bg-green-500 text-white",
  Pending: "bg-yellow-400 text-black",
  Failed: "bg-red-600 text-white",
};

const RecentTransactionsTable = () => {
  const [page, setPage] = useState(1);
  const perPage = 10;
  const paginated = transactions.slice((page - 1) * perPage, page * perPage);

  return (
    <div className="bg-white p-4 rounded-xl shadow-md overflow-x-auto">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Recent Transactions</h3>
        <a href="#" className="text-blue-600 text-sm font-medium">
          View All
        </a>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block w-full min-w-[900px]">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left border-b">
              <th className="py-2">Transaction ID</th>
              <th className="py-2">Ordered by Centers</th>
              <th className="py-2">Quantity</th>
              <th className="py-2">Amount</th>
              <th className="py-2">Date</th>
              <th className="py-2">Status</th>
              <th className="py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((item, idx) => (
              <tr key={idx} className="border-b hover:bg-gray-50">
                <td>
                  <a href="#" className="text-blue-600">
                    {item.id}
                  </a>
                </td>
                <td>{item.center}</td>
                <td>{item.quantity.toLocaleString()}</td>
                <td>{item.amount}</td>
                <td>
                  {item.date}
                  <br />
                  <span className="text-xs text-gray-500">{item.time}</span>
                </td>
                <td>
                  <span
                    className={`px-2 py-1 text-xs rounded ${
                      statusColor[item.status]
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
                <td>
                  <button className="text-gray-600 hover:text-black">
                    <FaEye />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile View Cards */}
      <div className="block md:hidden space-y-4">
        {paginated.map((item, idx) => (
          <div key={idx} className="border rounded-lg p-3 shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <div>
                <p className="text-sm font-medium text-blue-600">{item.id}</p>
                <p className="text-sm text-gray-700">{item.center}</p>
              </div>
              <span
                className={`px-2 py-1 text-xs rounded ${
                  statusColor[item.status]
                }`}
              >
                {item.status}
              </span>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <div>
                <p className="font-medium">{item.date}</p>
                <p className="text-xs">{item.time}</p>
              </div>
              <button className="text-gray-600 hover:text-black">
                <FaEye />
              </button>
            </div>
          </div>
        ))}
      </div>

      <Pagination
        currentPage={page}
        totalPages={Math.ceil(transactions.length / perPage)}
        onPageChange={setPage}
        totalEntries={transactions.length}
        perPage={perPage}
      />
    </div>
  );
};

export default RecentTransactionsTable;

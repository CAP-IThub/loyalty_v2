import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import Pagination from "../../components/Pagination";
import { saveAs } from "file-saver";

const dummyData = [
  {
    id: 84,
    painter: "oludayo Ajala",
    amount: 75250,
    claims: 752,
    invoice: "INV0000013",
    center: "Bauch Inc",
    address: "4516 Wolf Str",
    rep: "Emmanuel Oleru",
    date: "2023-06-28",
  },
  {
    id: 83,
    painter: "oludayo Ajala",
    amount: 75250,
    claims: 752,
    invoice: "INV0000012",
    center: "Bauch Inc",
    address: "4516 Wolf Str",
    rep: "Emmanuel Oleru",
    date: "2023-06-28",
  },
  {
    id: 82,
    painter: "oludayo Ajala",
    amount: 752500,
    claims: 7525,
    invoice: "INV0000009",
    center: "Bauch Inc",
    address: "4516 Wolf Str",
    rep: "Emmanuel Oleru",
    date: "2023-06-28",
  },
  // Add more dummy rows as needed...
];

const ClaimedTransactions = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    const filteredData = dummyData.filter((item) =>
      item.painter.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFiltered(filteredData);
  }, [searchTerm]);

  const paginatedData = filtered.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  const downloadCSV = () => {
    const csvHeader = Object.keys(dummyData[0]).join(",");
    const csvRows = dummyData.map((row) => Object.values(row).join(","));
    const csvContent = [csvHeader, ...csvRows].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "awarded_transactions.csv");
  };

  return (
    <div className="py-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="md:text-xl font-semibold">All Claimed Transactions</h2>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-md">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
          <div className="relative w-full md:w-[300px]">
            <input
              type="text"
              placeholder="Search table"
              className="w-full border border-gray-300 rounded-full px-4 py-2 pl-10 text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="rows" className="text-sm text-gray-600">
              No. of Column
            </label>
            <select
              id="rows"
              className="border border-gray-300 px-3 py-2 rounded-full text-sm"
              value={perPage}
              onChange={(e) => setPerPage(Number(e.target.value))}
            >
              {[5, 10, 20, 50].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
            <button
              onClick={downloadCSV}
              className="bg-[#0B1C39] text-white rounded-lg px-4 py-2 text-sm hover:opacity-90"
            >
              Download CSV
            </button>
          </div>
        </div>

        {/* Mobile Grid */}
        <div className="md:hidden space-y-4">
          {paginatedData.map((item) => (
            <div
              key={item.id}
              className="border rounded-lg p-4 shadow-sm space-y-1 text-sm"
            >
              <p>
                <strong>ID:</strong> {item.id}
              </p>
              <p>
                <strong>Painter:</strong> {item.painter}
              </p>
              <p>
                <strong>Amount:</strong> {item.amount}
              </p>
              <p>
                <strong>Claims:</strong> {item.claims}
              </p>
              <p>
                <strong>Invoice:</strong> {item.invoice}
              </p>
              <p>
                <strong>Center:</strong> {item.center}
              </p>
              <p>
                <strong>Address:</strong> {item.address}
              </p>
              <p>
                <strong>Rep:</strong> {item.rep}
              </p>
              <p>
                <strong>Date:</strong> {item.date}
              </p>
            </div>
          ))}
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-sm border-t">
            <thead className="bg-[#F1F5F9] text-gray-800 font-semibold">
              <tr>
                <th className="py-3 px-4 text-left">ID</th>
                <th className="py-3 px-4 text-left">Painter</th>
                <th className="py-3 px-4 text-left">Amount</th>
                <th className="py-3 px-4 text-left">Claims</th>
                <th className="py-3 px-4 text-left">Invoice No.</th>
                <th className="py-3 px-4 text-left">Center</th>
                <th className="py-3 px-4 text-left">Address</th>
                <th className="py-3 px-4 text-left">Rep</th>
                <th className="py-3 px-4 text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((item, index) => (
                <tr
                  key={item.id}
                  className={index % 2 === 1 ? "bg-gray-100" : ""}
                >
                  <td className="py-2 px-4">{item.id}</td>
                  <td className="py-2 px-4">{item.painter}</td>
                  <td className="py-2 px-4">{item.amount}</td>
                  <td className="py-2 px-4">{item.claims}</td>
                  <td className="py-2 px-4">{item.invoice}</td>
                  <td className="py-2 px-4">{item.center}</td>
                  <td className="py-2 px-4">{item.address}</td>
                  <td className="py-2 px-4">{item.rep}</td>
                  <td className="py-2 px-4">{item.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(filtered.length / perPage)}
          onPageChange={setCurrentPage}
          totalEntries={filtered.length}
          perPage={perPage}
        />
      </div>
    </div>
  );
};

export default ClaimedTransactions;

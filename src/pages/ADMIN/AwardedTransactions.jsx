import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import axios from "../../utils/axiosInstance";
import Pagination from "../../components/Pagination";
import { saveAs } from "file-saver";
import { ClipLoader } from "react-spinners";

const AwardedTransactions = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const formatName = (name) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/transactions");
      const formatted = res.data.data.map((item) => ({
        id: item.id,
        painter: formatName(
          `${item.customerFirstName} ${item.customerLastName}`
        ),
        amount: item.amount,
        claims: item.points,
        invoice: item.invoiceNum.trim(),
        center: item.shop,
        address: item.address.split(" ").slice(0, 20).join(" ") + "...",
        rep: formatName(`${item.customerFirstName} ${item.customerLastName}`),
        date: new Date(item.transactionTime).toLocaleDateString(),
      }));
      setData(formatted);
    } catch (err) {
      console.error("Failed to fetch awarded transactions", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const filtered = data.filter((item) =>
    item.painter.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedData = filtered.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  const downloadCSV = () => {
    const csvHeader = Object.keys(data[0] || {}).join(",");
    const csvRows = data.map((row) => Object.values(row).join(","));
    const csvContent = [csvHeader, ...csvRows].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "awarded_transactions.csv");
  };

  return (
    <div className="py-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="md:text-xl font-semibold">All Awarded Transactions</h2>
      </div>

      {loading ? (
        <div className="flex justify-center py-8">
          <ClipLoader size={30} color="#0B1C39" />
        </div>
      ) : (
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
                No. of Rows
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

          {/* Mobile View */}
          <div className="md:hidden space-y-4">
            {paginatedData.map((item) => (
              <div
                key={item.id}
                className="border rounded-lg p-4 shadow-sm space-y-1 text-sm"
              >
                {Object.entries(item).map(([key, val]) => (
                  <p key={key}>
                    <strong className="capitalize">{key}:</strong> {val}
                  </p>
                ))}
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
                    {Object.values(item).map((val, i) => (
                      <td key={i} className="py-2 px-4">
                        {val}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(filtered.length / perPage)}
            onPageChange={setCurrentPage}
            totalEntries={filtered.length}
            perPage={perPage}
          />
        </div>
      )}
    </div>
  );
};

export default AwardedTransactions;

import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { FiDownloadCloud } from "react-icons/fi";
import axios from "../../utils/axiosInstance";
import Pagination from "../../components/Pagination";
import { saveAs } from "file-saver";
import { ClipLoader } from "react-spinners";
import { Link } from "react-router-dom";
import { MdOutlineArrowBackIos } from "react-icons/md";

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

  const formatNumber = (value, isCurrency = false) => {
    const formatted = Number(value).toLocaleString();
    return isCurrency ? `₦${formatted}` : formatted;
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
        amount: formatNumber(item.amount, true),
        claims: formatNumber(item.points),
        invoice: item.invoiceNum.trim(),
        center: item.shop,
        address: item.address.split(" ").slice(0, 3).join(" ") + "...",
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
    <div className="py-6 px-2">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
        <div>
          <div className="inline-flex gap-1 items-center">
            <Link to="/admin">
              <span className="text-xs text-gray-500 cursor-pointer hover:underline">
                Dashboard
              </span>
            </Link>
            <MdOutlineArrowBackIos className="text-xs text-gray-500 mt-1" />
          </div>
          <h2 className="md:text-lg font-semibold">All Awarded Transactions</h2>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-4 w-full md:w-auto">
          <div className="relative w-full md:w-[450px]">
            <input
              type="text"
              placeholder="Search table...."
              className="w-full border border-gray-300 rounded-md px-4 py-2 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-[#FC7B00]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
          <select
            id="rows"
            className="border border-gray-300 px-3 py-2 rounded-md text-sm focus:outline-none"
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
            className="flex items-center gap-2 bg-[#FC7B00] text-white rounded-md px-4 py-2 text-sm hover:opacity-90"
          >
            <FiDownloadCloud size={16} />
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-8">
          <ClipLoader size={30} color="#0B1C39" />
        </div>
      ) : (
        <div>
          <div className="border border-gray-200 hidden md:block overflow-x-auto">
            <table className="w-full text-sm whitespace-nowrap">
              <thead className="bg-gray-100 text-gray-600 text-xs uppercase tracking-wide">
                <tr>
                  <th className="text-left px-3 py-4 border-b">Painter</th>
                  <th className="text-left px-3 py-4 border-b">Invoice No.</th>
                  <th className="text-left px-3 py-4 border-b">Amount</th>
                  <th className="text-left px-3 py-4 border-b">Claims</th>
                  <th className="text-left px-3 py-4 border-b">Center</th>
                  <th className="text-left px-3 py-4 border-b">Address</th>
                  <th className="text-left px-3 py-4 border-b">Rep</th>
                  <th className="text-left px-3 py-4 border-b">Date</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((item) => (
                  <tr
                    key={item.id}
                    className="bg-white border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="px-3 py-4">{item.painter}</td>
                    <td className="px-3 py-4">
                      {item.invoice.trim().toUpperCase()}
                    </td>
                    <td className="px-3 py-4">{item.amount}</td>
                    <td className="px-3 py-4">{item.claims}</td>
                    <td className="px-3 py-4">{item.center}</td>
                    <td className="px-3 py-4">{item.address}</td>
                    <td className="px-3 py-4">{item.rep}</td>
                    <td className="px-3 py-4">{item.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Grid View */}
          <div className="md:hidden grid grid-cols-1 gap-4">
            {paginatedData.map((item) => (
              <div
                key={item.id}
                className="bg-white shadow-2xl rounded-xl px-4 py-6 space-y-3 text-sm text-[#0B1C39]"
              >
                <div className="flex justify-between items-center">
                  <span className="text-base font-semibold">
                    {item.painter}
                  </span>
                  <span className="text-xs bg-[#FC7B00] text-white px-2 py-2 rounded-full">
                    {item.invoice}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs text-gray-500 py-2">
                      Amount
                      <br />
                      <span className="font-semibold text-black">
                        {item.amount}
                      </span>
                    </p>
                    <p className="text-xs text-gray-500 py-2">
                      Claims
                      <br />
                      <span className="font-semibold text-black">
                        {item.claims}
                      </span>
                    </p>
                    <p className="text-xs text-gray-500 py-2">
                      Center
                      <br />
                      <span className="font-semibold text-black">
                        {item.center}
                      </span>
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500 py-2">
                      Address
                      <br />
                      <span className="font-semibold text-black">
                        {item.address}
                      </span>
                    </p>
                    <p className="text-xs text-gray-500 py-2">
                      Rep
                      <br />
                      <span className="font-semibold text-black">
                        {item.rep}
                      </span>
                    </p>
                    <p className="text-xs text-gray-500 py-2">
                      Date
                      <br />
                      <span className="font-semibold text-black">
                        {item.date}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
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

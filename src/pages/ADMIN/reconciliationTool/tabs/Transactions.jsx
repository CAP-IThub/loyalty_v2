import React, { useEffect, useState, Fragment } from "react";
import axios from "../../../../utils/axiosInstance";
import { FaSearch, FaEye } from "react-icons/fa";
import { ClipLoader } from "react-spinners";
import Pagination from "../../../../components/Pagination";
import { MdFilterList } from "react-icons/md";

const Transactions = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [totalEntries, setTotalEntries] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState("default");
  const [sortOrder, setSortOrder] = useState("default");
  const [filters, setFilters] = useState({
    type: "",
    centerType: "",
    startDate: "",
    endDate: "",
  });

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      let params = {
        search: searchTerm.trim(),
        per_page: perPage,
        page: currentPage,
      };

      if (filters.type) params.type = filters.type;
      if (filters.centerType) params.centerType = filters.centerType;
      if (filters.startDate) params.start_date = filters.startDate;
      if (filters.endDate) params.end_date = filters.endDate;
      if (sortBy !== "default") params.sort_by = sortBy;
      if (sortOrder !== "default") params.sort_order = sortOrder;

      const res = await axios.get("/transactions", { params });
    //   console.log("Fetched transactions:", res.data); 

      const formatted = res.data.data.data.map((t, index) => ({
        id: t.transaction_id,
        serial: t.serial_num || index + 1,
        amount: t.amount,
        points: t.points,
        invoiceNum: t.invoiceNum.trim(),
        customerName: `${
          t.customerFirstName[0].toUpperCase() +
          t.customerFirstName.slice(1).toLowerCase()
        } ${
          t.customerLastName[0].toUpperCase() +
          t.customerLastName.slice(1).toLowerCase()
        }`,
        center: t.center,
        centerAddress: t.center_address,
        repName: `${t.repFirstName} ${t.repsLastName}`,
        date: (t.transactionTime || "").split(" ")[0] || "—",
        time: (t.transactionTime || "").split(" ")[1] || "—",
        customerPhone: t.customerPhone,
        customerEmail: t.customerEmail,
        centerType: t.centerType,
      }));
//   console.log("Formatted transactions:", formatted); 

      setTransactions(formatted);
      setTotalEntries(res.data.data.total || res.data.data.totalEntries || 0);
    } catch (err) {
      console.error("Failed to fetch transactions", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [searchTerm, currentPage, perPage]);

  useEffect(() => {
    setCurrentPage(1);
    fetchTransactions();
  }, [sortBy, sortOrder]);

  const paginated = transactions;

  return (
    <div className="pb-6 px-2">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-2 gap-4">
        <h2 className="md:text-lg font-semibold">Transactions</h2>
      </div>

      <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
        <div className="flex gap-3 items-center">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 text-sm"
          >
            <option value="default">Sort by: Default</option>
            <option value="transactionTime">Date</option>
            <option value="customerFirstName">Customer Firstname</option>
            <option value="customerLastName">Customer Lastname</option>
            <option value="centerType">Center Type</option>
          </select>

          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 text-sm"
          >
            <option value="default">Order: Default</option>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>

        <div className="flex gap-2 items-center">
          <select
            value={perPage}
            onChange={(e) => setPerPage(Number(e.target.value))}
            className="border border-gray-300 px-3 py-2 rounded-md text-sm"
          >
            {[5, 10, 20, 50].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
          <div className="relative w-full md:w-[300px]">
            <input
              type="text"
              placeholder="Search table..."
              className="w-full border border-gray-300 rounded-md px-4 py-2 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-[#FC7B00]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className="absolute left-3 top-3 text-xs" />
          </div>
        </div>
      </div>

      {/* Filter Section */}
      <div className="border border-gray-200 rounded-md p-4 mb-4">
        <div className="flex items-center gap-2 mb-4">
          <div>
            <MdFilterList className="text-blue-500 font-bold text-xl" />
          </div>
          <div className="text-sm font-bold">Filter Data</div>
        </div>
        <div className="flex flex-wrap items-end gap-4">
          {/* Start Date */}
          <div>
            <label className="block text-sm mb-1">Start Date</label>
            <input
              type="date"
              className="border border-gray-300 rounded-md px-3 py-2 text-sm w-[13.9rem]"
              value={filters.startDate}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, startDate: e.target.value }))
              }
            />
          </div>

          {/* End Date */}
          <div>
            <label className="block text-sm mb-1">End Date</label>
            <input
              type="date"
              max={new Date().toISOString().split("T")[0]}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm w-[13.9rem]"
              value={filters.endDate}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, endDate: e.target.value }))
              }
            />
          </div>

          <div>
            <select
              className="border border-gray-300 rounded-md px-3 py-2 text-sm w-[13.9rem]"
              value={filters.centerType}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, centerType: e.target.value }))
              }
            >
              <option value="">All Centers</option>
              <option value="dulux">Dulux</option>
              <option value="standex">Standex</option>
              <option value="combo">Combo</option>
            </select>
          </div>

          <div>
            <select
              className="border border-gray-300 rounded-md px-3 py-2 text-sm w-[13.9rem]"
              value={filters.type}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, type: e.target.value }))
              }
            >
              <option value="">Type</option>
              <option value="purchase">Purchase</option>
              <option value="referral">Referral</option>
            </select>
          </div>
        </div>

        <div className="flex items-center gap-4 mt-4">
          <div>
            <button
              className="bg-[#FC7B00] hover:bg-orange-600 text-white text-sm font-medium px-4 py-2 rounded-md"
              onClick={() => {
                setCurrentPage(1);
                fetchTransactions();
              }}
            >
              Apply Filters
            </button>
          </div>

          <div>
            <button
              className="bg-gray-200 hover:bg-gray-300 text-sm font-medium px-4 py-2 rounded-md"
              onClick={() => {
                setFilters({
                  type: "",
                  centerType: "",
                  startDate: "",
                  endDate: "",
                });
                setCurrentPage(1);
                fetchTransactions();
              }}
            >
              Reset Filters
            </button>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-10">
          <ClipLoader size={30} color="#0B1C39" />
        </div>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto border border-gray-200 rounded-xl">
            <table className="w-full text-sm">
              <thead className="bg-gray-100 text-gray-600 text-xs uppercase tracking-wide">
                <tr>
                  <th className="text-left px-3 py-4 border-b">S/N</th>
                  <th className="text-left px-3 py-4 border-b">Invoice</th>
                  <th className="text-left px-3 py-4 border-b">Customer</th>
                  <th className="text-left px-3 py-4 border-b">Center</th>
                  <th className="text-left px-3 py-4 border-b">Center Type</th>
                  <th className="text-left px-3 py-4 border-b">
                    Representative
                  </th>
                  {/* <th className="text-left px-3 py-4 border-b">Type</th> */}
                  <th className="text-left px-3 py-4 border-b">Amount</th>
                  <th className="text-left px-3 py-4 border-b">Points</th>
                  <th className="text-left px-3 py-4 border-b">Date</th>
                  <th className="text-left px-3 py-4 border-b">Time</th>
                </tr>
              </thead>
              <tbody>
                {paginated.map((t) => (
                  <tr
                    key={t.id}
                    className="bg-white border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="px-3 py-4">{t.serial}</td>
                    <td className="px-3 py-4">{t.invoiceNum.toUpperCase()}</td>
                    <td className="px-3 py-4">{t.customerName}</td>
                    <td className="px-3 py-4">{t.center}</td>
                    <td className="px-3 py-4 capitalize">
                      {t.centerType || "—"}
                    </td>
                    <td className="px-3 py-4">{t.repName}</td>
                    {/* <td className="px-3 py-4">{t.type || "—"}</td> */}
                    <td className="px-3 py-4">₦{t.amount.toLocaleString()}</td>
                    <td className="px-3 py-4">{t.points.toLocaleString()}</td>
                    <td className="px-3 py-4">{t.date}</td>
                    <td className="px-3 py-4">{t.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile View */}
          <div className="md:hidden space-y-4">
            {paginated.map((t) => (
              <div
                key={t.id}
                className="border border-gray-200 rounded-lg p-4 shadow-md bg-white"
              >
                <p className="font-semibold">{t.customerName}</p>
                <p className="text-sm text-gray-600 uppercase">
                  {t.invoiceNum}
                </p>
                <p className="text-sm">Center: {t.center}</p>
                <p className="text-sm">Center Type: {t.centerType}</p>
                <p className="text-sm">Amount: ₦{t.amount.toLocaleString()}</p>
                <p className="text-sm">Points: {t.points}</p>
                <p className="text-sm">Date: {t.date}</p>
              </div>
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(totalEntries / perPage)}
            onPageChange={setCurrentPage}
            totalEntries={totalEntries}
            perPage={perPage}
          />
        </>
      )}
    </div>
  );
};

export default Transactions;

import React, { useEffect, useState } from "react";
import axios from "../../../../utils/axiosInstance";
import { FaSearch } from "react-icons/fa";
import { ClipLoader } from "react-spinners";
import Pagination from "../../../../components/Pagination";
import { MdFilterList } from "react-icons/md";

const Claims = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [totalEntries, setTotalEntries] = useState(0);
  const [claims, setClaims] = useState([]);
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState("default");
  const [sortOrder, setSortOrder] = useState("default");
  const [filters, setFilters] = useState({
    mode: "",
    centerType: "",
    startDate: "",
    endDate: "",
  });

  const fetchClaims = async () => {
    try {
      setLoading(true);
      let params = {
        search: searchTerm.trim(),
        per_page: perPage,
        page: currentPage,
      };

      if (filters.mode) params.mode = filters.mode;
      if (filters.centerType) params.centerType = filters.centerType;
      if (filters.startDate) params.start_date = filters.startDate;
      if (filters.endDate) params.end_date = filters.endDate;
      if (sortBy !== "default") params.sort_by = sortBy;
      if (sortOrder !== "default") params.sort_order = sortOrder;

      const res = await axios.get("/withdrawals", { params });

      const formatted = res.data.data.data.map((c, index) => ({
        id: c.id,
        serial: c.serial_num || index + 1,
        invoiceNum: c.invoiceNum?.trim() || "",
        customerName: `${c.customerFirstName?.[0]?.toUpperCase() || ""}${
          c.customerFirstName?.slice(1).toLowerCase() || ""
        } ${c.customerLastName?.[0]?.toUpperCase() || ""}${
          c.customerLastName?.slice(1).toLowerCase() || ""
        }`,
        shop: c.shop,
        address: c.address,
        repName: `${c.repFirstName || ""} ${c.repsLastName || ""}`,
        pointsClaimed:
          typeof c.pointsClaimed === "number"
            ? c.pointsClaimed.toLocaleString()
            : "0",
        date: (c.withdrawal_at || "").split(" ")[0] || "—",
        time: (c.withdrawal_at || "").split(" ")[1] || "—",
      }));

      setClaims(formatted);
      setTotalEntries(res.data.data.total || res.data.data.totalEntries || 0);
    } catch (err) {
      console.error("Failed to fetch claims", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClaims();
  }, [searchTerm, currentPage, perPage]);

  useEffect(() => {
    setCurrentPage(1);
    fetchClaims();
  }, [sortBy, sortOrder]);

  return (
    <div className="pb-6 px-2">
      <h2 className="md:text-lg font-semibold mb-4">Claims</h2>

      {/* Top Controls */}
      <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
        <div className="flex gap-3 items-center">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 text-sm"
          >
            <option value="default">Sort by: Default</option>
            <option value="withdrawal_at">Date</option>
            <option value="customerFirstName">Customer First Name</option>
            <option value="shop">Center</option>
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

      {/* Filters */}
      <div className="border border-gray-200 rounded-md p-4 mb-4">
        <div className="flex items-center gap-2 mb-4">
          <MdFilterList className="text-blue-500 font-bold text-xl" />
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

          {/* Center Type */}
          <div>
            <select
              className="border border-gray-300 rounded-md px-3 py-2 text-sm w-[13.9rem]"
              value={filters.centerType}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, centerType: e.target.value }))
              }
            >
              <option value="">All Center Types</option>
              <option value="dulux">Dulux</option>
              <option value="standtex">Standtex</option>
              <option value="combo">Combo</option>
            </select>
          </div>

          {/* Mode */}
          <div>
            <select
              className="border border-gray-300 rounded-md px-3 py-2 text-sm w-[13.9rem]"
              value={filters.mode}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, mode: e.target.value }))
              }
            >
              <option value="">Mode</option>
              <option value="center">Center</option>
              <option value="painter">Painter</option>
              <option value="head_office">Head Office</option>
            </select>
          </div>

          {/* Buttons */}
          <div>
            <button
              className="bg-[#FC7B00] hover:bg-orange-600 text-white text-sm font-medium px-4 py-2 rounded-md"
              onClick={() => {
                setCurrentPage(1);
                fetchClaims();
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
                  mode: "",
                  centerType: "",
                  startDate: "",
                  endDate: "",
                });
                setCurrentPage(1);
                fetchClaims();
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
                  <th className="text-left px-3 py-4 border-b">
                    Representative
                  </th>
                  <th className="text-left px-3 py-4 border-b">Points</th>
                  <th className="text-left px-3 py-4 border-b">Date</th>
                  <th className="text-left px-3 py-4 border-b">Time</th>
                </tr>
              </thead>
              <tbody>
                {claims.map((c) => (
                  <tr
                    key={c.id}
                    className="bg-white border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="px-3 py-4">{c.serial}</td>
                    <td className="px-3 py-4">{c.invoiceNum.toUpperCase()}</td>
                    <td className="px-3 py-4">{c.customerName}</td>
                    <td className="px-3 py-4">{c.shop}</td>
                    <td className="px-3 py-4">{c.repName}</td>
                    <td className="px-3 py-4">{c.pointsClaimed}</td>
                    <td className="px-3 py-4">{c.date}</td>
                    <td className="px-3 py-4">{c.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile View */}
          <div className="md:hidden space-y-4">
            {claims.map((c) => (
              <div
                key={c.id}
                className="border border-gray-200 rounded-lg p-4 shadow-md bg-white"
              >
                <p className="font-semibold">{c.customerName}</p>
                <p className="text-sm text-gray-600 uppercase">
                  {c.invoiceNum}
                </p>
                <p className="text-sm">Center: {c.shop}</p>
                <p className="text-sm">Points: {c.pointsClaimed}</p>
                <p className="text-sm">Date: {c.date}</p>
                <p className="text-sm">Time: {c.time}</p>
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

export default Claims;

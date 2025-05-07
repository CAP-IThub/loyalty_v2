import React, { useEffect, useState } from "react";
import axios from "../../utils/axiosInstance";
import { ClipLoader } from "react-spinners";
import { FaSearch } from "react-icons/fa";
import Pagination from "../../components/Pagination";
import { Link } from "react-router-dom";
import { MdOutlineArrowBackIos } from "react-icons/md";
import { MdFilterList } from "react-icons/md";

const AuditTrail = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [sortOrder, setSortOrder] = useState("default");
  const [filters, setFilters] = useState({
    event: "",
    user_type: "",
    start_date: "",
    end_date: "",
  });

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const params = {
        per_page: perPage,
        page: currentPage,
      };

      if (filters.event) params.event = filters.event;
      if (filters.user_type) params.user_type = filters.user_type;
      if (filters.start_date) params.start_date = filters.start_date;
      if (filters.end_date) params.end_date = filters.end_date;

      if (sortOrder !== "default") {
        params.sort_by = "created_at";
        params.sort_order = sortOrder;
      }

      const res = await axios.get("/v2/auditlogs", { params });

      const formatted = res.data.data.data.map((log, index) => ({
        serial: log.serial_num || index + 1,
        user: log.action?.split(" ")[0] || "Unknown",
        event: log.event,
        eventColor:
          log.event === "created"
            ? "text-green-600"
            : log.event === "updated"
            ? "text-yellow-600"
            : log.event === "deleted"
            ? "text-red-600"
            : "",
        description: log.new_values?.description || "—",
        user_type: log.user_type,
        ip_address: log.ip_address,
        browser: log.user_agent.split(" ")[0].slice(0, 11),
        date: new Date(log.updated_at).toISOString().split("T")[0],
        time: new Date(log.updated_at).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        firstName: log.new_values?.firstName || "—",
        lastName: log.new_values?.lastName || "—",
        phoneNum: log.new_values?.phoneNum || "—",
        address: log.new_values?.address || "—",
        gender: log.new_values?.gender || "—",
        email: log.new_values?.email || "—",
        referral_code: log.new_values?.referral_code || "—",
        image: log.new_values?.image || "—",
        nv_created_at: log.new_values?.created_at || "—",
        nv_updated_at: log.new_values?.updated_at || "—",
        new_id: log.new_values?.id || "—",
      }));

      setLogs(formatted);
    } catch (err) {
      console.error("Failed to fetch audit logs", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, [sortOrder, currentPage, perPage]);

  const paginated = logs;

  return (
    <div className="pb-6 px-2 space-y-3">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center my-6 gap-4">
        <div>
          <div className="inline-flex gap-1 items-center">
            <Link to="/admin">
              <span className="text-xs text-gray-500 cursor-pointer hover:underline">
                Dashboard
              </span>
            </Link>
            <MdOutlineArrowBackIos className="text-xs text-gray-500 mt-1" />
          </div>
          <h2 className="md:text-lg font-semibold">Audit Trail</h2>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 w-full md:w-auto">
          <select
            value={sortOrder}
            onChange={(e) => {
              setSortOrder(e.target.value);
              setCurrentPage(1);
            }}
            className="border border-gray-300 px-3 py-2 rounded-md text-sm"
          >
            <option value="default">Sort by: Default</option>
            <option value="asc">Sort by Date ↑</option>
            <option value="desc">Sort by Date ↓</option>
          </select>
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
        </div>
      </div>

      {/* Filter Section */}
      <div className="border border-gray-200 rounded-md p-4 mb-4">
        <div className="flex items-center gap-2 mb-4">
          <MdFilterList className="text-blue-500 font-bold text-xl" />
          <div className="text-sm font-bold">Filter Logs</div>
        </div>
        <div className="flex flex-wrap items-end gap-4">
          {/* Event Filter */}
          <div>
            <label className="block text-sm mb-1">Event</label>
            <select
              value={filters.event}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, event: e.target.value }))
              }
              className="border border-gray-300 px-3 py-2 rounded-md text-sm w-[13.9rem]"
            >
              <option value="">All</option>
              <option value="created">Created</option>
              <option value="updated">Updated</option>
              <option value="deleted">Deleted</option>
            </select>
          </div>

          {/* User Type Filter */}
          <div>
            <label className="block text-sm mb-1">User Type</label>
            <select
              value={filters.user_type}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, user_type: e.target.value }))
              }
              className="border border-gray-300 px-3 py-2 rounded-md text-sm w-[13.9rem]"
            >
              <option value="">All</option>
              <option value="admin">Admin</option>
              <option value="rep">Rep</option>
              <option value="painter">Painter</option>
            </select>
          </div>

          {/* Date Range */}
          <div>
            <label className="block text-sm mb-1">Start Date</label>
            <input
              type="date"
              value={filters.start_date}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, start_date: e.target.value }))
              }
              className="border border-gray-300 px-3 py-2 rounded-md text-sm w-[13.9rem]"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">End Date</label>
            <input
              type="date"
              value={filters.end_date}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, end_date: e.target.value }))
              }
              className="border border-gray-300 px-3 py-2 rounded-md text-sm w-[13.9rem]"
            />
          </div>

          {/* Filter Buttons */}
          <div className="flex gap-2 mt-4">
            <button
              onClick={() => {
                setCurrentPage(1);
                fetchLogs();
              }}
              className="bg-[#FC7B00] hover:bg-orange-600 text-white text-sm font-medium px-4 py-2 rounded-md"
            >
              Apply Filters
            </button>
            <button
              onClick={() => {
                setFilters({
                  event: "",
                  user_type: "",
                  start_date: "",
                  end_date: "",
                });
                setCurrentPage(1);
                fetchLogs();
              }}
              className="bg-gray-200 hover:bg-gray-300 text-sm font-medium px-4 py-2 rounded-md"
            >
              Reset Filters
            </button>
          </div>
        </div>
      </div>

      {/* Data Table */}
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
                  <th className="text-left px-3 py-4 border-b">User</th>
                  <th className="text-left px-3 py-4 border-b">Event</th>
                  <th className="text-left px-3 py-4 border-b">Phone No</th>
                  <th className="text-left px-3 py-4 border-b">Email</th>
                  <th className="text-left px-3 py-4 border-b">User Type</th>
                  <th className="text-left px-3 py-4 border-b">IP Address</th>
                  <th className="text-left px-3 py-4 border-b">Browser</th>
                  {/* <th className="text-left px-3 py-4 border-b">OS</th> */}
                  <th className="text-left px-3 py-4 border-b">Date</th>
                  <th className="text-left px-3 py-4 border-b">Time</th>
                </tr>
              </thead>
              <tbody>
                {paginated.map((log) => (
                  <tr
                    key={log.serial}
                    className="bg-white border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="px-3 py-4">{log.serial}</td>
                    <td className="px-3 py-4">{log.firstName}</td>
                    <td
                      className={`px-3 py-4 capitalize font-semibold ${log.eventColor}`}
                    >
                      {log.event}
                    </td>
                    <td className="px-3 py-4">{log.phoneNum}</td>
                    <td className="px-3 py-4">{log.email || "-"}</td>
                    <td className="px-3 py-4 capitalize">{log.user_type}</td>
                    <td className="px-3 py-4">{log.ip_address}</td>
                    <td className="px-3 py-4">{log.browser}</td>
                    {/* <td className="px-3 py-4">{log.os}</td> */}
                    <td className="px-3 py-4">{log.date}</td>
                    <td className="px-3 py-4">{log.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile View */}
          <div className="md:hidden space-y-4">
            {paginated.map((log) => (
              <div
                key={log.serial}
                className="border border-gray-200 rounded-lg p-4 shadow-md bg-white"
              >
                <p className="font-semibold">{log.user}</p>
                <p className={`text-sm font-medium ${log.eventColor}`}>
                  Event: {log.event}
                </p>
                <p className="text-sm">Description: {log.description}</p>
                <p className="text-sm">Type: {log.user_type}</p>
                <p className="text-sm">IP: {log.ip_address}</p>
                <p className="text-sm">Browser: {log.browser}</p>
                <p className="text-sm">OS: {log.os}</p>
                <p className="text-sm">Date: {log.date}</p>
                <p className="text-sm">Time: {log.time}</p>
              </div>
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(logs.length / perPage)}
            onPageChange={setCurrentPage}
            totalEntries={logs.length}
            perPage={perPage}
          />
        </>
      )}
    </div>
  );
};

export default AuditTrail;

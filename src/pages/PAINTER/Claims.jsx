import React, { useEffect, useState } from "react";
import axios from "../../utils/axiosInstance";
import { FaSearch } from "react-icons/fa";
import { ClipLoader } from "react-spinners";
import Pagination from "../../components/Pagination";
import { MdFilterList } from "react-icons/md";

const Claims = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [totalEntries, setTotalEntries] = useState(0);
  const [claims, setClaims] = useState([]);
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({ startDate: "", endDate: "" });

  const fetchClaims = async () => {
    try {
      setLoading(true);
      let params = {
        // search: searchTerm.trim(),
        per_page: perPage,
        page: currentPage,
      };

      if (filters.startDate) params.start_date = filters.startDate;
      if (filters.endDate) params.end_date = filters.endDate;

      const res = await axios.get("/v2/customer/claim/history", { params });
      const formatted = res.data.data.data.map((c, index) => {
        const [date, time] = c.created_at.split(" ");
        return {
          id: c.id,
          serial: index + 1,
          pointsRedeemed: c.pointsRedeemed,
          mode: c.mode,
          date,
          time,
        };
      });

      setClaims(formatted);
      setTotalEntries(res.data.data.total);
    } catch (err) {
      console.error("Failed to fetch claims", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClaims();
  }, [searchTerm, currentPage, perPage]);

  const paginated = claims;

  return (
    <div className="pb-6 px-2 pt-4">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-2 gap-4">
        <h2 className="md:text-xl font-semibold">Claims</h2>
        <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
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
            {/* <div className="relative w-full md:w-[300px]">
              <input
                type="text"
                placeholder="Search table..."
                className="w-full border border-gray-300 rounded-md px-4 py-2 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-[#FC7B00]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FaSearch className="absolute left-3 top-3 text-xs" />
            </div> */}
          </div>
        </div>
      </div>

      {/* Filter Section */}
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
              className="border border-gray-300 rounded-md px-3 py-2 text-sm w-[13.9rem]"
              value={filters.endDate}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, endDate: e.target.value }))
              }
            />
          </div>
          <div className="flex items-center gap-4 mt-4">
            <button
              className="bg-[#FC7B00] hover:bg-orange-600 text-white text-sm font-medium px-4 py-2 rounded-md"
              onClick={() => {
                setCurrentPage(1);
                fetchClaims();
              }}
            >
              Apply Filters
            </button>

            <button
              className="bg-gray-200 hover:bg-gray-300 text-sm font-medium px-4 py-2 rounded-md"
              onClick={() => {
                setFilters({ startDate: "", endDate: "" });
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
      ) : paginated.length === 0 ? (
        <div className="text-center text-gray-500 py-10">
          No claim records found.
        </div>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto border border-gray-200 rounded-xl">
            <table className="w-full text-sm">
              <thead className="bg-gray-100 text-gray-600 text-xs uppercase tracking-wide">
                <tr>
                  <th className="text-left px-3 py-4 border-b">S/N</th>
                  <th className="text-left px-3 py-4 border-b">
                    Points Redeemed
                  </th>
                  <th className="text-left px-3 py-4 border-b">Mode</th>
                  <th className="text-left px-3 py-4 border-b">Date</th>
                  <th className="text-left px-3 py-4 border-b">Time</th>
                </tr>
              </thead>
              <tbody>
                {paginated.map((c) => (
                  <tr
                    key={c.id}
                    className="bg-white border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="px-3 py-4">{c.serial}</td>
                    <td className="px-3 py-4">
                      {c.pointsRedeemed.toLocaleString()} pts
                    </td>
                    <td className="px-3 py-4 capitalize">{c.mode}</td>
                    <td className="px-3 py-4">{c.date}</td>
                    <td className="px-3 py-4">{c.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile View */}
          <div className="md:hidden space-y-4">
            {paginated.map((c) => (
              <div
                key={c.id}
                className="border border-gray-200 rounded-lg p-4 shadow-md bg-white"
              >
                <p className="font-semibold">
                  Points: {c.pointsRedeemed.toLocaleString()} pts
                </p>
                <p className="text-sm capitalize">Mode: {c.mode}</p>
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

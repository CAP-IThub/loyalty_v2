import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import axios from "../../utils/axiosInstance";
import Pagination from "../../components/Pagination";

const RecentActivityPage = () => {
  const [activities, setActivities] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [totalEntries, setTotalEntries] = useState(0);

  const fetchActivities = async () => {
    try {
      const res = await axios.get("/activity");
      const filtered = res.data.data.filter((item) =>
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setTotalEntries(filtered.length);
      const startIndex = (currentPage - 1) * perPage;
      const paginated = filtered.slice(startIndex, startIndex + perPage);
      setActivities(paginated);
    } catch (error) {
      console.error("Failed to fetch activities", error);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, [currentPage, perPage, searchTerm]);

  useEffect(() => {
    const totalPages = Math.ceil(totalEntries / perPage);
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1);
    }
  }, [totalEntries, perPage]);

  return (
    <div className="py-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="md:text-xl font-semibold">Recent Activites</h2>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-md">
        {/* Header controls */}
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
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
              {[10, 25, 50, 75, 100].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Table for desktop */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left text-sm border-t">
            <thead className="bg-[#eef4fa] text-gray-700 font-semibold">
              <tr>
                <th className="py-3 px-4">ID</th>
                <th className="py-3 px-4">Description</th>
                <th className="py-3 px-4">Time</th>
                <th className="py-3 px-4">Date</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity, index) => {
                const date = new Date(activity.created_at);
                const time = date.toLocaleTimeString();
                const dateString = date.toISOString().split("T")[0];
                return (
                  <tr
                    key={activity.id || index}
                    className={index % 2 === 1 ? "bg-gray-100" : ""}
                  >
                    <td className="py-3 px-4 font-medium text-gray-800">
                      {activity.id}
                    </td>
                    <td className="py-3 px-4 text-gray-700 max-w-[600px]">
                      {activity.description}
                    </td>
                    <td className="py-3 px-4 text-gray-600">{time}</td>
                    <td className="py-3 px-4 text-gray-600">{dateString}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Grid for mobile */}
        <div className="md:hidden space-y-4">
          {activities.map((activity, index) => {
            const date = new Date(activity.created_at);
            const time = date.toLocaleTimeString();
            const dateString = date.toISOString().split("T")[0];
            return (
              <div
                key={activity.id || index}
                className="border rounded-lg p-4 bg-gray-50 shadow-sm"
              >
                <p className="text-xs text-gray-500 mb-1">ID: {activity.id}</p>
                <p className="text-sm font-medium text-gray-700 mb-2">
                  {activity.description}
                </p>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>{time}</span>
                  <span>{dateString}</span>
                </div>
              </div>
            );
          })}
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(totalEntries / perPage)}
          onPageChange={setCurrentPage}
          totalEntries={totalEntries}
          perPage={perPage}
        />
      </div>
    </div>
  );
};

export default RecentActivityPage;

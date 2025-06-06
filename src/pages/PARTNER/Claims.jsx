import React, { useEffect, useState } from "react";
import axios from "../../utils/axiosInstance";
import { FaSearch } from "react-icons/fa";
import { RiUploadCloud2Fill } from "react-icons/ri";
import Pagination from "../../components/Pagination";
import { ClipLoader } from "react-spinners";

const ClaimsReport = () => {
  const [claims, setClaims] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchClaims = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/claim/report");
      const allClaims = res.data.data.claim;
      const filtered = allClaims.filter(
        (item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.lastName.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setTotal(filtered.length);
      const startIndex = (currentPage - 1) * perPage;
      const paginated = filtered.slice(startIndex, startIndex + perPage);
      setClaims(paginated);
    } catch (err) {
      console.error("Failed to fetch claims data", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClaims();
  }, [searchTerm, currentPage, perPage]);

  const handleExport = async () => {
    try {
      const res = await axios.get("/claim/report");
      const claims = res.data.data.claim;

      const csvHeader = ["Center", "Customer Name", "Redeemed Points", "Date"];
      const rows = claims.map((claim) => [
        claim.name,
        `${claim.firstName} ${claim.lastName}`,
        claim.claimedPoints,
        claim.created_at,
      ]);

      const csvContent =
        "data:text/csv;charset=utf-8," +
        [csvHeader, ...rows].map((e) => e.join(",")).join("\n");

      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "claims_export.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Export failed:", error);
      alert("Failed to export data. Please try again.");
    }
  };

  return (
    <div className="py-6 px-2 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <h2 className="text-lg font-semibold">Claims Reports</h2>
        <button
          className="flex items-center gap-2 bg-[#FC7B00] text-white rounded-md px-4 py-2 text-sm hover:opacity-90"
          onClick={handleExport}
        >
          <RiUploadCloud2Fill size={16} />
        </button>
      </div>

      <div className="flex flex-wrap justify-between items-center gap-4">
        <select
          className="border border-gray-300 px-3 py-2 rounded-md text-sm focus:outline-none"
          value={perPage}
          onChange={(e) => {
            setPerPage(Number(e.target.value));
            setCurrentPage(1);
          }}
        >
          {[5, 10, 20, 50].map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
        <div className="relative w-full md:w-[400px]">
          <input
            type="text"
            placeholder="Search by center or name..."
            className="w-full border border-gray-300 rounded-md px-4 py-2 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-[#FC7B00]"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-10">
          <ClipLoader size={30} color="#0B1C39" />
        </div>
      ) : claims.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">No data found.</p>
      ) : (
        <>
          <div className="hidden md:block overflow-x-auto border border-gray-200 rounded-xl">
            <table className="w-full text-sm whitespace-nowrap">
              <thead className="bg-gray-100 text-gray-600 text-xs uppercase tracking-wide">
                <tr>
                  <th className="text-left px-3 py-4 border-b">S/N</th>
                  <th className="text-left px-3 py-4 border-b">
                    Customer Name
                  </th>
                  <th className="text-left px-3 py-4 border-b">Center</th>
                  <th className="text-left px-3 py-4 border-b">
                    Redeemed Points
                  </th>
                  <th className="text-left px-3 py-4 border-b">Date</th>
                  <th className="text-left px-3 py-4 border-b">Time</th>
                </tr>
              </thead>
              <tbody>
                {claims.map((claim, index) => {
                  const [date, time] = claim.created_at.split(" ");
                  return (
                    <tr
                      key={claim.id}
                      className="bg-white border-b border-gray-100 hover:bg-gray-50"
                    >
                      <td className="px-3 py-4">
                        {(currentPage - 1) * perPage + index + 1}
                      </td>
                      <td className="px-3 py-4 capitalize">
                        {claim.firstName} {claim.lastName}
                      </td>
                      <td className="px-3 py-4 capitalize">{claim.name}</td>
                      <td className="px-3 py-4">{claim.claimedPoints}</td>
                      <td className="px-3 py-4">{date}</td>
                      <td className="px-3 py-4">{time}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="md:hidden space-y-4 mt-4">
            {claims.map((claim, index) => {
              const [date, time] = claim.created_at.split(" ");
              return (
                <div
                  key={claim.id}
                  className="border border-gray-200 rounded-lg p-4 shadow-md bg-white"
                >
                  <div className="mb-2 text-sm font-semibold text-gray-900">
                    #{(currentPage - 1) * perPage + index + 1}.{" "}
                    {claim.firstName} {claim.lastName}
                  </div>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>
                      <span className="font-medium">Center:</span> {claim.name}
                    </p>
                    <p>
                      <span className="font-medium">Redeemed Points:</span>{" "}
                      {claim.claimedPoints}
                    </p>
                    <p>
                      <span className="font-medium">Date:</span> {date}
                    </p>
                    <p>
                      <span className="font-medium">Time:</span> {time}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(total / perPage)}
            onPageChange={setCurrentPage}
            totalEntries={total}
            perPage={perPage}
          />
        </>
      )}
    </div>
  );
};

export default ClaimsReport;

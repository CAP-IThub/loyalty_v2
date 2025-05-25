import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../utils/axiosInstance";
import Pagination from "../../components/Pagination";
import { useNavigate } from "react-router-dom";
import { MdChevronLeft } from "react-icons/md";

const PainterProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [painter, setPainter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchPoints, setSearchPoints] = useState("");
  const [perPagePoints, setPerPagePoints] = useState(10);
  const [currentPagePoints, setCurrentPagePoints] = useState(1);

  const [searchClaims, setSearchClaims] = useState("");
  const [perPageClaims, setPerPageClaims] = useState(10);
  const [currentPageClaims, setCurrentPageClaims] = useState(1);

  useEffect(() => {
    const fetchPainter = async () => {
      try {
        const res = await axios.get(`/customer/${id}`);
        setPainter(res.data.data);
      } catch (err) {
        console.error("Failed to fetch painter profile", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPainter();
  }, [id]);

  const info = painter?.customerDetails;
  const claims = painter?.claimsHistory || [];
  const points = painter?.history || [];

  const filteredPoints = (painter?.history || []).filter((p) =>
    Object.values(p)
      .join(" ")
      .toLowerCase()
      .includes(searchPoints.toLowerCase())
  );

  const filteredClaims = (painter?.claimsHistory || []).filter((c) =>
    Object.values(c)
      .join(" ")
      .toLowerCase()
      .includes(searchClaims.toLowerCase())
  );

  const paginatedPoints = filteredPoints.slice(
    (currentPagePoints - 1) * perPagePoints,
    currentPagePoints * perPagePoints
  );

  const paginatedClaims = filteredClaims.slice(
    (currentPageClaims - 1) * perPageClaims,
    currentPageClaims * perPageClaims
  );

  return (
    <div className="py-6 px-2 space-y-6">
      <div>
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-2 gap-4">
          <div>
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => navigate(-1)}
            >
              <span className="text-xs text-gray-500">Back</span>
              <MdChevronLeft />
            </div>
            <h2 className="md:text-lg font-semibold">Painters Details</h2>
          </div>
        </div>
      </div>
      <div className="">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <h2 className="text-xl font-bold mb-4">
              {info?.firstName} {info?.lastName} ({info?.status})
            </h2>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="mt-6 font-semibold md:text-lg">
                  Points History
                </h3>
              </div>
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                <input
                  type="text"
                  placeholder="Search points..."
                  value={searchPoints}
                  onChange={(e) => {
                    setSearchPoints(e.target.value);
                    setCurrentPagePoints(1);
                  }}
                  className="border border-gray-300 rounded-md px-4 py-2 text-sm mb-2 md:mb-0 md:mr-4"
                />
                <select
                  value={perPagePoints}
                  onChange={(e) => {
                    setPerPagePoints(Number(e.target.value));
                    setCurrentPagePoints(1);
                  }}
                  className="border border-gray-300 rounded-md px-4 py-2 text-sm"
                >
                  {[10, 20, 30].map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="hidden md:block overflow-x-auto border border-gray-200 rounded-xl mt-2">
              <table className="w-full text-sm whitespace-nowrap">
                <thead className="bg-gray-100 text-gray-600 text-xs uppercase tracking-wide">
                  <tr>
                    <th className="text-left px-3 py-4 border-b">S/N</th>
                    <th className="text-left px-3 py-4 border-b">Invoice</th>
                    <th className="text-left px-3 py-4 border-b">Amount</th>
                    <th className="text-left px-3 py-4 border-b">Points</th>
                    <th className="text-left px-3 py-4 border-b">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedPoints.length === 0 ? (
                    <tr>
                      <td
                        colSpan={5}
                        className="text-center py-6 text-gray-500"
                      >
                        No points history found.
                      </td>
                    </tr>
                  ) : (
                    paginatedPoints.map((row, index) => (
                      <tr
                        key={row.id}
                        className="bg-white border-b border-gray-100 hover:bg-gray-50"
                      >
                        <td className="px-3 py-4">{index + 1}</td>
                        <td className="px-3 py-4">{row.invoice_id}</td>
                        <td className="px-3 py-4">
                          ₦{Math.round(row.amount).toLocaleString()}
                        </td>
                        <td className="px-3 py-4">{row.awardedPoints}</td>
                        <td className="px-3 py-4">
                          {new Date(row.created_at).toLocaleDateString()}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
              <Pagination
                currentPage={currentPagePoints}
                totalPages={Math.ceil(filteredPoints.length / perPagePoints)}
                onPageChange={(page) => setCurrentPagePoints(page)}
                totalEntries={filteredPoints.length}
                perPage={perPagePoints}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="mt-6 font-semibold md:text-lg">
                  Claims History
                </h3>
              </div>
              <div className="flex flex-col md:flex-row md:items-center justify-between mt-10 mb-4">
                <input
                  type="text"
                  placeholder="Search claims..."
                  value={searchClaims}
                  onChange={(e) => {
                    setSearchClaims(e.target.value);
                    setCurrentPageClaims(1);
                  }}
                  className="border border-gray-300 rounded-md px-4 py-2 text-sm mb-2 md:mb-0 md:mr-4"
                />
                <select
                  value={perPageClaims}
                  onChange={(e) => {
                    setPerPageClaims(Number(e.target.value));
                    setCurrentPageClaims(1);
                  }}
                  className="border border-gray-300 rounded-md px-4 py-2 text-sm"
                >
                  {[10, 20, 30].map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="hidden md:block overflow-x-auto border border-gray-200 rounded-xl mt-2">
              <table className="w-full text-sm whitespace-nowrap">
                <thead className="bg-gray-100 text-gray-600 text-xs uppercase tracking-wide">
                  <tr>
                    <th className="text-left px-3 py-4 border-b">S/N</th>
                    <th className="text-left px-3 py-4 border-b">Ref</th>
                    <th className="text-left px-3 py-4 border-b">Points</th>
                    <th className="text-left px-3 py-4 border-b">Status</th>
                    <th className="text-left px-3 py-4 border-b">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedClaims.length === 0 ? (
                    <tr>
                      <td
                        colSpan={5}
                        className="text-center py-6 text-gray-500"
                      >
                        No claims history found.
                      </td>
                    </tr>
                  ) : (
                    paginatedClaims.map((row, index) => (
                      <tr
                        key={row.id}
                        className="bg-white border-b border-gray-100 hover:bg-gray-50"
                      >
                        <td className="px-3 py-4">{index + 1}</td>
                        <td className="px-3 py-4">{row.ref || "—"}</td>
                        <td className="px-3 py-4">{row.pointsRedeemed}</td>
                        <td className="px-3 py-4">{row.status}</td>
                        <td className="px-3 py-4">
                          {new Date(row.created_at).toLocaleDateString()}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
              <Pagination
                currentPage={currentPageClaims}
                totalPages={Math.ceil(filteredClaims.length / perPageClaims)}
                onPageChange={(page) => setCurrentPageClaims(page)}
                totalEntries={filteredClaims.length}
                perPage={perPageClaims}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PainterProfile;

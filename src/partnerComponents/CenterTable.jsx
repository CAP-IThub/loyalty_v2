import React, { useEffect, useState, Fragment } from "react";
import axios from "../utils/axiosInstance";
import { FaEye } from "react-icons/fa";
import { HiDotsVertical } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";

const CenterTable = () => {
  const [centers, setCenters] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchCenters = async () => {
    try {
      const res = await axios.get("/dashboard/partner/center");
      setCenters(res.data.data.centers || []);
    } catch (err) {
      console.error("Error fetching centers:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCenters();
  }, []);

  return (
    <>
      {loading ? (
        <div className="flex justify-center py-10">
          <ClipLoader size={30} color="#0B1C39" />
        </div>
      ) : centers.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">No centers found.</p>
      ) : (
        <div className="overflow-x-auto border border-gray-200 rounded-xl">
          <table className="w-full text-sm whitespace-nowrap">
            <thead className="bg-gray-100 text-gray-600 text-xs uppercase tracking-wide">
              <tr>
                <th className="text-left px-3 py-4 border-b">S/N</th>
                <th className="text-left px-3 py-4 border-b">Shop Code</th>
                <th className="text-left px-3 py-4 border-b">Name</th>
                <th className="text-left px-3 py-4 border-b">Address</th>
                <th className="text-left px-3 py-4 border-b">Choice</th>
                <th className="text-left px-3 py-4 border-b">Action</th>
              </tr>
            </thead>
            <tbody>
              {centers.map((center, index) => (
                <tr
                  key={center.id}
                  className="bg-white border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
                  onClick={() => navigate(`/partner/center/${center.id}`)}
                >
                  <td className="px-3 py-4">{index + 1}</td>
                  <td className="px-3 py-4">{center.shopCode}</td>
                  <td className="px-3 py-4">{center.name}</td>
                  <td className="px-3 py-4">
                    {(() => {
                      try {
                        const isJson = center.address?.trim().startsWith("{");
                        const raw = isJson
                          ? JSON.parse(center.address)?.street || "-"
                          : center.address;

                        if (!raw) return "-";

                        const words = raw.toLowerCase().trim().split(" ");
                        const firstWord =
                          words[0].charAt(0).toUpperCase() + words[0].slice(1);
                        const rest = words.slice(1).join(" ");

                        return `${firstWord} ${rest}`;
                      } catch {
                        return "-";
                      }
                    })()}
                  </td>
                  <td className="px-3 py-4">-</td>
                  <td className="px-3 py-4">
                    <FaEye
                      className="text-blue-600"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/partner/center/${center.id}`);
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default CenterTable;

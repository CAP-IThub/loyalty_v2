import React from "react";
import { BiTransfer } from "react-icons/bi";
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";

const TableComponent = ({ invoices, history, loading }) => {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      <div className="bg-white rounded-lg shadow p-5">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-semibold text-gray-700">Recent Invoices</h4>
          <Link
            to="/invoices"
            className="text-sm text-[#FC7B00] hover:underline"
          >
            View More
          </Link>
        </div>
        {loading ? (
          <div className="text-center py-10">
            <ClipLoader size={20} color="#FC7B00" />
          </div>
        ) : (
          <div className="space-y-4">
            {invoices.map((item, idx) => (
              <div
                key={idx}
                className="flex justify-between items-center p-3 bg-gray-50 rounded-md"
              >
                <div>
                  <p className="text-sm font-medium">Invoice #{item.number}</p>
                  <p className="text-xs text-gray-500">{item.date}</p>
                </div>
                <div className="text-sm font-semibold">
                  ₦{item.amount.toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg shadow p-5">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-semibold text-gray-700">Points History</h4>
          <div className="text-sm text-[#FC7B00] hover:underline">
            View More
          </div>
        </div>
        {loading ? (
          <div className="text-center py-10">
            <ClipLoader size={20} color="#FC7B00" />
          </div>
        ) : (
          <div className="space-y-4">
            {history.map((item, idx) => (
              <div
                key={idx}
                className="flex justify-between items-center p-3 bg-gray-50 rounded-md"
              >
                <div>
                  <p
                    className={`text-sm font-semibold flex items-center gap-1 ${
                      item.entryType === "claim"
                        ? "text-red-600"
                        : "text-green-600"
                    }`}
                  >
                    {item.entryType === "claim" ? "-" : "+"}
                    {item.points.toLocaleString()} pts
                  </p>
                  <p className="text-xs text-gray-500 capitalize">
                    {item.entryType === "claim" ? "Claimed" : "Awarded"}
                  </p>
                </div>
                <p className="text-xs text-gray-400">
                  {new Date(item.created_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TableComponent;

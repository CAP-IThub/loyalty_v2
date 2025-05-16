import React from "react";
import { FaStar } from "react-icons/fa";
import { LuAward } from "react-icons/lu";
import { ClipLoader } from "react-spinners";

const StatCard = ({
  currentPoints,
  lifetimePoints,
  tierName,
  nextTierName,
  pointsToNextTier,
  progress,
  loading,
  joinedDate,
}) => {
  const formattedDate = joinedDate
    ? new Date(joinedDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
      })
    : null;

    console.log(joinedDate);
    
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
      <div className="bg-white rounded-lg shadow-mad px-4 py-5 border border-gray-300">
        <div className="flex items-center justify-between">
          <h4 className="text-sm text-gray-500 font-semibold">
            Current Points
          </h4>
          <FaStar className="text-yellow-400" />
        </div>
        {loading ? (
          <ClipLoader size={20} color="#FC7B00" className="mt-2" />
        ) : (
          <>
            <p className="text-lg font-bold tracking-wide">
              {currentPoints.toLocaleString()}
            </p>
            <p className="text-sm text-[#868FA0]">
              Worth ₦{(currentPoints * 10).toLocaleString()}
            </p>
          </>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-mad px-4 py-5 border border-gray-300">
        <div className="flex items-center justify-between">
          <h4 className="text-sm text-gray-500 font-semibold">
            Lifetime Points
          </h4>
          <LuAward className="text-blue-500" />
        </div>
        {loading ? (
          <ClipLoader size={20} color="#FC7B00" className="mt-2" />
        ) : (
          <>
            <p className="text-lg font-bold tracking-wide">
              {lifetimePoints.toLocaleString()}
            </p>
            <p className="text-sm text-[#868FA0]">Since {formattedDate}</p>
          </>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-mad px-4 py-5 border border-gray-300">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-sm text-gray-500 font-semibold">Current Tier</h4>
          <span className="bg-yellow-100 text-yellow-700 text-xs px-3 py-1 rounded-full font-semibold">
            {tierName}
          </span>
        </div>
        {loading ? (
          <ClipLoader size={20} color="#FC7B00" className="mt-2" />
        ) : (
          <>
            <div className="w-full h-2 bg-gray-200 rounded-full my-2">
              <div
                className="bg-yellow-400 h-full rounded-full"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-sm text-[#868FA0] mt-1">
              {nextTierName
                ? `${pointsToNextTier.toLocaleString()} points to ${nextTierName}`
                : "You are at the highest tier"}
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default StatCard;

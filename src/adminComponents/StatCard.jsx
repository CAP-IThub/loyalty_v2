import React from "react";

const StatCard = ({ icon, title, value, growth, growthType }) => {
  return (
    <div className="bg-white rounded-lg shadow-mad px-4 py-3 md:w-[15.5rem] 2xl:w-[18rem]">
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <div>
            <img src={icon} alt="icon" />
          </div>
          <div>
            <h4 className="text-sm text-[#868FA0]">{title}</h4>
          </div>
        </div>
        <div>
          <p className="text-lg font-bold pl-3 tracking-wide">{value}</p>
          {/* <p
            className={`text-xs flex items-center gap-1 pl-3 ${
              growthType === "up" ? "text-green-600" : "text-red-500"
            }`}
          >
            {growthType === "up" ? "↑" : "↓"} {growth}%{" "}
            <span className="text-[#868FA0]">vs last week</span>
          </p> */}
        </div>
      </div>
    </div>
  );
};

export default StatCard;

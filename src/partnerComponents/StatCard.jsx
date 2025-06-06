import React from "react";
import { ClipLoader } from "react-spinners"; 

const StatCard = ({ icon, title, value, growth, growthType }) => {
  return (
    <div className="bg-white rounded-lg shadow-md px-4 py-3 md:w-[15.5rem] 2xl:w-[18rem]">
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <div>
            <img src={icon} alt="icon" />
          </div>
          <div>
            <h4 className="text-sm text-[#868FA0]">{title}</h4>
          </div>
        </div>
        <p className="text-lg font-bold pl-3 tracking-wide min-h-[1.5rem]">
          {typeof value !== "number" && !value ? (
            <ClipLoader size={20} color="#0B1C39" />
          ) : (
            value
          )}
        </p>
      </div>
    </div>
  );
};

export default StatCard;

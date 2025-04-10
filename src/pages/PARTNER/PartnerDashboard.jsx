import React, { useEffect, useState } from "react";
import capLogo from "../../assets/images/cap-logo.png";
import logo from "../../assets/images/sideLogo.png";
import { FaBell } from "react-icons/fa";

const PartnerDashboard = () => {
  return (
    <div className="space-y-4 md:space-y-6">
      {/* Topbar */}
      <div className="hidden md:flex justify-between items-center bg-white p-4 w-full rounded-xl shadow-md sticky top-0 z-20">
        <img src={capLogo} alt="/" width={120} />

        <div className="flex items-center space-x-6">
          <div className="flex items-center gap-2">
            <FaBell className="text-xl text-[#0B0F28]" />
            <span className="text-xs">Notifications</span>
          </div>

          <div className="flex items-center space-x-2">
            <img src={logo} className="rounded-full" alt="profile" width={40} />
            <span className="text-xs">Hi, Gleb</span>
          </div>
        </div>
      </div>

      {/* Dashboard Overview */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <h2 className="md:text-xl font-semibold">Partner Overview</h2>
        </div>
      </div>
    </div>
  );
};

export default PartnerDashboard;

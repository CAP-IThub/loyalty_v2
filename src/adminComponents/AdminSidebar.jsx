import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaCog,
  FaPowerOff,
  FaTimes,
  FaBell,
  FaShippingFast,
  FaFileInvoice,
} from "react-icons/fa";
import {
  MdDashboard,
  MdOutlineInventory,
  MdOutlineShoppingCart,
} from "react-icons/md";
import logo from "../assets/images/sideLogo.png";
import navLogo from "../assets/images/nav-logo.png";
import { HiMenuAlt2 } from "react-icons/hi";
import { LuUser, LuUserPen, LuUsers } from "react-icons/lu";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { TbReportAnalytics } from "react-icons/tb";

const AdminSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => setIsOpen(false);

  const navItem =
    "flex items-center space-x-3 py-2 px-4 rounded text-sm text-[#D0CFFC] hover:bg-[#2D3654] hover:text-[#fff] hover:font-normal";
  const activeStyle = "bg-white text-[#FC7B00]";

  const handleNavClick = () => {
    handleClose();
  };

  return (
    <>
      {/* Mobile Navbar */}
      <div className="md:hidden fixed w-full h-16 shadow-md z-[997] bg-[#fff] flex items-center justify-between px-4 py-3">
        <button onClick={() => setIsOpen(true)} className="text-white">
          <HiMenuAlt2 size={20} color={"#000"} />
        </button>
        <img src={navLogo} alt="Logo" />
        <FaBell color={"#000"} size={18} />
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-[998] md:hidden"
          onClick={handleClose}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`bg-[#1A1A27] text-white fixed top-0 left-0 bottom-0 z-[999] transition-transform duration-300 ease-in-out flex flex-col
        ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 w-2/3 md:w-[14.5rem] md:relative`}
      >
        <style>
          {`
            .scrollbar-hide::-webkit-scrollbar {
              display: none;
            }
            .scrollbar-hide {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
          `}
        </style>

        {/* Top Section - Logo */}
        <div className="flex items-center md:justify-center justify-between px-4 py-4 border-b border-gray-700 bg-[#202127] sticky top-0 z-10">
          <div className="flex items-center">
            <img
              src={logo}
              alt="Logo"
              className="w-[50px] h-[50px] rounded-full"
            />
            <div className="ml-3">
              <p className="font-bold leading-tight text-sm">Samuel Adeleke</p>
              <span className="text-xs text-[#D0CFFC]">Admin Account</span>
            </div>
          </div>
          <button className="md:hidden text-white" onClick={handleClose}>
            <FaTimes />
          </button>
        </div>

        {/* Scrollable Middle Section */}
        <div className="overflow-y-auto scrollbar-hide">
          <div className="flex flex-col items-center justify-center">
            <nav className="mt-2 flex flex-col gap-2">
              <NavLink
                to="/admin"
                onClick={handleNavClick}
                className={({ isActive }) =>
                  `${navItem} ${isActive ? activeStyle : ""}`
                }
              >
                <MdDashboard /> <span>Dashboard</span>
              </NavLink>
              <NavLink
                to="/orders"
                onClick={handleNavClick}
                className={({ isActive }) =>
                  `${navItem} ${isActive ? activeStyle : ""}`
                }
              >
                <MdOutlineShoppingCart /> <span>Order Management</span>
              </NavLink>
              <NavLink
                to="/partners"
                onClick={handleNavClick}
                className={({ isActive }) =>
                  `${navItem} ${isActive ? activeStyle : ""}`
                }
              >
                <LuUsers /> <span>Partners</span>
              </NavLink>
              <NavLink
                to="/painters"
                onClick={handleNavClick}
                className={({ isActive }) =>
                  `${navItem} ${isActive ? activeStyle : ""}`
                }
              >
                <LuUserPen /> <span>Reps</span>
              </NavLink>
              <NavLink
                to="/painters"
                onClick={handleNavClick}
                className={({ isActive }) =>
                  `${navItem} ${isActive ? activeStyle : ""}`
                }
              >
                <LuUser /> <span>Painters</span>
              </NavLink>
              <NavLink
                to="/painters"
                onClick={handleNavClick}
                className={({ isActive }) =>
                  `${navItem} ${isActive ? activeStyle : ""}`
                }
              >
                <HiOutlineBuildingOffice2 /> <span>Centers</span>
              </NavLink>
              <NavLink
                to="/painters"
                onClick={handleNavClick}
                className={({ isActive }) =>
                  `${navItem} ${isActive ? activeStyle : ""}`
                }
              >
                <MdOutlineInventory /> <span>Inventory</span>
              </NavLink>
              <NavLink
                to="/reps"
                onClick={handleNavClick}
                className={({ isActive }) =>
                  `${navItem} ${isActive ? activeStyle : ""}`
                }
              >
                <FaShippingFast /> <span>Shipments</span>
              </NavLink>
              <NavLink
                to="/centers"
                onClick={handleNavClick}
                className={({ isActive }) =>
                  `${navItem} ${isActive ? activeStyle : ""}`
                }
              >
                <FaFileInvoice /> <span>Transaction History</span>
              </NavLink>
              <NavLink
                to="/inventory"
                onClick={handleNavClick}
                className={({ isActive }) =>
                  `${navItem} ${isActive ? activeStyle : ""}`
                }
              >
                <TbReportAnalytics /> <span>Reports</span>
              </NavLink>
            </nav>
          </div>
        </div>

        {/* Bottom Section - Fixed Settings/Logout */}
        <div className="border-t border-gray-700 px-4 py-1">
          <div className="flex flex-col gap-2 px-2">
            <NavLink
              to="/settings"
              onClick={handleNavClick}
              className={({ isActive }) =>
                `${navItem} ${isActive ? activeStyle : ""}`
              }
            >
              <FaCog /> <span>Settings</span>
            </NavLink>

            <NavLink
              to="/logout"
              onClick={handleNavClick}
              className="flex items-center space-x-3 py-2 px-4 text-sm text-[#FF3C3C]"
            >
              <FaPowerOff /> <span>Logout</span>
            </NavLink>
          </div>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;

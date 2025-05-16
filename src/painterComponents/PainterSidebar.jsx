import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaCog,
  FaPowerOff,
  FaTimes,
  FaBell,
  FaShippingFast,
  FaFileInvoice,
  FaTools,
  FaGift,
  FaCreditCard,
} from "react-icons/fa";
import {
  MdDashboard,
  MdOutlineInventory,
  MdOutlineShoppingCart,
  MdRedeem,
} from "react-icons/md";
import logo from "../assets/images/sideLogo.png";
import navLogo from "../assets/images/nav-logo.png";
import { HiMenuAlt2 } from "react-icons/hi";
import { LuBaggageClaim, LuUser, LuUserPen, LuUsers } from "react-icons/lu";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { TbReportAnalytics } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../slices/authSlice";
import { LiaFileInvoiceSolid } from "react-icons/lia";
import { GiWantedReward } from "react-icons/gi";
import { BiSupport } from "react-icons/bi";

const PainterSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showHistoryDropdown, setShowHistoryDropdown] = useState(false);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClose = () => setIsOpen(false);

  const navItem =
    "flex items-center space-x-3 py-2 px-4 rounded text-sm text-[#D0CFFC] hover:bg-[#2D3654] hover:text-[#fff] hover:font-normal";
  const activeStyle = "bg-white text-[#FC7B00]";

  const handleNavClick = () => {
    handleClose();
  };

  const handleHistoryClick = () => {
    setShowHistoryDropdown((prev) => !prev);
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
    ${isOpen ? "translate-x-0" : "-translate-x-full"}
    md:translate-x-0 w-2/3 md:w-[14.5rem] md:relative`}
      >
        {/* Top Section - Logo */}
        <div className="flex items-center md:justify-center justify-between px-4 py-4 border-b border-gray-700 bg-[#202127] sticky top-0 z-10">
          <div className="flex items-center">
            <img
              src={logo}
              alt="Logo"
              className="w-[50px] h-[50px] rounded-full"
            />
            <div className="ml-3">
              <p className="font-bold leading-tight text-sm">
                {auth.first_name} {auth.last_name}
              </p>
              <span className="text-xs text-[#D0CFFC]">Painter</span>
            </div>
          </div>
          <button className="md:hidden text-white" onClick={handleClose}>
            <FaTimes />
          </button>
        </div>

        {/* Middle Section - Scrollable */}
        <div className="flex-1 overflow-y-auto scrollbar-hide">
          <div className="flex flex-col px-6 py-2">
            <nav className="mt-2 mb-9 flex flex-col gap-2">
              <NavLink
                to="/painter-dashboard"
                onClick={handleNavClick}
                className={({ isActive }) =>
                  `${navItem} ${isActive ? activeStyle : ""}`
                }
              >
                <MdDashboard /> <span>Dashboard</span>
              </NavLink>
              {/* <NavLink
                to="/invoices"
                onClick={handleNavClick}
                className={({ isActive }) =>
                  `${navItem} ${isActive ? activeStyle : ""}`
                }
              >
                <LiaFileInvoiceSolid /> <span>Invoices</span>
              </NavLink> */}
              <div className="relative">
                <button
                  onClick={handleHistoryClick}
                  className={`${navItem} w-full flex justify-between items-center`}
                >
                  <span className="flex items-center space-x-3">
                    <FaGift /> <span>History</span>
                  </span>
                  <span className="text-lg">
                    {showHistoryDropdown ? "−" : "+"}
                  </span>
                </button>
                {showHistoryDropdown && (
                  <div className="ml-6 mt-1 flex flex-col gap-1">
                    <NavLink
                      to="/purchases"
                      onClick={handleNavClick}
                      className={({ isActive }) =>
                        `${navItem} ${isActive ? activeStyle : ""}`
                      }
                    >
                      <FaGift />
                      <span className="ml-6">Awards</span>
                    </NavLink>
                    <NavLink
                      to="/claims"
                      onClick={handleNavClick}
                      className={({ isActive }) =>
                        `${navItem} ${isActive ? activeStyle : ""}`
                      }
                    >
                      <LuBaggageClaim />
                      <span className="ml-6">Claims</span>
                    </NavLink>
                  </div>
                )}
              </div>

              <NavLink
                to="/bank-details"
                onClick={handleNavClick}
                className={({ isActive }) =>
                  `${navItem} ${isActive ? activeStyle : ""}`
                }
              >
                <FaCreditCard /> <span>Bank Details</span>
              </NavLink>
              <NavLink
                to="/support"
                onClick={handleNavClick}
                className={({ isActive }) =>
                  `${navItem} ${isActive ? activeStyle : ""}`
                }
              >
                <BiSupport /> <span>Support</span>
              </NavLink>
            </nav>
          </div>
        </div>

        {/* Bottom Section - Fixed */}
        <div className="px-4 py-2 border-t border-gray-700">
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
            <button
              onClick={() => {
                dispatch(logoutUser());
                navigate("/");
              }}
              className="flex items-center space-x-3 py-2 px-4 text-sm text-[#FF3C3C] w-full text-left"
            >
              <FaPowerOff /> <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default PainterSidebar;

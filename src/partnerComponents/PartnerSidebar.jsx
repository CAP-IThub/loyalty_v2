import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaCog, FaPowerOff, FaTimes, FaBell, FaAward } from "react-icons/fa";
import { MdDashboard, MdOutlineRedeem } from "react-icons/md";
import logo from "../assets/images/sideLogo.png";
import navLogo from "../assets/images/nav-logo.png";
import { HiMenuAlt2, HiOutlineDocumentReport } from "react-icons/hi";
import userIcon from "../assets/images/userIcon.png";
import axios from "../utils/axiosInstance";
import ProfileModal from "../partnerComponents/modals/ProfileModal";
import { baseUrl } from "../utils/baseUrl";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../slices/authSlice";
import { GrCatalog } from "react-icons/gr";
import { GoStack } from "react-icons/go";
import { RiFolderHistoryFill } from "react-icons/ri";

const PartnerSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [partnerInfo, setPartnerInfo] = useState(null);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPartner = async () => {
      try {
        const res = await axios.get(`${baseUrl}/auth/partner`);
        // console.log(res.data.data.partner);
        const user = res.data.data.partner[0];
        const mappedUser = {
          id: user.id,
          first_name: user.firstName,
          last_name: user.lastName,
          email: user.email,
          phone: user.phoneNumber,
        };
        setPartnerInfo(mappedUser);
      } catch (err) {
        console.error("Failed to fetch Partner info:", err);
      }
    };

    fetchPartner();
  }, []);

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
        <div>
          <button onClick={() => setIsOpen(true)} className="text-white">
            <HiMenuAlt2 size={20} color={"#000"} />
          </button>
        </div>
        <div>
          <img src={navLogo} alt="Logo" />
        </div>
        <div className="flex items-center gap-2">
          {/* <FaBell color={"#000"} size={18} /> */}
          <div onClick={() => setShowModal(true)}>
            <img
              src={userIcon}
              className="rounded-full bg-[#E87C2E]"
              alt="profile"
              width={30}
            />
          </div>
        </div>
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
        <div className="flex items-center md:justify-center justify-between px-4 py-3 border-b border-gray-700 bg-[#202127] sticky top-0 z-10">
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
              <span className="text-xs text-[#D0CFFC]">Partner</span>
            </div>
          </div>
          <button className="md:hidden text-white" onClick={handleClose}>
            <FaTimes />
          </button>
        </div>

        {/* Scrollable Middle Section */}
        <div className="flex-1 overflow-y-auto scrollbar-hide mt-4">
          <div className="flex flex-col px-6">
            <nav className="mt-2 flex flex-col gap-4">
              <NavLink
                to="/Partner"
                onClick={handleNavClick}
                className={({ isActive }) =>
                  `${navItem} ${isActive ? activeStyle : ""}`
                }
              >
                <MdDashboard /> <span>Dashboard</span>
              </NavLink>
              <NavLink
                to="/award-points"
                onClick={handleNavClick}
                className={({ isActive }) =>
                  `${navItem} ${isActive ? activeStyle : ""}`
                }
              >
                <GrCatalog /> <span>Catalogue</span>
              </NavLink>
              <NavLink
                to="/redeem-points"
                onClick={handleNavClick}
                className={({ isActive }) =>
                  `${navItem} ${isActive ? activeStyle : ""}`
                }
              >
                <GoStack /> <span>Orders</span>
              </NavLink>
              <NavLink
                to="/redeem-points"
                onClick={handleNavClick}
                className={({ isActive }) =>
                  `${navItem} ${isActive ? activeStyle : ""}`
                }
              >
                <RiFolderHistoryFill /> <span>History</span>
              </NavLink>
              <NavLink
                to="/redeem-points"
                onClick={handleNavClick}
                className={({ isActive }) =>
                  `${navItem} ${isActive ? activeStyle : ""}`
                }
              >
                <HiOutlineDocumentReport /> <span>Report</span>
              </NavLink>
            </nav>
          </div>
        </div>

        {/* Bottom Section - Fixed Settings/Logout */}
        <div className="px-4 py-3 border-t border-gray-700">
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
              onClick={() => {
                dispatch(logoutUser());
                navigate("/");
              }}
              className="flex items-center space-x-3 py-2 px-4 text-sm text-[#FF3C3C]"
            >
              <FaPowerOff /> <span>Logout</span>
            </NavLink>
          </div>
        </div>
      </aside>

      <ProfileModal
        isOpen={showModal}
        closeProfileModal={() => setShowModal(false)}
        partner={partnerInfo}
      />
    </>
  );
};

export default PartnerSidebar;

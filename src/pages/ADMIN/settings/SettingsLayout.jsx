import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";

const SettingsLayout = () => {
  const auth = useSelector((state) => state.auth);
  console.log(auth);

  return (
    <div className="py-6 px-2 space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-800">Settings</h2>
        <p className="text-sm text-gray-500">Customize system configurations</p>
      </div>

      {/* <div className="bg-white shadow rounded-lg p-6"> */}

      {/* <div className="flex items-center gap-4 mb-6">
          <FaUserCircle className="text-5xl text-gray-500" />
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              {auth.first_name} {auth.last_name}
            </h3>
            <p className="text-sm text-gray-500">{auth.email}</p>
          </div>
        </div> */}

      <div>
        <div className="flex gap-6 border-b text-sm font-medium text-gray-600 mb-6">
          <NavLink
            to="."
            end
            className={({ isActive }) =>
              isActive
                ? "pb-2 border-b-2 border-orange-500 text-orange-600"
                : "pb-2 hover:text-orange-500"
            }
          >
            Loyalty Campaigns
          </NavLink>
          <NavLink
            to="loyalty-tier-levels"
            className={({ isActive }) =>
              isActive
                ? "pb-2 border-b-2 border-orange-500 text-orange-600"
                : "pb-2 hover:text-orange-500"
            }
          >
            Loyalty Tier levels
          </NavLink>
          <NavLink
            to="painter-category"
            className={({ isActive }) =>
              isActive
                ? "pb-2 border-b-2 border-orange-500 text-orange-600"
                : "pb-2 hover:text-orange-500"
            }
          >
            Painter category
          </NavLink>
        </div>

        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default SettingsLayout;

import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";

const ReconciliationToolLayout = () => {
  const auth = useSelector((state) => state.auth);
  console.log(auth);

  return (
    <div className="py-6 px-2 space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-800">
          Reconciliation Tool
        </h2>
        <p className="text-sm text-gray-500">Customize system configurations</p>
      </div>

      <div>
        <div className="flex gap-6 border-b text-sm font-medium text-gray-600 mb-3">
          <NavLink
            to="."
            end
            className={({ isActive }) =>
              isActive
                ? "pb-2 border-b-2 border-orange-500 text-orange-600"
                : "pb-2 hover:text-orange-500"
            }
          >
            Transactions
          </NavLink>
          <NavLink
            to="claims"
            className={({ isActive }) =>
              isActive
                ? "pb-2 border-b-2 border-orange-500 text-orange-600"
                : "pb-2 hover:text-orange-500"
            }
          >
            Claims
          </NavLink>
          <NavLink
            to="account"
            className={({ isActive }) =>
              isActive
                ? "pb-2 border-b-2 border-orange-500 text-orange-600"
                : "pb-2 hover:text-orange-500"
            }
          >
            Account
          </NavLink>
          <NavLink
            to="payouts"
            className={({ isActive }) =>
              isActive
                ? "pb-2 border-b-2 border-orange-500 text-orange-600"
                : "pb-2 hover:text-orange-500"
            }
          >
            Payout
          </NavLink>
        </div>

        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default ReconciliationToolLayout;

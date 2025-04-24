import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../utils/axiosInstance";

const truncateAddress = (address, wordLimit = 2) => {
  const words = address.split(" ");
  return words.length > wordLimit
    ? words.slice(0, wordLimit).join(" ") + "..."
    : address;
};

const capitalizeName = (first, last) => {
  return `${first?.charAt(0).toUpperCase() + first?.slice(1).toLowerCase()} ${
    last?.charAt(0).toUpperCase() + last?.slice(1).toLowerCase()
  }`;
};

const formatNumber = (val, isCurrency = false) => {
  const formatted = Number(val).toLocaleString();
  return isCurrency ? `₦${formatted}` : formatted;
};


const TransactionTable = ({ data, columns, title }) => {
  const getRoute = () => {
    if (title.toLowerCase().includes("awarded"))
      return "/admin/awarded-transactions";
    if (title.toLowerCase().includes("claimed"))
      return "/admin/claimed-transactions";
    return "/";
  };

  return (
    <div className="bg-white shadow-md rounded-xl p-4 w-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-[#0B0F28]">{title}</h3>
        <Link
          to={getRoute()}
          className="text-sm text-[#0B0F28] hover:underline"
        >
          View All
        </Link>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block">
        <table className="w-full text-sm text-left">
          <thead className="bg-[#f3f6fb] text-gray-600 font-semibold">
            <tr>
              {columns.map((col) => (
                <th key={col.accessor} className="py-3 px-4">
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => (
              <tr key={row.id} className={idx % 2 === 1 ? "bg-gray-100" : ""}>
                {columns.map((col) => (
                  <td key={col.accessor} className="py-2 px-4 text-gray-700">
                    {row[col.accessor]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Grid View */}
      <div className="md:hidden space-y-4">
        {data.map((row) => (
          <div key={row.id} className="bg-[#f9fafc] rounded-md p-3 shadow-sm">
            {columns.map((col) => (
              <div key={col.accessor} className="text-sm text-gray-700 mb-1">
                <span className="font-semibold text-gray-500">
                  {col.label}:{" "}
                </span>
                {row[col.accessor]}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

const TransactionsTable = () => {
  const [awarded, setAwarded] = useState([]);
  const [claimed, setClaimed] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [awardedRes, claimedRes] = await Promise.all([
          axios.get("/transactions"),
          axios.get("/withdrawals"),
        ]);

        const awardedData = awardedRes.data.data.slice(0, 5).map((item) => ({
          id: item.id,
          amount: formatNumber(item.amount, true), 
          point: formatNumber(item.points),
          painter: capitalizeName(
            item.customerFirstName,
            item.customerLastName
          ),
          shop: item.shop,
          address: truncateAddress(item.address),
        }));

        const claimedData = claimedRes.data.data.slice(0, 5).map((item) => ({
          id: item.id,
          point: formatNumber(item.pointsClaimed),
          painter: capitalizeName(
            item.customerFirstName,
            item.customerLastName
          ),
          shop: item.shop,
          address: truncateAddress(item.address),
        }));

        setAwarded(awardedData);
        setClaimed(claimedData);
      } catch (err) {
        console.error("Failed to fetch transaction data", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="pb-[2rem]">
      <div className="flex justify-between items-center">
        <h3 className="md:text-xl font-semibold">Transactions</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
        <TransactionTable
          title="Recent Awarded"
          data={awarded}
          columns={[
            { label: "ID", accessor: "id" },
            { label: "Amount", accessor: "amount" },
            { label: "Point", accessor: "point" },
            { label: "Painter", accessor: "painter" },
            { label: "Shop", accessor: "shop" },
            { label: "Address", accessor: "address" },
          ]}
        />
        <TransactionTable
          title="Recent Claimed"
          data={claimed}
          columns={[
            { label: "ID", accessor: "id" },
            { label: "Point", accessor: "point" },
            { label: "Painter", accessor: "painter" },
            { label: "Shop", accessor: "shop" },
            { label: "Address", accessor: "address" },
          ]}
        />
      </div>
    </div>
  );
};

export default TransactionsTable;

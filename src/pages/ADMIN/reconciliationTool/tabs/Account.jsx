import React, { useEffect, useState } from "react";
import axios from "../../../../utils/axiosInstance";
import { FaSearch } from "react-icons/fa";
import { ClipLoader } from "react-spinners";
import Pagination from "../../../../components/Pagination";
import { MdFilterList } from "react-icons/md";
import { RiResetLeftFill } from "react-icons/ri";
import ResetBalanceModal from "../../../../adminComponents/modals/reconciliationModal/ResetBalanceModal";
import toast from "react-hot-toast";

const Account = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [totalEntries, setTotalEntries] = useState(0);
  const [accounts, setAccounts] = useState([]);
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState("default");
  const [sortOrder, setSortOrder] = useState("default");
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
  });
  const [balanceFilter, setBalanceFilter] = useState({
    balanceOperator: "",
    balanceValue: "",
  });
  const [selectedIds, setSelectedIds] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [resetType, setResetType] = useState("all");
  const [singleResetId, setSingleResetId] = useState(null);
  const [resetLoading, setResetLoading] = useState(false);

  const fetchAccounts = async () => {
    try {
      setLoading(true);
      let params = {
        search: searchTerm.trim(),
        per_page: perPage,
        page: currentPage,
      };

      if (filters.startDate) params.start_date = filters.startDate;
      if (filters.endDate) params.end_date = filters.endDate;
      if (balanceFilter.balanceValue) {
        params.filter_field = "balance";
        params.filter_operator = balanceFilter.balanceOperator;
        params.filter_value = balanceFilter.balanceValue;
      }      
      if (sortBy !== "default") params.sort_by = sortBy;
      if (sortOrder !== "default") params.sort_order = sortOrder;

      const res = await axios.get("/v2/accounts", { params });

      const formatted = res.data.data.data.map((a, index) => ({
        id: a.account_id,
        serial: a.serial_num || index + 1,
        name: `${a.first_name?.trim()} ${a.last_name?.trim()}`,
        phone: a.phone,
        email: a.email || "—",
        balance:
          typeof a.balance === "number" ? a.balance.toLocaleString() : "0",
        lastPurchase: a.last_purchase || "—",
        date: a.created_at
      }));

      setAccounts(formatted);
      setTotalEntries(res.data.data.total || res.data.data.totalEntries || 0);
    } catch (err) {
      console.error("Failed to fetch accounts", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, [searchTerm, currentPage, perPage]);

  useEffect(() => {
    setCurrentPage(1);
    fetchAccounts();
  }, [sortBy, sortOrder]);

  const handleReset = async () => {
    try {
      setResetLoading(true);

      const payload =
        resetType === "single"
          ? { accountId: [singleResetId] }
          : resetType === "selected"
          ? { accountId: selectedIds }
          : {};

      const res = await axios.post("/v2/customer-balance/reset", payload);

      toast.success(res.data.message || "Balance reset successful");
      setIsModalOpen(false);
      setSelectedIds([]);
      fetchAccounts();
    } catch (err) {
      const errorMsg =
        err?.response?.data?.message || "Failed to reset balances";
      toast.error(errorMsg);
      console.error("Failed to reset balances", err);
    } finally {
      setResetLoading(false);
    }
  };

  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="pb-6 px-2">
      <h2 className="md:text-lg font-semibold mb-4">Accounts</h2>

      <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
        <div className="flex gap-3 items-center">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 text-sm"
          >
            <option value="default">Sort by: Default</option>
            <option value="firstName">First Name</option>
            <option value="lastName">Last Name</option>
          </select>

          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 text-sm"
          >
            <option value="default">Order: Default</option>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>

        <div className="flex gap-2 items-center">
          <select
            value={perPage}
            onChange={(e) => setPerPage(Number(e.target.value))}
            className="border border-gray-300 px-3 py-2 rounded-md text-sm"
          >
            {[5, 10, 20, 50].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>

          <div className="relative w-full md:w-[300px]">
            <input
              type="text"
              placeholder="Search table..."
              className="w-full border border-gray-300 rounded-md px-4 py-2 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-[#FC7B00]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className="absolute left-3 top-3 text-xs" />
          </div>
        </div>
      </div>

      <div className="border border-gray-200 rounded-md p-4 mb-4">
        <div className="flex items-center gap-2 mb-4">
          <MdFilterList className="text-blue-500 font-bold text-xl" />
          <div className="text-sm font-bold">Filter Data</div>
        </div>

        <div className="flex flex-wrap items-end gap-4">
          <div>
            <label className="block text-sm mb-1">Condition</label>
            <select
              value={balanceFilter.operator}
              onChange={(e) =>
                setBalanceFilter((prev) => ({
                  ...prev,
                  balanceOperator: e.target.value,
                }))
              }
              className="border border-gray-300 rounded-md px-3 py-2 text-sm w-[13.9rem]"
            >
              <option value="">Select</option>
              <option value="eq">Equal to</option>
              <option value="neq">Not equal to</option>
              <option value="lt">Less than</option>
              <option value="lte">Less than or equal to</option>
              <option value="gt">Greater than</option>
              <option value="gte">Greater than or equal to</option>
            </select>
          </div>

          <div>
            <label className="block text-sm mb-1">Balance Points</label>
            <select
              value={balanceFilter.value}
              onChange={(e) =>
                setBalanceFilter((prev) => ({
                  ...prev,
                  balanceValue: e.target.value,
                }))
              }
              className="border border-gray-300 rounded-md px-3 py-2 text-sm w-[13.9rem]"
            >
              <option value="">Select</option>
              <option value="0">0</option>
              <option value="10000">10,000</option>
              <option value="100000">100,000</option>
              <option value="500000">500,000</option>
              <option value="1000000">1,000,000</option>
            </select>
          </div>

          <div>
            <button
              className="bg-[#FC7B00] hover:bg-orange-600 text-white text-sm font-medium px-4 py-2 rounded-md"
              onClick={() => {
                setCurrentPage(1);
                fetchAccounts();
              }}
            >
              Apply Filters
            </button>
          </div>

          <div>
            <button
              className="bg-gray-200 hover:bg-gray-300 text-sm font-medium px-4 py-2 rounded-md"
              onClick={() => {
                setFilters({
                  startDate: "",
                  endDate: "",
                });
                setBalanceFilter({
                  balanceOperator: "",
                  balanceValue: "",
                });
                setCurrentPage(1);
                fetchAccounts();
              }}
            >
              Reset Filters
            </button>
          </div>

          <div>
            <button
              className="bg-blue-500 hover:bg-blue-600 text-sm text-white font-medium px-4 py-2 rounded-md"
              onClick={() => {
                setResetType(selectedIds.length > 0 ? "selected" : "all");
                setIsModalOpen(true);
              }}
            >
              Reset All Balance
            </button>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-10">
          <ClipLoader size={30} color="#0B1C39" />
        </div>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto border border-gray-200 rounded-xl">
            <table className="w-full text-sm">
              <thead className="bg-gray-100 text-gray-600 text-xs uppercase tracking-wide">
                <tr>
                  <th className="text-left px-3 py-4 border-b">S/N</th>
                  <th className="text-left px-3 py-4 border-b">Name</th>
                  <th className="text-left px-3 py-4 border-b">Phone</th>
                  <th className="text-left px-3 py-4 border-b">Email</th>
                  <th className="text-left px-3 py-4 border-b">Balance</th>
                  <th className="text-left px-3 py-4 border-b">
                    Last Activity
                  </th>
                  <th className="text-left px-3 py-4 border-b">
                    Reset Balance
                  </th>
                </tr>
              </thead>
              <tbody>
                {accounts.map((a) => (
                  <tr
                    key={a.id}
                    className="bg-white border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="px-3 py-4">{a.serial}</td>
                    <td className="px-3 py-4">{a.name}</td>
                    <td className="px-3 py-4">{a.phone}</td>
                    <td className="px-3 py-4">{a.email}</td>
                    <td className="px-3 py-4">{a.balance}</td>
                    <td className="px-3 py-4">{a.date}</td>
                    <td className="px-12 py-4">
                      <RiResetLeftFill
                        className="text-blue-600 cursor-pointer text-lg"
                        onClick={() => {
                          setResetType("single");
                          setSingleResetId(a.id);
                          setIsModalOpen(true);
                        }}
                      />
                    </td>
                    <td className="px-3 py-4">
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(a.id)}
                        onChange={() => toggleSelect(a.id)}
                        className="w-4 h-4"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile View */}
          <div className="md:hidden space-y-4">
            {accounts.map((a) => (
              <div
                key={a.id}
                className="border border-gray-200 rounded-lg p-4 shadow-md bg-white"
              >
                <p className="font-semibold">{a.name}</p>
                <p className="text-sm">Phone: {a.phone}</p>
                <p className="text-sm">Email: {a.email}</p>
                <p className="text-sm">Balance: ₦{a.balance}</p>
                <p className="text-sm">Last Purchase: {a.lastPurchase}</p>
                <div>
                  <RiResetLeftFill />
                </div>
              </div>
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(totalEntries / perPage)}
            onPageChange={setCurrentPage}
            totalEntries={totalEntries}
            perPage={perPage}
          />
        </>
      )}

      <ResetBalanceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleReset}
        selectedIds={resetType === "single" ? [singleResetId] : selectedIds}
        loading={resetLoading}
      />
    </div>
  );
};

export default Account;

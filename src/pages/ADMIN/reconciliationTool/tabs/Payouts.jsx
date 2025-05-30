import React, { useEffect, useState } from "react";
import axios from "../../../../utils/axiosInstance";
import { FaEye, FaSearch } from "react-icons/fa";
import { ClipLoader } from "react-spinners";
import Pagination from "../../../../components/Pagination";
import { MdFilterList } from "react-icons/md";
import { RiResetLeftFill } from "react-icons/ri";
import ResetBalanceModal from "../../../../adminComponents/modals/reconciliationModal/ResetBalanceModal";
import toast from "react-hot-toast";
import PayoutModal from "../../../../adminComponents/modals/reconciliationModal/PayoutModal";
import PayoutRequestModal from "../../../../adminComponents/modals/reconciliationModal/PayoutRequestModal";

const Payouts = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [totalEntries, setTotalEntries] = useState(0);
  const [payouts, setPayouts] = useState([]);
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState("default");
  const [sortOrder, setSortOrder] = useState("default");
  const [filters, setFilters] = useState({
    status: "pending",
  });
  const [appliedFilters, setAppliedFilters] = useState({
    status: "pending",
  });
  const [selectedIds, setSelectedIds] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [isPayoutModalOpen, setIsPayoutModalOpen] = useState(false);
  const [payoutActionType, setPayoutActionType] = useState("approve");
  const [targetedIds, setTargetedIds] = useState([]);
  const [payoutLoading, setPayoutLoading] = useState(false);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [currentPayoutId, setCurrentPayoutId] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [currentPayout, setCurrentPayout] = useState(null);

  const fetchPayouts = async () => {
    try {
      setLoading(true);
      let params = {
        search: searchTerm.trim(),
        per_page: perPage,
        page: currentPage,
      };

      if (appliedFilters.status) params.status = appliedFilters.status;

      const res = await axios.get("/v2/payout/requests", { params });

      const formatted = res.data.data.data.map((p, index) => {
        return {
          ...p,
          id: p.id,
          approvalId: p.approval_id,
          serial: p.serial_num || index + 1,
          initiator: `${capitalize(p.initiator_firstName)} ${capitalize(
            p.initiator_lastName
          )}`,
          approver: `${p.approver_firstName || "—"} ${
            p.approver_lastName || ""
          }`,
          amountFormatted: p.amount.toLocaleString(),
          date: new Date(p.created_at).toLocaleDateString("en-NG", {
            year: "numeric",
            month: "short",
            day: "numeric",
          }),
        };
      });

      setPayouts(formatted);
      setTotalEntries(res.data.data.total || res.data.data.totalEntries || 0);
    } catch (err) {
      console.error("Failed to fetch payouts", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayouts();
  }, [searchTerm, currentPage, perPage, appliedFilters]);

  useEffect(() => {
    setCurrentPage(1);
    fetchPayouts();
  }, [sortBy, sortOrder]);

  const handlePayoutAction = async (comment = "") => {
    try {
      setPayoutLoading(true);
      const endpoint =
        payoutActionType === "approve"
          ? "/v2/payout/authorize"
          : "/v2/payout/decline";

      const payload =
        payoutActionType === "approve"
          ? { approval_id: targetedIds }
          : {
              approval_id: targetedIds,
              comments: comment || "Declined by admin",
            };

      await axios.post(endpoint, payload);

      toast.success(
        `Payout${
          targetedIds.length > 1 ? "s" : ""
        } ${payoutActionType}d successfully`
      );

      fetchPayouts();
      setSelectedIds([]);
      setIsPayoutModalOpen(false);
    } catch (err) {
      const errorMsg =
        err?.response?.data?.message ||
        err?.response?.data?.errors?.approval_id?.[0] ||
        `Failed to ${payoutActionType} payout`;

      toast.error(errorMsg);
    } finally {
      setPayoutLoading(false);
    }
  };

  const capitalize = (str) =>
    str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : "";

  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedIds([]);
    } else {
      setSelectedIds(payouts.map((a) => a.approvalId));
    }
    setSelectAll(!selectAll);
  };

  useEffect(() => {
    const allIds = payouts.map((a) => a.approvalId);
    setSelectAll(
      allIds.length > 0 && allIds.every((id) => selectedIds.includes(id))
    );
  }, [selectedIds, payouts]);

  const openPayoutModal = (type, ids) => {
    setPayoutActionType(type);
    setTargetedIds(ids);
    setIsPayoutModalOpen(true);
  };

  const hasActiveFilters = filters.status !== appliedFilters.status;

  const hasFiltersToReset = filters.status !== "pending";

  const handleViewPayout = (payout) => {
    setCurrentPayout(payout);
    setIsViewModalOpen(true);
  };

  return (
    <div className="pb-6 px-2">
      <div className="flex flex-wrap justify-between items-center">
        <h2 className="md:text-lg font-semibold mb-4">Payout Requests</h2>

        <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
          {/* <div className="flex gap-3 items-center">
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
        </div> */}

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
      </div>

      <div className="border border-gray-200 rounded-md p-4 mb-4">
        <div className="flex items-center gap-2 mb-4">
          <MdFilterList className="text-blue-500 font-bold text-xl" />
          <div className="text-sm font-bold">Filter Data</div>
        </div>

        <div className="flex flex-wrap items-end gap-4">
          <select
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            className="border border-gray-300 rounded-md px-4 py-2 text-sm"
          >
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>

          <div>
            <button
              className={`${
                hasActiveFilters
                  ? "bg-[#FC7B00] hover:bg-orange-600"
                  : "bg-orange-300 cursor-not-allowed"
              } text-white text-sm font-medium px-4 py-2 rounded-md`}
              onClick={() => {
                setAppliedFilters({ ...filters });
                setCurrentPage(1);
              }}
              disabled={!hasActiveFilters}
            >
              Apply Filters
            </button>
          </div>

          <div>
            <button
              className={`${
                hasFiltersToReset
                  ? "bg-gray-200 hover:bg-gray-300"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
              } text-sm font-medium px-4 py-2 rounded-md`}
              onClick={() => {
                setFilters({ status: "pending" });
                setAppliedFilters({ status: "pending" });
                setCurrentPage(1);
                fetchPayouts();
              }}
              disabled={!hasFiltersToReset}
            >
              Reset Filters
            </button>
          </div>
          {selectedIds.length > 0 && (
            <div className="flex gap-3">
              <button
                onClick={() => openPayoutModal("approve", selectedIds)}
                className="bg-green-600 text-white px-4 py-2 rounded-md text-sm"
              >
                Approve Selected
              </button>
              <button
                onClick={() => openPayoutModal("decline", selectedIds)}
                className="bg-red-600 text-white px-4 py-2 rounded-md text-sm"
              >
                Decline Selected
              </button>
            </div>
          )}
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-10">
          <ClipLoader size={30} color="#0B1C39" />
        </div>
      ) : payouts.length === 0 ? (
        <div className="text-center text-gray-500 py-10">
          No payout requests is available
        </div>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto border border-gray-200 rounded-xl">
            <table className="w-full text-sm">
              <thead className="bg-gray-100 text-gray-600 text-xs uppercase tracking-wide">
                <tr>
                  <th className="text-left px-3 py-4 border-b">S/N</th>
                  <th className="text-left px-3 py-4 border-b">Initiator</th>
                  <th className="text-left px-3 py-4 border-b">Amount</th>
                  <th className="text-left px-3 py-4 border-b">Status</th>
                  <th className="text-left px-3 py-4 border-b">Approver</th>
                  <th className="text-left px-3 py-4 border-b">
                    Payout Status
                  </th>
                  <th className="text-left px-3 py-4 border-b">Date</th>
                  <th className="text-left px-3 py-4 border-b">View</th>
                  {payouts.some((p) => p.status === "pending") && (
                    <th className="text-left px-3 py-4 border-b">Action</th>
                  )}
                  <th className="px-3 py-4 border-b text-left">
                    <input
                      type="checkbox"
                      checked={selectAll}
                      onChange={handleSelectAll}
                      className="w-4 h-4 align-middle"
                    />
                  </th>
                </tr>
              </thead>

              <tbody>
                {payouts.map((a) => (
                  <tr
                    key={a.id}
                    className="bg-white border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="px-3 py-4">{a.serial}</td>
                    <td className="px-3 py-4 capitalize">{a.initiator}</td>
                    <td className="px-3 py-4">₦{a.amountFormatted}</td>
                    <td className="px-3 py-4 capitalize">{a.status}</td>
                    <td className="px-3 py-4">{a.approver}</td>
                    <td
                      className={`px-3 py-4 capitalize font-medium text-sm ${
                        a.payoutStatus === "paid"
                          ? "text-green-600"
                          : "text-orange-500"
                      }`}
                    >
                      {a.payoutStatus === "paid" ? "paid" : "pending"}
                    </td>
                    <td className="px-3 py-4">{a.date}</td>
                    <td className="px-3 py-4 text-center">
                      <button
                        className="text-blue-600"
                        onClick={() => handleViewPayout(a)}
                      >
                        <FaEye />
                      </button>
                    </td>
                    {a.status === "pending" && (
                      <td className="px-3 py-4 space-x-2">
                        <button
                          className="text-sm text-green-600 hover:underline"
                          onClick={() =>
                            openPayoutModal("approve", [a.approvalId])
                          }
                        >
                          Approve
                        </button>
                        <button
                          className="text-sm text-red-600 hover:underline"
                          onClick={() =>
                            openPayoutModal("decline", [a.approvalId])
                          }
                        >
                          Decline
                        </button>
                      </td>
                    )}
                    <td className="px-3 py-4">
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(a.approvalId)}
                        onChange={() => toggleSelect(a.approvalId)}
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
            {payouts.map((a) => (
              <div
                key={a.id}
                className="border border-gray-200 rounded-lg p-4 shadow-md bg-white"
              >
                <p className="font-semibold">{a.initiator}</p>
                <p className="text-sm">Amount: ₦{a.amount}</p>
                <p className="text-sm capitalize">Status: {a.status}</p>
                <p className="text-sm">Approver: {a.approver}</p>
                <p className="text-sm">Ref: {a.ref}</p>
                <p
                  className={`text-sm capitalize font-medium ${
                    a.payoutStatus === "paid"
                      ? "text-green-600"
                      : "text-orange-500"
                  }`}
                >
                  Payout Status: {a.payoutStatus}
                </p>
                <p className="text-sm">Date: {a.date}</p>
                {a.status === "pending" && (
                  <div className="flex justify-between items-center mt-2">
                    <button
                      className="text-blue-600 text-xs underline"
                      onClick={() => openPayoutModal("approve", [a.approvalId])}
                    >
                      Approve
                    </button>
                    <button
                      className="text-sm text-red-600 hover:underline"
                      onClick={() => openPayoutModal("decline", [a.approvalId])}
                    >
                      Decline
                    </button>
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(a.approvalId)}
                      onChange={() => toggleSelect(a.approvalId)}
                      className="w-4 h-4"
                    />
                  </div>
                )}
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

      <PayoutModal
        isOpen={isPayoutModalOpen}
        onClose={() => setIsPayoutModalOpen(false)}
        onConfirm={handlePayoutAction}
        selectedIds={targetedIds}
        loading={payoutLoading}
        actionType={payoutActionType}
      />

      <PayoutRequestModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        payout={currentPayout}
        onConfirm={handlePayoutAction}
      />
    </div>
  );
};

export default Payouts;

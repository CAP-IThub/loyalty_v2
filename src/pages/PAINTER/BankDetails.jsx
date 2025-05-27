import React, { useState, useEffect } from "react";
import { FaUniversity } from "react-icons/fa";
import Select from "react-select";
import axios from "../../utils/axiosInstance";
import toast from "react-hot-toast";

const BankDetails = () => {
  const [banks, setBanks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    bankName: "",
    sortCode: "",
    accountNumber: "",
    accountHolderName: "",
  });

  const [loadingBanks, setLoadingBanks] = useState(false);

  useEffect(() => {
    const fetchBanks = async () => {
      try {
        setLoadingBanks(true);
        const res = await axios.get("/v2/get/banks");
        setBanks(res.data.data);
      } catch (err) {
        console.error("Failed to fetch banks", err);
        toast.error("Unable to load banks");
      } finally {
        setLoadingBanks(false);
      }
    };

    fetchBanks();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleBankSelect = (selected) => {
    setForm((prev) => ({
      ...prev,
      bankName: selected?.label || "",
      sortCode: selected?.value || "",
    }));
  };

  const bankOptions = banks.map((bank) => ({
    value: bank.code,
    label: bank.name,
  }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      bank_name: form.bankName,
      account_num: form.accountNumber,
      account_name: form.accountHolderName,
      sort_code: form.sortCode,
    };

    try {
      setLoading(true);
      const res = await axios.post("/v2/customer/profile", payload);
      toast.success(res.data?.message || "Bank details updated!");
    } catch (err) {
      const errorMsg =
        err?.response?.data?.message || "Failed to update bank details";
      toast.error(errorMsg);
      console.error("Update error:", err);
    }
    setLoading(false);
  };  



  return (
    <div className="pt-[2rem]">
      <div className="max-w-xl mx-auto bg-white p-6 rounded-md shadow-md">
        <div className="flex items-center gap-2 mb-6">
          <FaUniversity className="text-[#FC7B00] text-lg" />
          <h2 className="text-lg font-semibold">Update Bank Details</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Bank Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Bank Name
            </label>
            <Select
              isLoading={loadingBanks}
              options={bankOptions}
              onChange={handleBankSelect}
              placeholder="Select bank"
              isSearchable
              styles={{
                control: (base, state) => ({
                  ...base,
                  borderColor: state.isFocused ? "#FC7B00" : "#d1d5db", // Tailwind's gray-300
                  boxShadow: state.isFocused ? "0 0 0 1px #FC7B00" : "none",
                  "&:hover": { borderColor: "#FC7B00" },
                  borderRadius: "0.375rem", // Tailwind's rounded-md
                  padding: "0.25rem 0.25rem",
                  fontSize: "0.875rem",
                }),
                option: (base, state) => ({
                  ...base,
                  backgroundColor: state.isSelected
                    ? "#FC7B00"
                    : state.isFocused
                    ? "#ffe6d2"
                    : "white",
                  color: state.isSelected ? "white" : "#1A1A1A",
                  fontSize: "0.875rem",
                }),
                singleValue: (base) => ({
                  ...base,
                  color: "#1A1A1A",
                }),
              }}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Account Number
            </label>
            <input
              type="text"
              name="accountNumber"
              value={form.accountNumber}
              onChange={handleChange}
              placeholder="Enter account number"
              className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#FC7B00]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Sort Code
            </label>
            <input
              type="text"
              name="sortCode"
              value={form.sortCode}
              disabled
              className="w-full bg-gray-100 border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#FC7B00]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Account Holder Name
            </label>
            <input
              type="text"
              name="accountHolderName"
              value={form.accountHolderName}
              onChange={handleChange}
              placeholder="Enter account holder name"
              className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#FC7B00]"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-[#FC7B00] hover:opacity-90 text-white text-sm font-medium px-5 py-2 rounded-md"
          >
            {loading ? "Updating..." : "Update Bank Details"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BankDetails;

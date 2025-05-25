import React, { useState } from "react";
import { FaUniversity } from "react-icons/fa";

const BankDetails = () => {
  const [form, setForm] = useState({
    bankName: "",
    accountNumber: "",
    sortCode: "",
    accountHolderName: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // handle submission logic here
    console.log(form);
  };

  return (
    <div className="pt-6">
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
            <input
              type="text"
              name="bankName"
              value={form.bankName}
              onChange={handleChange}
              placeholder="Enter bank name"
              className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Account Number */}
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
              className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Sort Code */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Sort Code
            </label>
            <input
              type="text"
              name="sortCode"
              value={form.sortCode}
              onChange={handleChange}
              placeholder="XX-XX-XX"
              className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Account Holder Name */}
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
              className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-[#FC7B00] hover:opacity-90 text-white text-sm font-medium px-5 py-2 rounded-md"
          >
            Update Bank Details
          </button>
        </form>
      </div>
    </div>
  );
};

export default BankDetails;

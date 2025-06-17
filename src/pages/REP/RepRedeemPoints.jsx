import React, { useEffect, useState } from "react";
import axios from "../../utils/axiosInstance";
import StatCard from "../../adminComponents/StatCard";
import usersIcon from "../../assets/images/usersIcon.png";
import totalIcon from "../../assets/images/totalIcon.png";
import deliveredIcon from "../../assets/images/deliveredIcon.png";
import pendingIcon from "../../assets/images/pendingIcon.png";
import { ClipLoader } from "react-spinners";
import { IoIosPersonAdd } from "react-icons/io";
import SageModal from "../../repComponents/modals/SageModal";
import { useSage } from "../../context/SageContext";
import toast from "react-hot-toast";

const RepRedeemPoints = () => {
  const [sageModalOpen, setSageModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [customer, setCustomer] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [invoice, setInvoice] = useState("");  
  const [invoiceLoading, setInvoiceLoading] = useState(false);
  const [invoiceData, setInvoiceData] = useState(null);
  const [awarding, setAwarding] = useState(false);
  const { isConnected } = useSage();

  const handleValidate = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    setLoading(true);
    setErrorMessage("");
    setCustomer(null);

    try {
      const paramType = inputValue.includes("@") ? "email" : "phoneNum";
      const res = await axios.get(`/customer/search`, {
        params: {
          [paramType]: inputValue.trim(),
        },
      });

      const customer = res.data.data.customer;
      const tier = res.data?.data?.loyalty_tier?.name || null;
      const found = { ...customer, tier };
      localStorage.setItem("validatedCustomer", JSON.stringify(found));

      setCustomer(found);
      toast.success("Customer validated successfully!");
      console.log("Customer state updated:", found);
    } catch (err) {
      const backendError =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        "Something went wrong.";
      setErrorMessage(backendError);
      toast.error(backendError);
    } finally {
      setLoading(false);
    }
  };

  const handleInvoiceValidate = async (e) => {
    e.preventDefault();
    setInvoiceLoading(true);

    try {
      const sageCreds = JSON.parse(localStorage.getItem("sageCredentials"));
      const customer = JSON.parse(localStorage.getItem("validatedCustomer"));
      const centerId = localStorage.getItem("sageCenterId");

      if (!sageCreds || !centerId || !customer) {
        toast.error(
          "Missing required data. Please reconnect Sage or revalidate customer."
        );
        setInvoiceLoading(false);
        return;
      }

      const payload = {
        username: sageCreds.username,
        password: sageCreds.password,
        invoice_id: invoice,
        companyId: parseInt(centerId),
        customer_id: customer.id,
      };

      const res = await axios.post(`/v2/get/sage/invoice`, payload);

      const totalAmount = Number(res.data.data.TotalAmount);
      const customerFromStorage = JSON.parse(
        localStorage.getItem("validatedCustomer")
      );

      setInvoiceData({
        amount: totalAmount.toLocaleString("en-NG", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }),
        points: Number(customerFromStorage.balance).toLocaleString("en-NG", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }),
      });

      toast.success("Invoice validated successfully");

      console.log("Invoice response:", res.data);
    } catch (err) {
      const msg = err?.response?.data?.message || "Failed to validate invoice";
      toast.error(msg);
      console.error(err);
    } finally {
      setInvoiceLoading(false);
    }
  };

  const handleAwardPoints = async () => {
    setAwarding(true);
    try {
      const customer = JSON.parse(localStorage.getItem("validatedCustomer"));
      const repInfo = JSON.parse(localStorage.getItem("repInfo"));
      const centerId = localStorage.getItem("sageCenterId");

      if (!customer || !invoiceData || !repInfo || !centerId) {
        toast.error("Missing required data for awarding points.");
        setAwarding(false);
        return;
      }

      const payload = {
        id: customer.id,
        invoiceNum: invoice,
        amount: Number(invoiceData.amount.replace(/,/g, "")),
        shopId: repInfo.center.id,
        companyId: parseInt(centerId),
        store_type: repInfo.center.choice,
        tier: customer.tier,
        category: customer.category,
      };

      const res = await axios.post("/v2/award", payload);

      toast.success("Points awarded successfully!");
      console.log("Award Points Response:", res.data);

      setInputValue("");
      setInvoice("");
      setCustomer(null);
      setInvoiceData(null);
      setErrorMessage("");
      localStorage.removeItem("validatedCustomer");
    } catch (err) {
      const msg = err?.response?.data?.message || "Failed to award points.";
      toast.error(msg);
      console.error("Award Points Error:", err);
    } finally {
      setAwarding(false);
    }
  };    
  
  return (
    <div className="space-y-4 md:space-y-4">
      <div className="py-[1rem]">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="md:text-xl font-semibold">Redeem Points</h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              disabled={isConnected}
              className={`flex items-center gap-2 ${
                isConnected
                  ? "bg-green-600 cursor-not-allowed"
                  : "bg-[#FC7B00] hover:bg-orange-600"
              } text-white rounded-md px-4 py-2 text-sm transition`}
              onClick={() => {
                if (!isConnected) setSageModalOpen(true);
              }}
            >
              {isConnected ? "Sage Connected" : "Connect to Sage"}
            </button>
          </div>
        </div>
      </div>

      {!customer && (
        <form className="space-y-4" onSubmit={handleValidate}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Enter Phone Number or Email
            </label>
            <input
              type="text"
              placeholder="Ex. 08012345678 or example@gmail.com"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full border border-purple-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#FC7B00]"
            />
            {errorMessage && (
              <p className="text-sm text-red-600 mt-1">{errorMessage}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-[#FC7B00] hover:bg-orange-600 text-white font-semibold py-2 rounded-md shadow flex items-center justify-center"
            disabled={loading}
          >
            {loading ? <ClipLoader size={20} color="#fff" /> : "Validate"}
          </button>
        </form>
      )}

      {customer && (
        <div>
          <p className="text-lg text-gray-700 pb-2">
            Name:{" "}
            <span className="font-medium text-black">
              {customer.firstName} {customer.lastName}
            </span>
          </p>
          <p className="text-lg text-gray-700">
            Phone Number:{" "}
            <span className="font-medium text-black">{customer.phoneNum}</span>
          </p>

          {!isConnected ? (
            <div className="flex items-center gap-2 mt-4 text-sm">
              <span className="mt-[2px] text-lg">ℹ️</span>
              <span>Please connect to Sage to continue.</span>
            </div>
          ) : !invoiceData ? (
            <form className="space-y-4 pt-4" onSubmit={handleInvoiceValidate}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Enter Invoice Number
                </label>
                <input
                  type="text"
                  value={invoice}
                  onChange={(e) => setInvoice(e.target.value)}
                  placeholder="Ex. 00xx00x"
                  className="w-full border border-purple-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#FC7B00]"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#FC7B00] hover:bg-orange-600 text-white font-semibold py-2 rounded-md shadow"
                disabled={invoiceLoading}
              >
                {invoiceLoading ? (
                  <ClipLoader size={20} color="#fff" />
                ) : (
                  "Validate"
                )}
              </button>
            </form>
          ) : (
            <div className="py-2 space-y-2">
              <p className="text-lg text-gray-700">
                <span className="font-semibold text-gray-500">
                  Amount Purchased:
                </span>{" "}
                <span className="font-bold">
                  ₦{invoiceData.amount}
                </span>
              </p>
              <p className="text-lg text-gray-700">
                <span className="font-semibold text-gray-500">Points:</span>{" "}
                <span className="font-bold">
                  {Number(
                    invoiceData.amount.replace(/,/g, "") / 100
                  ).toLocaleString("en-NG", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </p>
              <p className="text-lg text-gray-700">
                <span className="font-semibold text-gray-500">
                  Balance Points:
                </span>{" "}
                <span className="font-bold">
                  {invoiceData.points}
                </span>
              </p>
              <p className="text-lg text-gray-700">
                <span className="font-semibold text-gray-500">New Total:</span>{" "}
                <span className="font-bold">
                  {(
                    Number(invoiceData.amount.replace(/,/g, "")) / 100 +
                    Number(invoiceData.points.replace(/,/g, ""))
                  ).toLocaleString("en-NG", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </p>
              <button
                type="button"
                onClick={handleAwardPoints}
                disabled={awarding}
                className="w-full bg-[#FC7B00] hover:bg-orange-600 text-white font-semibold py-2 rounded-md shadow mt-4 flex justify-center items-center"
              >
                {awarding ? (
                  <ClipLoader size={20} color="#fff" />
                ) : (
                  "Redeem Points"
                )}
              </button>
            </div>
          )}
        </div>
      )}

      <SageModal
        isOpen={sageModalOpen}
        closeSageModal={() => setSageModalOpen(false)}
      />
    </div>
  );
};

export default RepRedeemPoints;

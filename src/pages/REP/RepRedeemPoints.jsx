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
import RedeemSuccessModal from "../../repComponents/modals/RedeemSuccessModal";

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
  const [otp, setOtp] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [otpTimer, setOtpTimer] = useState(180);
  const [resendLoading, setResendLoading] = useState(false);
  const [verifyingOtp, setVerifyingOtp] = useState(false);
  const [claimAmount, setClaimAmount] = useState("");
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [redeemData, setRedeemData] = useState(null);
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
      const repInfo = JSON.parse(localStorage.getItem("repInfo"));

      const discountRes = await axios.post("/v2/campaign/discount", {
        category: customerFromStorage.category,
        store_type: repInfo.center.choice,
        tier: customerFromStorage.tier,
      });

      const discount = discountRes.data.data.discount || 0;
      const calculatedPoints = (discount / 100) * totalAmount;
      const balance = Number(customer.balance);

      setInvoiceData({
        amount: totalAmount.toLocaleString("en-NG", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }),
        points: calculatedPoints.toLocaleString("en-NG", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }),
        balancePoints: balance.toLocaleString("en-NG", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }),
      });

      setShowOtpInput(true);
      setOtpVerified(false);
      setOtpTimer(180);

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

  useEffect(() => {
    if (!showOtpInput) return;

    const timer = setInterval(() => {
      setOtpTimer((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          toast.error("OTP expired. Please resend.");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [showOtpInput]);

  const handleVerifyOtp = async () => {
    const customer = JSON.parse(localStorage.getItem("validatedCustomer"));
    if (!otp || !customer) return;

    try {
      setVerifyingOtp(true);
      const response = await axios.post("/v2/verify-token", {
        customer_id: customer.id,
        otp,
      });

      toast.success("OTP verified!");
      setOtpVerified(true);
    } catch (err) {
      if (err.response?.status === 401) {
        toast.error("Invalid OTP. Please try again.");
      } else {
        toast.error(err?.response?.data?.message || "OTP verification failed");
      }
    } finally {
      setVerifyingOtp(false);
    }
  };  

  const handleResendOtp = async () => {
    const customer = JSON.parse(localStorage.getItem("validatedCustomer"));
    if (!customer) return;

    try {
      setResendLoading(true);
      await axios.post("/v2/resend-otp", {
        customer_id: customer.id,
      });
      toast.success("OTP resent successfully");
      setOtp("");
      setOtpTimer(180);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to resend OTP");
    } finally {
      setResendLoading(false);
    }
  };

  const handleRedeemPoints = async () => {
    setAwarding(true);
    try {
      const customer = JSON.parse(localStorage.getItem("validatedCustomer"));
      const repInfo = JSON.parse(localStorage.getItem("repInfo"));
      const centerId = localStorage.getItem("sageCenterId");

      if (!customer || !invoiceData || !repInfo || !centerId) {
        toast.error("Missing required data for redeeming points.");
        setAwarding(false);
        return;
      }

      const totalPoints =
        Number(invoiceData.amount.replace(/,/g, "")) / 100 +
        Number(invoiceData.points.replace(/,/g, ""));

      if (!claimAmount || Number(claimAmount) > totalPoints) {
        toast.error(
          "Claim amount must be less than or equal to available points."
        );
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
        claim: Number(claimAmount),
      };

      const res = await axios.post("/v2/redeem", payload);

      setRedeemData(res.data.data);
      setSuccessModalOpen(true);

      toast.success("Points redeemed successfully!");
      console.log("Redeem Points Response:", res.data);

      setInputValue("");
      setInvoice("");
      setCustomer(null);
      setInvoiceData(null);
      setClaimAmount("");
      setErrorMessage("");
      localStorage.removeItem("validatedCustomer");
    } catch (err) {
      const msg = err?.response?.data?.message || "Failed to redeem points.";
      toast.error(msg);
      console.error("Redeem Points Error:", err);
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
              className="w-[20rem] border border-purple-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#FC7B00]"
            />
            {errorMessage && (
              <p className="text-sm text-red-600 mt-1">{errorMessage}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-[20rem] bg-[#FC7B00] hover:bg-orange-600 text-white font-semibold py-2 rounded-md shadow flex items-center justify-center"
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
                  className="w-[20rem] border border-[#FC7B00] rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#FC7B00]"
                />
              </div>
              <button
                type="submit"
                className="w-[20rem] bg-[#FC7B00] hover:bg-orange-600 text-white font-semibold py-2 rounded-md shadow"
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
                <span className="text-lg text-gray-700 pb-2">
                  Amount Purchased:
                </span>{" "}
                <span className="font-medium text-black">
                  ₦{invoiceData.amount}
                </span>
              </p>
              <p className="text-lg text-gray-700">
                <span className="text-lg text-gray-700 pb-2">Points:</span>{" "}
                <span className="font-medium text-black">
                  {invoiceData.points}
                </span>
              </p>
              <p className="text-lg text-gray-700 pb-2">
                <span className="text-lg text-gray-700 pb-2">
                  Balance Points:
                </span>{" "}
                <span className="font-medium text-black">
                  {invoiceData.balancePoints}
                </span>
              </p>
              <p className="text-lg text-gray-700 pb-2">
                <span className="text-lg text-gray-700 pb-2">New Total:</span>{" "}
                <span className="font-medium text-black">
                  {(
                    Number(invoiceData.points.replace(/,/g, "")) +
                    Number(invoiceData.balancePoints.replace(/,/g, ""))
                  ).toLocaleString("en-NG", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </p>
              {showOtpInput && !otpVerified && (
                <div className="space-y-2 mt-4 flex flex-col">
                  <label className="text-sm text-gray-700">Enter OTP</label>
                  <div>
                    <input
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      className="w-[20rem] border border-[#FC7B00] rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#FC7B00]"
                    />
                  </div>
                  <p className="text-xs text-gray-500">
                    OTP expires in {Math.floor(otpTimer / 60)}:
                    {String(otpTimer % 60).padStart(2, "0")}
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={handleVerifyOtp}
                      className="bg-green-600 text-white px-4 py-2 rounded text-sm w-[10rem]"
                    >
                      {verifyingOtp ? (
                        <ClipLoader size={20} color="#fff" />
                      ) : (
                        "Verify OTP"
                      )}
                    </button>
                    <button
                      disabled={resendLoading}
                      onClick={handleResendOtp}
                      className="text-blue-600 text-sm"
                    >
                      {resendLoading ? "Resending..." : "Resend OTP"}
                    </button>
                  </div>
                </div>
              )}

              {otpVerified && (
                <div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Amount to Claim
                    </label>
                    <input
                      type="number"
                      value={claimAmount}
                      onChange={(e) => setClaimAmount(e.target.value)}
                      placeholder="Enter amount to redeem"
                      className="w-[20rem] border border-purple-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#FC7B00]"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleRedeemPoints}
                    disabled={awarding}
                    className="w-[20rem] bg-[#FC7B00] hover:bg-orange-600 text-white font-semibold py-2 rounded-md shadow mt-4 flex justify-center items-center"
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
        </div>
      )}

      <SageModal
        isOpen={sageModalOpen}
        closeSageModal={() => setSageModalOpen(false)}
      />

      <RedeemSuccessModal
        isOpen={successModalOpen}
        closeModal={() => setSuccessModalOpen(false)}
        data={redeemData}
      />
    </div>
  );
};

export default RepRedeemPoints;

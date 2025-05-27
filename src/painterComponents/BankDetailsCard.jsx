import { Link } from "react-router-dom";

const BankDetailsCard = ({ bankName, accountNumber, onUpdateClick }) => {
  const maskedAccount =
    accountNumber?.length > 4
      ? `**** **** ${accountNumber.slice(-4)}`
      : "**** **** ****";

  return (
    <div className="my-5">
      <div className="bg-white p-5 rounded-xl shadow-md w-full">
        <h2 className="text-lg font-semibold mb-4">Bank Details</h2>

        <div className="flex justify-between text-gray-700 text-sm mb-2">
          <span>Current Bank</span>
          <span className="font-medium text-black">{bankName || "—"}</span>
        </div>

        <div className="flex justify-between text-gray-700 text-sm mb-4">
          <span>Account Number</span>
          <span className="font-medium text-black">{maskedAccount}</span>
        </div>

        <Link to="/bank-details">
          <button className="bg-[#FC7B00] text-white px-5 py-2 rounded-md shadow hover:opacity-90 transition-all text-sm">
            Update Bank Details
          </button>
        </Link>
      </div>
    </div>
  );
};

export default BankDetailsCard;

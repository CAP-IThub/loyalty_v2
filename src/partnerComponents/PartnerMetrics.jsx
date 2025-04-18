import {
  FaEyeSlash,
  FaSyncAlt,
  FaFileInvoice,
  FaHistory,
  FaShoppingBag,
} from "react-icons/fa";

const PartnerMetrics = () => {
  return (
    <div className="space-y-6 py-1">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Sales Target Card */}
        <div className="bg-[#0B1F47] text-white px-6 py-9 rounded-2xl flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-300">Sales Target</p>
            <h2 className="text-xl font-semibold">₦1,641,436.07</h2>
            <div className="mt-6">
              <p className="text-sm text-gray-300">Achieved Sales</p>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-semibold">₦0.00</h3>
                <p className="text-xs text-red-400">↓ 100% VS Yesterday</p>
              </div>
            </div>
          </div>
          {/* Circular ring */}
          <div className="flex flex-col items-center">
            <div className="w-[8rem] h-[8rem] border-[10px] border-white rounded-full flex flex-col items-center justify-center">
              <span className="text-white text-lg font-semibold">0%</span>
              <p className="text-xs mt-1">of target</p>
            </div>
          </div>
        </div>

        {/* Balance Card */}
        <div className="bg-[#0B1F47] text-white p-6 rounded-xl space-y-2">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-300">
                Total Balance (Wallet + Credit)
              </p>
              <h2 className="text-2xl font-semibold">₦485,019.57</h2>
            </div>
            <FaEyeSlash />
          </div>
          <p className="text-xs text-gray-400">
            Last Updated: 04 Apr, 2025 | 12:51PM
          </p>
          <div className="flex justify-between items-center text-xs mt-3">
            <div>
              <p>Wallet Balance</p>
              <p className="text-[#00FF94]">₦0.00</p>
            </div>
            <button className="flex items-center gap-1 text-xs bg-white text-[#0B1F47] px-3 py-1 rounded-full font-medium">
              <FaSyncAlt size={12} /> Refresh
            </button>
            <div className="text-right">
              <p>Credit Limit</p>
              <p className="font-bold text-white">₦500,000.00</p>
              <p className="text-xs text-gray-400">Bal: ₦485,019.57</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerMetrics;

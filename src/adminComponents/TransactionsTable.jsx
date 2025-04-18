import React from "react";

const awardedData = [
  {
    id: 84,
    amount: 75250,
    point: 752,
    painter: "oludayo A.",
    shop: "Bauch In...",
    address: "4516 Wolf",
  },
  {
    id: 83,
    amount: 75250,
    point: 752,
    painter: "oludayo A.",
    shop: "Bauch In...",
    address: "4516 Wolf",
  },
  {
    id: 82,
    amount: 752500,
    point: 7525,
    painter: "oludayo A.",
    shop: "Bauch In...",
    address: "4516 Wolf",
  },
  {
    id: 81,
    amount: 75250,
    point: 752,
    painter: "CJ D.",
    shop: "Berge, S...",
    address: "874 Windle",
  },
  {
    id: 80,
    amount: 75250,
    point: 752,
    painter: "CJ D.",
    shop: "Berge, S...",
    address: "874 Windle",
  },
];

const claimedData = [
  {
    id: 27,
    point: 37625,
    painter: "Emmanuel A.",
    shop: "Swift an...",
    address: "70908 Litt",
  },
  {
    id: 26,
    point: 8900,
    painter: "oludayo A.",
    shop: "Bauch In...",
    address: "4516 Wolf",
  },
  {
    id: 25,
    point: 1000,
    painter: "CJ D.",
    shop: "Berge, S...",
    address: "874 Windle",
  },
  {
    id: 24,
    point: 70,
    painter: "Goke a.",
    shop: "Bauch In...",
    address: "4516 Wolf",
  },
  {
    id: 23,
    point: 2500,
    painter: "CJ D.",
    shop: "Berge, S...",
    address: "874 Windle",
  },
];

const TransactionsTable = () => {
  const renderTableRows = (data, isAwarded = true) =>
    data.map((item, index) => (
      <tr key={item.id} className={index % 2 === 1 ? "bg-[#f4f6f9]" : ""}>
        <td className="py-3 px-4">{item.id}</td>
        {isAwarded && <td className="py-3 px-4">{item.amount}</td>}
        <td className="py-3 px-4">{item.point}</td>
        <td className="py-3 px-4">{item.painter}</td>
        <td className="py-3 px-4 truncate max-w-[150px]">{item.shop}</td>
        <td className="py-3 px-4">{item.address}</td>
      </tr>
    ));

  return (
    <div>
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Transactions</h3>
        
      </div>
      <div className="grid md:grid-cols-2 gap-4 mt-2">
        {/* Recent Awarded */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <h3 className="px-6 py-4 font-semibold text-lg text-[#1E2A4A] border-b">
            RECENT AWARDED
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#eef4fa] text-[#1E2A4A] font-semibold">
                <tr>
                  <th className="py-3 px-4">ID</th>
                  <th className="py-3 px-4">AMOUNT</th>
                  <th className="py-3 px-4">POINT</th>
                  <th className="py-3 px-4">PAINTER</th>
                  <th className="py-3 px-4">SHOP</th>
                  <th className="py-3 px-4">ADDRESS</th>
                </tr>
              </thead>
              <tbody>{renderTableRows(awardedData)}</tbody>
            </table>
          </div>
          <div className="flex justify-center py-4">
            <button className="bg-[#0B0F28] text-white px-6 py-2 rounded-full font-semibold text-sm hover:bg-[#1a223a]">
              View All
            </button>
          </div>
        </div>

        {/* Recent Claimed */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <h3 className="px-6 py-4 font-semibold text-lg text-[#1E2A4A] border-b">
            RECENT CLAIMED
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#eef4fa] text-[#1E2A4A] font-semibold">
                <tr>
                  <th className="py-3 px-4">ID</th>
                  <th className="py-3 px-4">POINT</th>
                  <th className="py-3 px-4">PAINTER</th>
                  <th className="py-3 px-4">SHOP</th>
                  <th className="py-3 px-4">ADDRESS</th>
                </tr>
              </thead>
              <tbody>{renderTableRows(claimedData, false)}</tbody>
            </table>
          </div>
          <div className="flex justify-center py-4">
            <button className="bg-[#0B0F28] text-white px-6 py-2 rounded-full font-semibold text-sm hover:bg-[#1a223a]">
              View All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionsTable;

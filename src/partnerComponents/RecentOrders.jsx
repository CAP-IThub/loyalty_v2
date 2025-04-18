const orders = [
  {
    name: "TEST DULUX",
    orderId: "208022693",
    status: "Pending",
    quantity: 1,
    amount: "₦5,199.09",
    date: "03/04/2025",
    time: "08:53am",
  },
  {
    name: "Olagoke Oagboibon",
    orderId: "208022692",
    status: "Cancelled",
    quantity: 2,
    amount: "₦10,399.94",
    date: "31/03/2025",
    time: "02:28pm",
  },
  {
    name: "TEST DULUX",
    orderId: "208022690",
    status: "Cancelled",
    quantity: 1,
    amount: "₦2,644.50",
    date: "28/03/2025",
    time: "04:36pm",
  },
  {
    name: "TEST DULUX",
    orderId: "208022659",
    status: "Cancelled",
    quantity: 1,
    amount: "₦2,644.50",
    date: "28/03/2025",
    time: "04:34pm",
  },
  {
    name: "TEST DULUX",
    orderId: "208022658",
    status: "Cancelled",
    quantity: 1,
    amount: "₦2,644.50",
    date: "28/03/2025",
    time: "04:31pm",
  },
];

const statusStyles = {
  Pending: "bg-orange-100 text-orange-500",
  Cancelled: "bg-red-100 text-red-500",
};

const RecentOrders = () => {
  return (
    <div className="">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-gray-800">Recent Orders</h2>
        <button className="text-sm text-[#0B1F47] hover:underline font-medium">
          View More →
        </button>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:grid grid-cols-12 bg-gray-100 px-4 py-2 text-xs font-semibold text-gray-600 rounded-t-lg">
        <div className="col-span-4">Order Details</div>
        <div className="col-span-3">Status</div>
        <div className="col-span-3">Amount</div>
        <div className="col-span-2 text-center">Action</div>
      </div>

      <div className="space-y-2">
        {orders.map((order, i) => (
          <div
            key={i}
            className="grid grid-cols-1 md:grid-cols-12 items-center bg-white p-4 border border-gray-100 rounded-lg shadow-sm"
          >
            {/* Order Info */}
            <div className="col-span-4">
              <p className="font-semibold text-sm text-gray-800">
                {order.name}
              </p>
              <p className="text-xs text-gray-500">Order ID: {order.orderId}</p>
              <p className="text-xs text-gray-500">
                Quantity: {order.quantity} items
              </p>
            </div>

            {/* Status */}
            <div className="col-span-3 mt-2 md:mt-0">
              <span
                className={`text-xs px-2 py-1 rounded-full font-medium ${
                  statusStyles[order.status]
                }`}
              >
                {order.status}
              </span>
            </div>

            {/* Amount */}
            <div className="col-span-3 mt-2 md:mt-0">
              <p className="font-semibold text-sm text-gray-800">
                {order.amount}
              </p>
              <p className="text-xs text-gray-500">
                {order.date} | {order.time}
              </p>
            </div>

            {/* Action */}
            <div className="col-span-2 mt-3 md:mt-0 text-center">
              <button className="border text-sm border-gray-300 rounded-md px-3 py-1 hover:bg-gray-100">
                View
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentOrders;

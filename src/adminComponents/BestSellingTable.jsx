import React from "react";
import { FaEye } from "react-icons/fa";
import product from "../assets/images/product.png";

const products = [
  {
    name: "Caplux Weathershield",
    image: product,
    orders: 300000,
    status: "Stock",
    price: "₦5,050,000.00",
  },
  {
    name: "Caplux Alkali Resisting",
    image: product,
    orders: 280000,
    status: "Stock",
    price: "₦300,000.00",
  },
  {
    name: "Caplux Acrylic Satin",
    image: product,
    orders: 204000,
    status: "Out of Stock",
    price: "₦50,050.00",
  },
  {
    name: "Dulux Easycare",
    image: product,
    orders: 200000,
    status: "Stock",
    price: "₦1,020,000.00",
  },
  {
    name: "Sandtex FineBuild",
    image: product,
    orders: 190000,
    status: "Out of Stock",
    price: "₦5,050,000.00",
  },
  {
    name: "Sandtex Trade Smooth",
    image: product,
    orders: 185000,
    status: "Stock",
    price: "₦9,500,000.00",
  },
  {
    name: "Sandtex VME",
    image: product,
    orders: 100000,
    status: "Stock",
    price: "₦2,050,000.00",
  },
  {
    name: "Caplux Weathershield",
    image: product,
    orders: 80000,
    status: "Out of Stock",
    price: "₦7,530,000.00",
  },
  {
    name: "Dulux Weathershield",
    image: product,
    orders: 50000,
    status: "Stock",
    price: "₦1,093,000.00",
  },
  {
    name: "Dulux Vinyl Silk",
    image: product,
    orders: 20000,
    status: "Stock",
    price: "₦8,000,000.00",
  },
];

const BestSellingTable = () => {
  return (
    <div className="bg-white p-4 rounded-xl shadow-md overflow-x-auto">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Best Selling Products</h3>
        <div className="space-x-2">
          {["Daily", "Weekly", "Monthly", "Yearly"].map((label) => (
            <button
              key={label}
              className={`text-sm px-3 py-1 rounded-full ${
                label === "Daily" ? "bg-[#0B0F28] text-white" : "bg-[#F8F8F8]"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block w-full min-w-[800px]">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left border-b">
              <th className="py-2">Product</th>
              <th className="py-2">Total Orders</th>
              <th className="py-2">Status</th>
              <th className="py-2">Price</th>
              <th className="py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, idx) => (
              <tr key={idx} className="border-b hover:bg-gray-50">
                <td className="flex items-center gap-3 py-2">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-10 h-10 rounded"
                  />
                  <span>{product.name}</span>
                </td>
                <td>{product.orders.toLocaleString()}</td>
                <td>
                  <span
                    className={`text-xs font-medium flex items-center gap-1 ${
                      product.status === "Stock"
                        ? "text-green-600"
                        : "text-red-500"
                    }`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full ${
                        product.status === "Stock"
                          ? "bg-green-500"
                          : "bg-red-500"
                      }`}
                    ></span>
                    {product.status}
                  </span>
                </td>
                <td>{product.price}</td>
                <td>
                  <button className="text-gray-600 hover:text-black">
                    <FaEye />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile View Cards */}
      <div className="block md:hidden space-y-4">
        {products.map((product, idx) => (
          <div key={idx} className="border rounded-lg p-3 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <img
                src={product.image}
                alt={product.name}
                className="w-10 h-10 rounded"
              />
              <div>
                <p className="text-sm font-medium">{product.name}</p>
                <p className="text-xs text-gray-500">
                  Orders: {product.orders.toLocaleString()}
                </p>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <span
                  className={`text-xs font-medium flex items-center gap-1 ${
                    product.status === "Stock"
                      ? "text-green-600"
                      : "text-red-500"
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      product.status === "Stock" ? "bg-green-500" : "bg-red-500"
                    }`}
                  ></span>
                  {product.status}
                </span>
                <p className="text-sm font-semibold">{product.price}</p>
              </div>
              <button className="text-gray-600 hover:text-black">
                <FaEye />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BestSellingTable;

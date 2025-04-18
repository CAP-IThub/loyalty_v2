import React, { useState } from "react";
import { FaSearch, FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { MdPerson } from "react-icons/md";

const paintersData = [
  {
    id: 352,
    name: "Test Painter",
    phone: "08012345678",
    address: "",
    gender: "Male",
  },
  {
    id: 351,
    name: "oludayo Ajala",
    phone: "07038477786",
    address: "Ogudu, Lagos",
    gender: "Male",
  },
  {
    id: 350,
    name: "YUSUF ADIO",
    phone: "0810 403 5384",
    address: "",
    gender: "Male",
  },
  {
    id: 349,
    name: "YUSUF BALOGUN",
    phone: "0803 313 0240",
    address: "",
    gender: "Male",
  },
  {
    id: 348,
    name: "YEMI OWOLABI",
    phone: "0802 813 9361",
    address: "",
    gender: "Male",
  },
  {
    id: 347,
    name: "YELE AKINDIYO",
    phone: "0806 238 5819",
    address: "",
    gender: "Male",
  },
];

const PainterRow = ({ painter, index }) => (
  <tr className={index % 2 === 1 ? "bg-gray-100" : ""}>
    <td className="py-3 px-4 text-sm font-medium">{painter.id}</td>
    <td className="py-3 px-4 text-sm capitalize">{painter.name}</td>
    <td className="py-3 px-4 text-sm">{painter.phone}</td>
    <td className="py-3 px-4 text-sm">{painter.address || "—"}</td>
    <td className="py-3 px-4 text-sm">{painter.gender}</td>
    <td className="py-3 px-4 text-center">
      <MdPerson size={24} className="text-[#2E2E2E]" />
    </td>
    <td className="py-3 px-4 space-x-2">
      <button className="text-blue-600 hover:text-blue-800">
        <FaEye />
      </button>
      <button className="text-green-600 hover:text-green-800">
        <FaEdit />
      </button>
      <button className="text-red-600 hover:text-red-800">
        <FaTrash />
      </button>
    </td>
  </tr>
);

const Centers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [perPage, setPerPage] = useState(10);

  const filteredPainters = paintersData.filter((painter) =>
    painter.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center pt-[2rem]">
        <button className="bg-[#0B0F28] text-white px-6 py-2 rounded-full shadow font-medium">
          Add Center
        </button>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md">
        {/* <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-[#0B0F28]">Painters</h2>
          <span className="text-lg font-semibold text-[#0B0F28]">
            {paintersData.length}
          </span>
        </div> */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
          <div className="relative w-full md:max-w-sm">
            <input
              type="text"
              placeholder="Search table"
              className="w-full border border-gray-300 rounded-full px-4 py-2 pl-10 text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-600">No. of Column</label>
            <select
              value={perPage}
              onChange={(e) => setPerPage(Number(e.target.value))}
              className="border border-gray-300 px-3 py-2 rounded-full text-sm"
            >
              {[5, 10, 20, 50].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-t">
            <thead className="bg-[#eef4fa] text-gray-700 font-semibold">
              <tr>
                <th className="py-3 px-4">ID</th>
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">Phone</th>
                <th className="py-3 px-4">Address</th>
                <th className="py-3 px-4">Gender</th>
                <th className="py-3 px-4 text-center">Image</th>
                <th className="py-3 px-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredPainters.slice(0, perPage).map((painter, index) => (
                <PainterRow key={painter.id} painter={painter} index={index} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Centers;

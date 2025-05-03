import React, { useEffect, useState, Fragment } from "react";
import axios from "../../../../utils/axiosInstance";
import { FaSearch, FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { HiDotsVertical } from "react-icons/hi";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { MdAssignmentTurnedIn } from "react-icons/md";
import Pagination from "../../../../components/Pagination";
import AddPainterCategoryModal from "../../../../adminComponents/modals/settingsModals/painterCategoryModal/AddPainterCategoryModal";
import EditPainterCategoryModal from "../../../../adminComponents/modals/settingsModals/painterCategoryModal/EditPainterCategoryModal";
import DeletePainterCategoryModal from "../../../../adminComponents/modals/settingsModals/painterCategoryModal/DeletePainterCategoryModal";
import PainterCategoryModal from "../../../../adminComponents/modals/settingsModals/painterCategoryModal/PainterCategoryModal";
import { ClipLoader } from "react-spinners";

const PainterCategory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [isModalOpen3, setIsModalOpen3] = useState(false);
  const [isModalOpen4, setIsModalOpen4] = useState(false);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/v2/paintercategory");
      const formatted = res.data.data.data.map((item) => ({
        id: item.id,
        name: item.name,
        description: item.description,
        created_at: item.created_at,
        updated_at: item.updated_at,
        serial_num: item.serial_num,
      }));
      setCategories(formatted);
    } catch (err) {
      console.error("Failed to fetch categories", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const filtered = categories.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginated = filtered.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  const openModal = (category) => {
    setSelectedCategory(category);
    setIsModalOpen(true);
  };

  const openEditModal = (category) => {
    setSelectedCategory(category);
    setIsModalOpen2(true);
  };

  const openDeleteModal = (category) => {
    setSelectedCategory(category);
    setIsModalOpen3(true);
  };

  const onUpdate = () => fetchCategories();
  const onDelete = () => fetchCategories();

  return (
    <div className="pb-6 px-2 space-y-3">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
        <h2 className="md:text-lg font-semibold">Painter Categories</h2>
        <div className="flex gap-4 flex-wrap">
          <div className="relative w-[100px] md:w-[350px]">
            <input
              type="text"
              placeholder="Search by name..."
              className="w-full border border-gray-300 rounded-md px-4 py-2 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-[#FC7B00]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
          <select
            id="rows"
            className="border border-gray-300 px-3 py-2 rounded-md text-sm focus:outline-none"
            value={perPage}
            onChange={(e) => setPerPage(Number(e.target.value))}
          >
            {[5, 10, 20, 50].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
          <button
            className="flex items-center gap-2 bg-[#FC7B00] text-white rounded-md px-4 py-2 text-sm hover:opacity-90"
            onClick={() => setIsModalOpen4(true)}
          >
            <MdAssignmentTurnedIn size={16} /> Add Category
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-10">
          <ClipLoader size={30} color="#0B1C39" />
        </div>
      ) : (
        <>
          <div className="hidden md:block overflow-x-auto border border-gray-200 rounded-xl">
            <table className="w-full text-sm whitespace-nowrap">
              <thead className="bg-gray-100 text-gray-600 text-xs uppercase tracking-wide">
                <tr>
                  <th className="text-left px-3 py-4 border-b">S/N</th>
                  <th className="text-left px-3 py-4 border-b">Name</th>
                  <th className="text-left px-3 py-4 border-b">Description</th>
                  <th className="text-left px-3 py-4 border-b">View</th>
                  <th className="text-left px-3 py-4 border-b"></th>
                </tr>
              </thead>
              <tbody>
                {paginated.map((category) => (
                  <tr
                    key={category.id}
                    className="bg-white border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="px-3 py-4">{category.serial_num}</td>
                    <td className="px-3 py-4">{category.name}</td>
                    <td className="px-3 py-4">{category.description}</td>
                    <td className="px-3 py-4">
                      <button
                        className="text-blue-600"
                        onClick={() => openModal(category)}
                      >
                        <FaEye />
                      </button>
                    </td>
                    <td className="px-6 py-4 relative">
                      <Menu
                        as="div"
                        className="relative inline-block text-left"
                      >
                        <MenuButton className="text-gray-600 hover:text-gray-800">
                          <HiDotsVertical />
                        </MenuButton>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="opacity-100 scale-100"
                          leaveTo="opacity-0 scale-95"
                        >
                          <MenuItems className="absolute right-3 bottom-0 mt-2 w-28 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                            <div className="py-1 flex flex-col">
                              <MenuItem>
                                {({ active }) => (
                                  <button
                                    onClick={() => openEditModal(category)}
                                    className={`${
                                      active ? "bg-gray-100" : ""
                                    } flex justify-between items-center w-full px-4 py-2 text-sm text-gray-700`}
                                  >
                                    Edit <FaEdit className="ml-2" />
                                  </button>
                                )}
                              </MenuItem>
                              <MenuItem>
                                {({ active }) => (
                                  <button
                                    onClick={() => openDeleteModal(category)}
                                    className={`${
                                      active ? "bg-gray-100" : ""
                                    } flex justify-between items-center w-full px-4 py-2 text-sm text-red-600`}
                                  >
                                    Delete <FaTrash className="ml-2" />
                                  </button>
                                )}
                              </MenuItem>
                            </div>
                          </MenuItems>
                        </Transition>
                      </Menu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="md:hidden space-y-4">
            {paginated.map((category) => (
              <div
                key={category.id}
                className="border border-gray-200 rounded-lg p-4 shadow-md bg-white"
              >
                <div className="mb-2 font-semibold text-[#0B0F28] text-base">
                  {category.name}
                </div>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>
                    <span className="font-semibold">Description:</span>{" "}
                    {category.description}
                  </p>
                </div>
                <div className="flex justify-end gap-3 mt-3">
                  <button
                    className="text-blue-600 hover:text-blue-800"
                    onClick={() => openModal(category)}
                  >
                    <FaEye />
                  </button>
                  <button
                    className="text-green-600 hover:text-green-800"
                    onClick={() => openEditModal(category)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="text-red-600 hover:text-red-800"
                    onClick={() => openDeleteModal(category)}
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(filtered.length / perPage)}
            onPageChange={setCurrentPage}
            totalEntries={filtered.length}
            perPage={perPage}
          />
        </>
      )}

      <PainterCategoryModal
        isOpen={isModalOpen}
        closeCategoryModal={() => setIsModalOpen(false)}
        category={selectedCategory}
      />
      <EditPainterCategoryModal
        isOpen={isModalOpen2}
        closeCategoryModal={() => setIsModalOpen2(false)}
        category={selectedCategory}
        onUpdate={onUpdate}
      />
      <DeletePainterCategoryModal
        isOpen={isModalOpen3}
        closeDeleteModal={() => setIsModalOpen3(false)}
        category={selectedCategory}
        onDelete={onDelete}
      />
      <AddPainterCategoryModal
        isOpen={isModalOpen4}
        closeCategoryModal={() => setIsModalOpen4(false)}
        onUpdate={onUpdate}
      />
    </div>
  );
};

export default PainterCategory;

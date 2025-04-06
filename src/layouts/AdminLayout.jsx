import React from "react";
import AdminSidebar from "../adminComponents/AdminSidebar";

const AdminLayout = ({ children }) => {
  return (
    <div className="w-full flex h-screen">
      <AdminSidebar />
      <main className="flex-1 pt-20 px-4 pb-4 md:pt-0 md:px-3 overflow-y-auto h-screen">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;

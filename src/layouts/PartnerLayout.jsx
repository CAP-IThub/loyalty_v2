import React from "react";
import PartnerSidebar from "../partnerComponents/PartnerSidebar";

const PartnerLayout = ({ children }) => {
  return (
    <div className="w-full flex h-screen">
      <PartnerSidebar />
      <main className="flex-1 pt-20 px-4 pb-4 md:pt-0 md:px-3 overflow-y-auto h-screen">
        {children}
      </main>
    </div>
  );
};

export default PartnerLayout;

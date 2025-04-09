import React from "react";
import RepSidebar from "../repComponents/RepSidebar";

const RepLayout = ({ children }) => {
  return (
    <div className="w-full flex h-screen">
      <RepSidebar />
      <main className="flex-1 pt-20 px-4 pb-4 md:pt-0 md:px-3 overflow-y-auto h-screen">
        {children}
      </main>
    </div>
  );
};

export default RepLayout;

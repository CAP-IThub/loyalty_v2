import React from "react";
import { Routes, Route } from "react-router-dom";
import SettingsLayout from "./SettingsLayout";
import LoyaltyCampaigns from "./tabs/LoyaltyCampaigns";
import LoyaltyTierLevels from "./tabs/LoyaltyTierLevels";
import PainterCategory from "./tabs/PainterCategory";

const Settings = () => {
  return (
    <Routes>
      <Route path="/" element={<SettingsLayout />}>
        <Route index element={<LoyaltyCampaigns />} />
        <Route path="loyalty-campaigns" element={<LoyaltyCampaigns />} />
        <Route path="loyalty-tier-levels" element={<LoyaltyTierLevels />} />
        <Route path="painter-category" element={<PainterCategory />} />
      </Route>
    </Routes>
  );
};

export default Settings;

import React from "react";
import { Routes, Route } from "react-router-dom";
import ReconciliationToolLayout from "./ReconciliationToolLayout";
import Transactions from "./tabs/Transactions";
import Claims from "./tabs/Claims";
import Account from "./tabs/Account";
import Payouts from "./tabs/Payouts";


const ReconciliationTool = () => {
  return (
    <Routes>
      <Route path="/" element={<ReconciliationToolLayout />}>
        <Route index element={<Transactions />} />
        <Route path="transactions" element={<Transactions />} />
        <Route path="claims" element={<Claims />} />
        <Route path="account" element={<Account />} />
        <Route path="payouts" element={<Payouts />} />
      </Route>
    </Routes>
  );
};

export default ReconciliationTool;

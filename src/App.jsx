import { Navigate, Route, Routes } from "react-router-dom";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import { Toaster } from "react-hot-toast";
import WelcomePage from "./pages/WelcomePage";
import AdminLayout from "./layouts/AdminLayout";
import AdminDashboard from "./pages/ADMIN/AdminDashboard";
import RepDashboard from "./pages/REP/RepDashboard";
import RepLayout from "./layouts/RepLayout";
import PartnerLayout from "./layouts/PartnerLayout";
import PartnerDashboard from "./pages/PARTNER/PartnerDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminLogin from "./pages/ADMIN/AdminLogin";
import RecentActivityPage from "./pages/ADMIN/RecentActivityPage";
import AwardedTransactions from "./pages/ADMIN/AwardedTransactions";
import ClaimedTransactions from "./pages/ADMIN/ClaimedTransactions";
import Painters from "./pages/ADMIN/Painters";
import Centers from "./pages/ADMIN/Centers";
import Partners from "./pages/ADMIN/Partners";
import Reps from "./pages/ADMIN/Reps";
import Roles from "./pages/ADMIN/Roles";
import Admins from "./pages/ADMIN/Admins";
import Settings from "./pages/ADMIN/settings/Settings";
import ReconciliationTool from "./pages/ADMIN/reconciliationTool/ReconciliationTool";
import AuditTrail from "./pages/ADMIN/AuditTrail";
import ChangePassword from "./pages/ADMIN/SetNewPassword";
import SetNewPassword from "./pages/ADMIN/SetNewPassword";
import PainterRegister from "./pages/PAINTER/PainterRegister";
import PainterLogin from "./pages/PAINTER/PainterLogin";
import PainterLayout from "./layouts/PainterLayout";
import PainterDashboard from "./pages/PAINTER/PainterDashboard";
import Invoices from "./pages/PAINTER/Invoices";
import Purchases from "./pages/PAINTER/Purchases";
import Claims from "./pages/PAINTER/Claims";
import BankDetails from "./pages/PAINTER/BankDetails";
import Support from "./pages/PAINTER/Support";
import RedeemPoints from "./pages/PAINTER/RedeemPoints";
import PainterProfile from "./pages/ADMIN/PainterProfile";
import NotFoundPage from "./pages/NotFoundPage";
import PartnerCenterDetails from "./pages/PARTNER/PartnerCenterDetails";
import Points from "./pages/PARTNER/Points";
import ClaimsReport from "./pages/PARTNER/Claims";

function App() {
  return (
    <div>
      {/* <ToastContainer /> */}
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          success: {
            style: {
              background: "green",
              color: "white",
            },
          },
          error: {
            style: {
              background: "red",
              color: "white",
            },
          },
        }}
      />
      <Routes>
        <Route path="/rep-login" element={<WelcomePage />} />
        <Route path="/partner-login" element={<WelcomePage />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/painter-register" element={<PainterRegister />} />
        <Route path="/" element={<PainterLogin />} />

        {/* Admin Dashboard Routes */}
        <Route
          path="/admin"
          element={
            <AdminLayout>
              <AdminDashboard />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/activities"
          element={
            <AdminLayout>
              <RecentActivityPage />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/awarded-transactions"
          element={
            <AdminLayout>
              <AwardedTransactions />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/claimed-transactions"
          element={
            <AdminLayout>
              <ClaimedTransactions />
            </AdminLayout>
          }
        />
        <Route
          path="/awarded-transactions"
          element={
            <AdminLayout>
              <AwardedTransactions />
            </AdminLayout>
          }
        />
        <Route
          path="/painters"
          element={
            <AdminLayout>
              <Painters />
            </AdminLayout>
          }
        />
        <Route
          path="/partners"
          element={
            <AdminLayout>
              <Partners />
            </AdminLayout>
          }
        />
        <Route
          path="/centers"
          element={
            <AdminLayout>
              <Centers />
            </AdminLayout>
          }
        />
        <Route
          path="/reps"
          element={
            <AdminLayout>
              <Reps />
            </AdminLayout>
          }
        />
        <Route
          path="/roles"
          element={
            <AdminLayout>
              <Roles />
            </AdminLayout>
          }
        />
        <Route
          path="/admins"
          element={
            <AdminLayout>
              <Admins />
            </AdminLayout>
          }
        />
        <Route
          path="/settings/*"
          element={
            <AdminLayout>
              <Settings />
            </AdminLayout>
          }
        />
        <Route
          path="/reconciliation-tool/*"
          element={
            <AdminLayout>
              <ReconciliationTool />
            </AdminLayout>
          }
        />
        <Route
          path="/auditlogs"
          element={
            <AdminLayout>
              <AuditTrail />
            </AdminLayout>
          }
        />
        <Route
          path="/painters/:id"
          element={
            <AdminLayout>
              <PainterProfile />
            </AdminLayout>
          }
        />
        <Route path="/admin/set-new-password" element={<SetNewPassword />} />
        <Route path="/painter/set-new-password" element={<SetNewPassword />} />

        {/* Painter Dashboard Routes */}
        <Route
          path="/painter-dashboard"
          element={
            <PainterLayout>
              <PainterDashboard />
            </PainterLayout>
          }
        />

        <Route
          path="/redeem-points"
          element={
            <PainterLayout>
              <RedeemPoints />
            </PainterLayout>
          }
        />

        <Route
          path="/invoices"
          element={
            <PainterLayout>
              <Invoices />
            </PainterLayout>
          }
        />

        <Route
          path="/purchases"
          element={
            <PainterLayout>
              <Purchases />
            </PainterLayout>
          }
        />

        <Route
          path="/claims"
          element={
            <PainterLayout>
              <Claims />
            </PainterLayout>
          }
        />

        <Route
          path="/bank-details"
          element={
            <PainterLayout>
              <BankDetails />
            </PainterLayout>
          }
        />

        <Route
          path="/support"
          element={
            <PainterLayout>
              <Support />
            </PainterLayout>
          }
        />

        {/* Rep Dashboard Routes */}
        <Route
          path="/rep"
          element={
            <ProtectedRoute allowedTypes={["rep"]}>
              <RepLayout>
                <RepDashboard />
              </RepLayout>
            </ProtectedRoute>
          }
        />
        {/* Partner Dashboard Routes */}
        <Route
          path="/partner"
          element={
            <ProtectedRoute allowedTypes={["partner"]}>
              <PartnerLayout>
                <PartnerDashboard />
              </PartnerLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/partner/center/:id"
          element={
            <ProtectedRoute allowedTypes={["partner"]}>
              <PartnerLayout>
                <PartnerCenterDetails />
              </PartnerLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/points"
          element={
            <ProtectedRoute allowedTypes={["partner"]}>
              <PartnerLayout>
                <Points />
              </PartnerLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/claims-report"
          element={
            <ProtectedRoute allowedTypes={["partner"]}>
              <PartnerLayout>
                <ClaimsReport />
              </PartnerLayout>
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;

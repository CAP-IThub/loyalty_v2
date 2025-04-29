import { Navigate, Route, Routes } from "react-router-dom";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import { Toaster } from "react-hot-toast";
import WelcomePage from "./pages/WelcomePage";
import Orders from "./pages/ADMIN/Orders";
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
        <Route path="/" element={<WelcomePage />} />
        <Route path="/admin-login" element={<AdminLogin />} />
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
          path="/orders"
          element={
            <AdminLayout>
              <Orders />
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
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;

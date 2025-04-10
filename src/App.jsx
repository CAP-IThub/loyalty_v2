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
import PartnerLayout from "./layouts/partnerLayout";
import PartnerDashboard from "./pages/PARTNER/PartnerDashboard";
import ProtectedRoute from "./components/ProtectedRoute";

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

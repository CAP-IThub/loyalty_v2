import { Navigate, Route, Routes } from "react-router-dom";
import WelcomePage from "./pages/WelcomePage";
import Dashboard from "./pages/ADMIN/AdminDashboard";
import Orders from "./pages/ADMIN/Orders";
import AdminRoute from "./layouts/AdminLayout";
import AdminLayout from "./layouts/AdminLayout";
import AdminDashboard from "./pages/ADMIN/AdminDashboard";
import RepDashboard from "./pages/REP/RepDashboard";
import RepLayout from "./layouts/RepLayout";
function App() {
  return (
    <div>
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
            <RepLayout>
              <RepDashboard />
            </RepLayout>
          }
        />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;

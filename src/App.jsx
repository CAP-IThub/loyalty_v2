import { Navigate, Route, Routes } from "react-router-dom";
import WelcomePage from "./pages/WelcomePage";
import Dashboard from "./pages/ADMIN/AdminDashboard";
import Orders from "./pages/ADMIN/Orders";
import AdminRoute from "./layouts/AdminLayout";
import AdminLayout from "./layouts/AdminLayout";
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
              <Dashboard />
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

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;

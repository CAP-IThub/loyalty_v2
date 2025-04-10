// components/ProtectedRoute.jsx
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedTypes }) => {
  const { token, user_type } = useSelector((state) => state.auth);

  if (!token) {
    return <Navigate to="/" replace />;
  }

  if (!allowedTypes.includes(user_type)) {
    return <Navigate to={`/${user_type}`} replace />;
  }

  return children;
};

export default ProtectedRoute;

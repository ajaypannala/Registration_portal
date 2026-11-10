import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  let user = null;

  try {
    user = JSON.parse(localStorage.getItem("user") || "null");
  } catch {
    localStorage.removeItem("user");
  }

  return user && typeof user === "object"
    ? children
    : <Navigate to="/login" replace />;
};

export default ProtectedRoute;

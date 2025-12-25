import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const isAuth = !!localStorage.getItem("user");

  return isAuth ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;

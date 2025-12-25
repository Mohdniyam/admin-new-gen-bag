import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface PublicRouteProps {
  children: ReactNode;
}

const PublicRoute = ({ children }: PublicRouteProps) => {
  const isAuth = !!localStorage.getItem("user");

  return isAuth ? <Navigate to="/admin" /> : children;
};

export default PublicRoute;

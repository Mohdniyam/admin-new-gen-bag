import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface PublicRouteProps {
  children: ReactNode;
}

const PublicRoute = ({ children }: PublicRouteProps) => {
  const token = localStorage.getItem("token");
  const userData = localStorage.getItem("loggedInUser");

  if (token && userData) {
    const user = JSON.parse(userData);

    const roleRoutes: Record<string, string> = {
      SUPER_ADMIN: "/super-admin",
      SUPPLIER: "/supplier",
      CUSTOMER: "/",
    };

    return <Navigate to={roleRoutes[user.role]} replace />;
  }

  return <>{children}</>;
};

export default PublicRoute;

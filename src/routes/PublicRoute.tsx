import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }: { children: JSX.Element }) => {
  const isAuth = !!localStorage.getItem("user");

  return isAuth ? <Navigate to="/admin" replace /> : children;
};

export default PublicRoute;

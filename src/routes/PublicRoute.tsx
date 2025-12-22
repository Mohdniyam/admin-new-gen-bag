import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const isAuth = !!localStorage.getItem("user");

  return isAuth ? <Navigate to="/admin" /> : children;
};

export default PublicRoute;

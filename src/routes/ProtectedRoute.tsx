import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const isAuth = !!localStorage.getItem("user");

  return isAuth ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;

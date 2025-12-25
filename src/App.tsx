import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";
import AdminPage from "@/adminPage/adminPage";
import SignUp from "./screens/SignUp";
import SignIn from "./screens/SignIn";
import { ToastContainer } from "react-toastify";
import Profile from "./screens/Profile";
import ProtectedRouteLayout from "./components/layout/ProtectedRouteLayout";
import Setting from "./screens/Setting";
import ManageOrders from "./features/orders/OrdersPage";

export function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* Public Routes (BLOCK if logged in) */}
          <Route
            path="/"
            element={
              <PublicRoute>
                <SignIn />
              </PublicRoute>
            }
          />

          <Route
            path="/login"
            element={
              <PublicRoute>
                <SignIn />
              </PublicRoute>
            }
          />

          <Route
            path="/signup"
            element={
              <PublicRoute>
                <SignUp />
              </PublicRoute>
            }
          />

          {/* Private Routes */}
          <Route
            element={
              <ProtectedRoute>
                <ProtectedRouteLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/orders" element={<ManageOrders />}>
              <Route path=":status" element={<ManageOrders />} />
            </Route>
            <Route path="/settings" element={<Setting />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer autoClose={1000} />
    </div>
  );
}

export default App;

// routes/admin.routes.tsx
import { type RouteObject } from "react-router-dom";
import ProtectedRoute from "../routes/ProtectedRoute";
import SuperAdminLayout from "../layout/SuperAdminLayout";
import SuperAdminDashboard from "../screens/AdminDashboard/SuperAdminDashboard";
import PendingProducts from "../screens/AdminDashboard/components/PendingProducts";

export const adminRoutes: RouteObject[] = [
  {
    path: "/super-admin",
    element: (
      <ProtectedRoute allowedRoles={["SUPER_ADMIN"]}>
        <SuperAdminLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <SuperAdminDashboard />,
      },
      {
        path: "pending-products",
        element: <PendingProducts />,
      },
    ],
  },
];

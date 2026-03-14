// routes/supplier.routes.tsx
import { type RouteObject } from "react-router-dom";
import ProtectedRoute from "../routes/ProtectedRoute";
import SupplierLayout from "../layout/SupplierLayout";
import SupplierDashboard from "../screens/Supplier/SupplierDashboard";
import SupplierManageInventory from "../screens/Supplier/SupplierManageInventory";
import SupplierProfile from "../screens/Supplier/SupplierProfile";

export const supplierRoutes: RouteObject[] = [
  {
    path: "/supplier",
    element: (
      <ProtectedRoute allowedRoles={["SUPPLIER"]}>
        <SupplierLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "dashboard",
        element: <SupplierDashboard />,
      },
      {
        path: "inventory",
        element: <SupplierManageInventory />,
      },
      {
        path: "profile",
        element: <SupplierProfile />,
      },
    ],
  },
];

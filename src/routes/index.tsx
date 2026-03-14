// routes/index.ts
import { type RouteObject } from "react-router-dom";
import { publicRoutes } from "./public.routes";
import { adminRoutes } from "./admin.routes";
import { supplierRoutes } from "./supplier.routes";
import { Navigate } from "react-router-dom";

export const appRoutes: RouteObject[] = [
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  ...publicRoutes,
  ...adminRoutes,
  ...supplierRoutes,
];

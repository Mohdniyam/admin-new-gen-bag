// routes/public.routes.tsx
import { type RouteObject } from "react-router-dom";
import PublicRoute from "../routes/PublicRoute";
import SignIn from "../screens/SignIn";
import SignUp from "../screens/SignUp";

export const publicRoutes: RouteObject[] = [
  {
    path: "/login",
    element: (
      <PublicRoute>
        <SignIn />
      </PublicRoute>
    ),
  },
  {
    path: "/signup",
    element: (
      <PublicRoute>
        <SignUp />
      </PublicRoute>
    ),
  },
];

import { NavLink } from "react-router-dom";
import { LayoutDashboard, ShoppingCart, Box } from "lucide-react";

const AdminSidebar = () => {
  return (
    <aside className="w-64 bg-white min-h-screen p-4 border border-r">
      <h2 className="text-black/80 font-semibold mb-6">Admin Panel</h2>

      <nav className="flex flex-col gap-2">
        <NavLink
          to="/super-admin"
          end
          className={({ isActive }) =>
            `flex items-center gap-2 px-3 py-2 rounded-md text-sm ${
              isActive
                ? "bg-blue-100 text-blue-600 font-medium"
                : "text-gray-600 hover:bg-gray-100"
            }`
          }
        >
          <LayoutDashboard className="w-4 h-4" />
          Dashboard
        </NavLink>

        <NavLink
          to="/super-admin/pending-products"
          end
          className={({ isActive }) =>
            `flex items-center gap-2 px-3 py-2 rounded-md text-sm ${
              isActive
                ? "bg-blue-100 text-blue-600 font-medium"
                : "text-gray-600 hover:bg-gray-100"
            }`
          }
        >
          <Box className="w-4 h-4" />
          Products
        </NavLink>

        <NavLink
          to="/super-admin/orders"
          className={({ isActive }) =>
            `flex items-center gap-2 px-3 py-2 rounded-md text-sm ${
              isActive
                ? "bg-blue-100 text-blue-600 font-medium"
                : "text-gray-600 hover:bg-gray-100"
            }`
          }
        >
          <ShoppingCart className="w-4 h-4" />
          Orders
        </NavLink>
      </nav>
    </aside>
  );
};

export default AdminSidebar;

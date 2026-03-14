import { NavLink } from "react-router-dom";
import {
  Boxes,
  CircleUserRound,
  LayoutDashboard,
  ShoppingCart,
} from "lucide-react";

const SupplierSidebar = () => {
  // ClassNames as a Variable
  const baseClasses = `flex items-center gap-2 text-foreground px-4 py-2 rounded 
  border-l-4 border-transparent hover:font-semibold`;
  const activeClasses = "bg-gray-200 font-semibold";
  const inactiveClasses = "hover:border-black hover:bg-white";
  return (
    <aside className="w-64 min-h-screen border-r p-2">
      {/* <h2 className="text-black/80 font-semibold mb-6">Supplier Panel</h2> */}

      <nav className="flex flex-col gap-2">
        <NavLink
          to="/supplier/dashboard"
          end
          className={({ isActive }) =>
            `${baseClasses} ${
              isActive ? `${activeClasses}` : `${inactiveClasses}`
            }`
          }
        >
          <LayoutDashboard className="w-4 h-4" />
          Dashboard
        </NavLink>

        <NavLink
          to="/supplier/inventory"
          className={({ isActive }) =>
            `${baseClasses} ${
              isActive ? `${activeClasses}` : `${inactiveClasses}`
            }`
          }
        >
          <Boxes strokeWidth={1.25} className="w-4 h-4" />
          Manage Inventory
        </NavLink>

        <NavLink
          to="/supplier/profile"
          className={({ isActive }) =>
            `${baseClasses} ${
              isActive ? `${activeClasses}` : `${inactiveClasses}`
            }`
          }
        >
          <CircleUserRound className="w-4 h-4" />
          Profile
        </NavLink>

        <NavLink
          to="/supplier/orders"
          className={({ isActive }) =>
            `${baseClasses} ${
              isActive ? `${activeClasses}` : `${inactiveClasses}`
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

export default SupplierSidebar;

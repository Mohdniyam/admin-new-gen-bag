import { Link } from "react-router-dom";
import { FiSettings } from "react-icons/fi";
import { FaUserCircle, FaUserShield } from "react-icons/fa";
import { LuBox } from "react-icons/lu";

const SideBar = () => {
  return (
    <aside className="w-60 min-h-screen bg-[#f2f2f2]">
      <nav className="p-4 space-y-2">
        <h2 className="text-lg text-foreground font-semibold mb-4">
          Admin Panel
        </h2>

        <Link
          to="/admin"
          className="flex items-center gap-2 text-foreground px-4 py-2 rounded
             border-l-4 border-transparent
             hover:border-black hover:bg-white"
        >
          <FaUserShield className="text-2xl" />
          <span className="whitespace-nowrap">Admin</span>
        </Link>

        <Link
          to="/manage-product"
          className="flex items-center gap-2 text-foreground px-4 py-2 rounded
             border-l-4 border-transparent
             hover:border-black hover:bg-white"
        >
          <LuBox className="text-2xl" />
          <span className="whitespace-nowrap">Manage Products</span>
        </Link>

        <Link
          to="/profile"
          className="flex items-center gap-2 text-foreground px-4 py-2 rounded
             border-l-4 border-transparent
             hover:border-black hover:bg-white"
        >
          <FaUserCircle className="text-2xl" />
          <span className="whitespace-nowrap">Profile</span>
        </Link>

        <Link
          to="/settings"
          className="flex items-center gap-2 text-foreground px-4 py-2 rounded
             border-l-4 border-transparent
             hover:border-black hover:bg-white"
        >
          <FiSettings className="text-2xl" />
          <span className="whitespace-nowrap">Setting</span>
        </Link>
      </nav>
    </aside>
  );
};

export default SideBar;

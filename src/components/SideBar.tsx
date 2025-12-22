import { Link } from "react-router-dom";

const SideBar = () => {
  return (
    <aside className="w-64 min-h-screen bg-[#f2f2f2]">
      <nav className="p-4 space-y-2">
        <h2 className="text-lg text-foreground font-semibold mb-4">
          Admin Panel
        </h2>

        <Link
          to="/manage-product"
          className="block text-foreground px-4 py-2 rounded border-black hover:border-l-4 hover:bg-white "
        >
          Manage Product
        </Link>

        <Link
          to="/admin"
          className={`block text-foreground px-4 py-2 rounded border-black hover:border-l-4 hover:bg-white`}
        >
          Admin
        </Link>

        <Link
          to="/profile"
          className={`block text-foreground px-4 py-2 rounded border-black hover:border-l-4 hover:bg-white`}
        >
          Profile
        </Link>

        <Link
          to="/settings"
          className={`block text-foreground px-4 py-2 rounded border-black hover:border-l-4 hover:bg-white`}
        >
          Setting
        </Link>
      </nav>
    </aside>
  );
};

export default SideBar;

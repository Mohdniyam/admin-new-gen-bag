import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown, CircleUserRound, ShoppingBag } from "lucide-react";

const AdminHeader = () => {
  const navigate = useNavigate();

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const userMenuRef = useRef<HTMLDivElement>(null);

  const [userInfo] = useState<{
    email: string | null;
    role: string | null;
  }>(() => {
    const userData = localStorage.getItem("loggedInUser");
    if (!userData) return { email: null, role: null };

    const user = JSON.parse(userData);

    return {
      email: user.email || null,
      role: user.role || null,
    };
  });

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    navigate("/login");
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      {/* Left Section */}
      <div className="flex gap-4 items-center">
        <div className="flex w-10 h-10 items-center justify-center rounded-xl bg-blue-100">
          <ShoppingBag className="h-6 w-6 text-blue-600" />
        </div>

        <div>
          <h1 className="font-bold">
            {userInfo.role === "SUPER_ADMIN"
              ? "NewGee Bags for Admin"
              : userInfo.role === "SUPPLIER"
                ? "NewGee Bags for Supplier"
                : "NewGee Bags"}
          </h1>

          <p className="text-sm text-gray-500">Manage your product inventory</p>
        </div>
      </div>

      {/* Right Section */}
      <div
        className="relative flex items-center gap-2 cursor-pointer"
        ref={userMenuRef}
        onClick={() => {
          const token = localStorage.getItem("token");
          if (!token) {
            navigate("/login");
          } else {
            setIsUserMenuOpen(!isUserMenuOpen);
          }
        }}
      >
        <CircleUserRound className="w-5 h-5" />

        <div className="flex gap-1 items-center">
          <div className="text-sm">
            {userInfo.email ? userInfo.email : "Login"}
          </div>

          <ChevronDown
            className={`h-4 w-4 transition-transform duration-300 ${
              isUserMenuOpen ? "rotate-180" : ""
            }`}
          />
        </div>

        {isUserMenuOpen && (
          <div className="absolute right-0 top-9 bg-white shadow-lg rounded-md w-40 py-2 border">
            <button
              onClick={() => navigate("/profile")}
              className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
            >
              Profile
            </button>

            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-red-500"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default AdminHeader;

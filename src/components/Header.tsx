import { Package } from "lucide-react";
import { FaUserCircle } from "react-icons/fa";
import { TbLogout } from "react-icons/tb";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { IoIosArrowDown } from "react-icons/io";

const Header = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("user");
    // localStorage.removeItem("registeredUser");
    navigate("/login", { replace: true });
    toast.success("Successfully logged out!", { position: "top-center" });
  };

  // Get the username from localStorage
  const storedUser = localStorage.getItem("user");
  const user = JSON.parse(storedUser);
  const userName = user.name;
  return (
    <div className="flex w-full border-b shadow-xl border-border z-20 bg-card h-18 ">
      <div className="container mx-auto px-4 py-4 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100">
          <Package className="h-7 w-7 text-blue-600" />
        </div>
        <div>
          <h1 className="text-lg font-bold text-foreground">
            NewGee Bags Admin
          </h1>
          <p className="text-sm text-muted-foreground">
            Manage your product inventory
          </p>
        </div>
      </div>
      {/* User Profile Button */}
      <div
        className="flex items-center hover:bg-[#f2f2f2] rounded-md cursor-pointer m-4"
        onClick={() => setOpen(!open)}
      >
        {/* Icon */}
        <div className="flex items-center justify-center w-10 h-10 rounded-full text-3xl">
          <FaUserCircle color="gray" />
        </div>

        {/* Username + Arrow */}
        <div className="flex items-center gap-1 text-sm text-gray-700 whitespace-nowrap pr-2">
          {userName}
          <IoIosArrowDown className="" />
        </div>
      </div>
      {/* User Profile Dropdown */}
      {open && (
        <div className="absolute top-18 right-0 mt-0.5 mr-2 w-34 bg-white text-gray-500 rounded-md shadow-lg border">
          <button
            onClick={() => {
              setOpen(false);
              navigate("/profile");
            }}
            className="block w-full px-4 py-2 text-left hover:bg-gray-100 cursor-pointer"
          >
            <span className="flex items-center justify-center text-sm  text-gray-700 gap-1">
              <FaUserCircle className="text-lg " color="gray" /> Profile
            </span>
          </button>

          <button
            onClick={handleLogout}
            className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 cursor-pointer"
          >
            <span className="flex text-sm items-center justify-center  gap-1">
              <TbLogout className="text-lg" color="gray" />
              Logout
            </span>
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;

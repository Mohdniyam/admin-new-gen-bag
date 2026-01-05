import { useLocation, Link } from "react-router-dom";
import { FiBox, FiClipboard, FiSettings } from "react-icons/fi";
import { FaUserCircle, FaUserShield } from "react-icons/fa";
import { LiaUndoAltSolid } from "react-icons/lia";

import type { ComponentType } from "react";
interface SidebarItem {
  label: string;
  path: string;
  icon: ComponentType<{ className?: string }>;
  isActive: (pathname: string) => boolean;
}

const sidebarItems: SidebarItem[] = [
  {
    label: "Admin",
    path: "/admin",
    icon: FaUserShield,
    isActive: (pathname: string) => pathname === "/admin",
  },
  {
    label: "Manage Orders",
    path: "/orders",
    icon: FiClipboard,
    isActive: (pathname: string) => pathname.startsWith("/orders"),
  },
  {
    label: "Manage RTO / Returns",
    path: "/returns",
    icon: LiaUndoAltSolid,
    isActive: (pathname: string) => pathname.startsWith("/return"),
  },
  {
    label: "Manage Inventory",
    path: "/inventory",
    icon: FiBox,
    isActive: (pathname: string) => pathname === "/inventory",
  },
];

// bottom Links
const bottomSidebarItems: SidebarItem[] = [
  {
    label: "Profile",
    path: "/profile",
    icon: FaUserCircle,
    isActive: (pathname: string) => pathname === "/profile",
  },
  {
    label: "Setting",
    path: "/settings",
    icon: FiSettings,
    isActive: (pathname: string) => pathname === "/settings",
  },
];

const SideBar = () => {
  // ClassNames as a Variable
  const baseClasses = `flex items-center gap-2 text-foreground px-4 py-2 rounded 
  border-l-4 border-transparent hover:font-semibold`;
  const activeClasses = "bg-gray-200 font-semibold";
  const inactiveClasses = "hover:border-black hover:bg-white";

  const location = useLocation();

  return (
    <div className="w-70 min-h-screen bg-[#f2f2f2] flex flex-col">
      {/* TOP LINKS  */}
      <nav className="p-4 space-y-2">
        <h2 className="text-lg text-foreground font-semibold mb-4">
          Admin Panel
        </h2>
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.isActive(location.pathname);

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`${baseClasses} ${
                isActive ? activeClasses : inactiveClasses
              }`}
            >
              <Icon className="text-2xl shrink-0" />
              <span className="whitespace-nowrap">{item.label}</span>
            </Link>
          );
        })}
      </nav>
      {/* BOTTOM LINKS */}
      <div className="p-4 space-y-2 fixed bottom-0 left-0 w-70 bg-[#f2f2f2]">
        {bottomSidebarItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.isActive(location.pathname);
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`${baseClasses} ${
                isActive ? activeClasses : inactiveClasses
              }`}
            >
              <Icon className="text-2xl shrink-0" />
              <span className="whitespace-nowrap">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default SideBar;

import { Outlet } from "react-router-dom";
import AdminHeader from "@/components/AdminHeader";
import AdminSidebar from "@/components/AdminSidebar";

const SuperAdminLayout = () => {
  return (
    <div className="h-screen flex flex-col bg-gray-50 overflow-hidden">
      {/* Header */}
      <header className="h-16 bg-white border-b px-6 flex items-center justify-between shrink-0">
        <AdminHeader />
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <AdminSidebar />

        {/* Page Content - Scrollable */}
        <main className="flex-1 px-6 py-4 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default SuperAdminLayout;

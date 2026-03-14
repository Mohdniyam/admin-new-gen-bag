import { Outlet } from "react-router-dom";
import AdminHeader from "@/components/AdminHeader";
import SupplierSidebar from "@/components/SupplierSidebar";

const SupplierLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header - Full Width */}
      <header className="h-16 bg-white border-b px-6 flex items-center justify-between">
        <AdminHeader />
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <SupplierSidebar />

        {/* Page Content */}
        <main className="flex-1 px-6 py-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default SupplierLayout;

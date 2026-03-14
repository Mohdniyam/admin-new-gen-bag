import { SupplierProvider } from "@/context/SupplierContext";
import SupplierTabs from "./components/SupplierTabs";

const SuperAdminDashboard = () => {
  return (
    <div>
      <h1 className="text-black/80 mb-4 ">Admin Dashboard</h1>
      <div>
        <SupplierProvider>
          <SupplierTabs />
        </SupplierProvider>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;

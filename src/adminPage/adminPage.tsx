import { ProductForm } from "@/components/product-form";
import { ProductTable } from "@/components/product-table";
import { Package } from "lucide-react";
import { Toaster } from "@/components/ui/toaster";
import { FaUserCircle } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa6";
import { TbLogout2 } from "react-icons/tb";
import { toast } from "react-toastify";

export default function AdminPage() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/login");
    toast.success("successfully logged out!", { position: "top-center" });
  };
  return (
    <div className="min-h-screen bg-[#fbfaf9]">
      {/* Header */}
      <header className="flex border-b border-border bg-card h-22 ">
        <div className="container mx-auto px-4 py-4 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100">
            <Package className="h-7 w-7 text-blue-600" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-foreground">
              NewGee Bags Admin
            </h1>
            <p className="text-sm text-muted-foreground">
              Manage your product inventory
            </p>
          </div>
        </div>
        <div className="flex justify-center items-center h-full">
          <div className="flex justify-center items-center w-12 h-12 rounded-full mx-4 text-4xl my-2">
            <FaUserCircle
              color="gray"
              className="cursor-pointer"
              onClick={() => setOpen(!open)}
            />
          </div>
        </div>
      </header>
      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 mr-2 w-40 bg-white text-gray-500 rounded-md shadow-lg border">
          <button
            onClick={() => {
              setOpen(false);
              navigate("/profile");
            }}
            className="block w-full px-4 py-2 text-left hover:bg-gray-100 cursor-pointer"
          >
            <span className="flex items-center gap-1">
              <FaUser className="" /> Profile
            </span>
          </button>

          <button
            onClick={handleLogout}
            className="block w-full px-4 py-2 text-left text-gray-500 hover:bg-gray-100 cursor-pointer"
          >
            <span className="flex items-center gap-1">
              <TbLogout2 />
              Logout
            </span>
          </button>
        </div>
      )}
      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Add Product Section */}
        <section className="">
          <div className="flex justify-center">
            <ProductForm />
          </div>
        </section>
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Product List Section */}
          <section className="lg:col-span-2">
            <div className="mb-4">
              <h2 className="text-2xl font-bold text-foreground">
                Product Inventory
              </h2>
              <p className="text-muted-foreground">
                View and manage all your products
              </p>
            </div>
            <ProductTable />
          </section>
        </div>
      </main>
      <Toaster />
    </div>
  );
}

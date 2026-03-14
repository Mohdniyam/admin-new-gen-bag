import { ProductForm } from "@/components/product-form";
// import { ProductTable } from "@/components/product-table";

const SupplierDashboard = () => {
  return (
    <div>
      <div className="flex-1 overflow-hidden bg-[#fbfaf9]">
        {/* Main Content */}
        <main className="container mx-auto">
          {/* Add Product Section */}
          <section className="">
            <div className="flex justify-center">
              <ProductForm />
            </div>
          </section>
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Product List Section */}
            <section className="lg:col-span-2">
              <div className="mb-4 mx-2">
                <h2 className="text-xl font-bold text-foreground">
                  Product Inventory
                </h2>
                <p className="text-sm text-muted-foreground">
                  View and manage all your products
                </p>
              </div>
              {/* <ProductTable /> */}
            </section>
          </div>
        </main>
        {/* <Toaster /> */}
      </div>
    </div>
  );
};

export default SupplierDashboard;

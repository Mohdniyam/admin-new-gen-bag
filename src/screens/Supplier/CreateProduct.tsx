import { ProductForm } from "@/components/product-form";

const CreateProduct = () => {
  return (
    <div className="">
      <div className="flex-1 overflow-hidden bg-[#fbfaf9]">
        {/* Main Content */}
        <main className="container mx-auto">
          {/* Add Product Section */}
          <section className="">
            <div className="flex justify-center">
              <ProductForm />
            </div>
          </section>
        </main>
        {/* <Toaster /> */}
      </div>
    </div>
  );
};

export default CreateProduct;

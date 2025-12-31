import InventoryForm from "@/components/inventory/InventoryForm";

const ManageInventoryPage = () => {
  return (
    <>
      <div className="container px-4 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Add New Product
          </h2>
          <p className="text-muted-foreground">
            Fill in the product details to add it to your inventory
          </p>
        </div>
        <InventoryForm />
      </div>
    </>
  );
};

export default ManageInventoryPage;

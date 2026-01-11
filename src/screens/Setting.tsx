import { AddWarehouseModal } from "@/components/AddWarehouseModal";
import WarehouseCard from "@/components/WarehouseCard";
import { useState } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";

export interface Warehouse {
  id: string;
  name: string;
  contact: string;
  address: string;
  city: string;
  pincode: string;
  isDefault: boolean;
}

const Setting = () => {
  const [open, setOpen] = useState(false); // modal state
  const [selectedId, setSelectedId] = useState<string>("");
  const [editingWarehouse, setEditingWarehouse] = useState<Warehouse | null>(
    null
  );
  const [warehouses, setWarehouses] = useState<Warehouse[]>([
    {
      id: "WH-001",
      name: "Warehouse-01",
      contact: "9815452651",
      address: "Nawada shoping Complex",
      city: "DELHI",
      pincode: "110059",
      isDefault: true,
    },
  ]);

  const handleAddWarehouse = (data: Warehouse) => {
    if (editingWarehouse) {
      // EDIT MODE
      setWarehouses((prev) => prev.map((w) => (w.id === data.id ? data : w)));
    } else {
      // ADD MODE
      setWarehouses((prev) => [...prev, data]);
    }
    setOpen(false);
    setEditingWarehouse(null);
  };

  return (
    <div>
      <h3 className="text-2xl font-bold px-4 py-6 border-b">Settings</h3>
      <div className="flex justify-between mx-8 my-4 border-b-3">
        <h4 className="font-semibold flex items-center mb-3">
          Pickup Warehouse:
        </h4>
        {/* ADD WAREHOUSE BUTTON */}
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 rounded-md bg-black px-4 py-2 mb-3 text-sm font-medium text-white"
        >
          <IoIosAddCircleOutline className="text-xl" /> Add Warehouse
        </button>
      </div>
      {/* Warehouse List */}
      <div className="mx-8 space-y-4">
        {warehouses.map((warehouse) => (
          <WarehouseCard
            key={warehouse.id}
            warehouse={warehouse}
            selectedId={selectedId}
            onSelect={setSelectedId}
            onEdit={(w) => {
              console.log(w);
              setEditingWarehouse(w);
              setOpen(true);
            }}
            onDelete={(id) =>
              setWarehouses((prev) => prev.filter((w) => w.id !== id))
            }
          />
        ))}
      </div>
      {/* ADD WAREHOUSE MODAL */}
      {open && (
        <AddWarehouseModal
          mode={editingWarehouse ? "edit" : "add"}
          initialData={editingWarehouse}
          onClose={() => {
            setOpen(false);
            setEditingWarehouse(null);
          }}
          onSubmit={handleAddWarehouse}
        />
      )}
    </div>
  );
};

export default Setting;

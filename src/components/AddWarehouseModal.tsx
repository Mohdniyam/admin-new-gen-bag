import { useState } from "react";
export interface Warehouse {
  id: string;
  name: string;
  contact: string;
  address: string;
  city: string;
  pincode: string;
  isDefault: boolean;
}

interface AddWarehouseModalProps {
  mode: "add" | "edit";
  initialData?: Warehouse | null;
  onClose: () => void;
  onSubmit: (data: Warehouse) => void;
}

export const AddWarehouseModal = ({
  mode,
  initialData,
  onClose,
  onSubmit,
}: AddWarehouseModalProps) => {
  const [form, setForm] = useState({
    name: initialData?.name || "",
    contact: initialData?.contact || "",
    address: initialData?.address || "",
    city: initialData?.city || "",
    pincode: initialData?.pincode || "",
  });

  const handleSubmit = () => {
    onSubmit({
      id: initialData?.id ?? `WH-${Date.now()}`,
      ...form,
      isDefault: initialData?.isDefault ?? false,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md rounded-lg bg-white p-6 space-y-4">
        <h3 className="text-lg font-semibold">
          {mode === "add" ? "Add Warehouse" : "Edit Warehouse"}
        </h3>

        <input
          value={form.name}
          placeholder="Warehouse Name"
          className="w-full rounded border p-2"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          value={form.contact}
          placeholder="Contact Number"
          className="w-full rounded border p-2"
          onChange={(e) => setForm({ ...form, contact: e.target.value })}
        />

        <input
          value={form.address}
          placeholder="Address"
          className="w-full rounded border p-2"
          onChange={(e) => setForm({ ...form, address: e.target.value })}
        />

        <input
          value={form.city}
          placeholder="City"
          className="w-full rounded border p-2"
          onChange={(e) => setForm({ ...form, city: e.target.value })}
        />

        <input
          value={form.pincode}
          placeholder="Pincode"
          className="w-full rounded border p-2"
          onChange={(e) => setForm({ ...form, pincode: e.target.value })}
        />

        <div className="flex justify-end gap-3 pt-4">
          <button
            onClick={onClose}
            className="rounded-md border px-4 py-2 text-sm"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="rounded-md px-4 py-2 text-sm text-white bg-black"
          >
            {mode === "add" ? "Save" : "Update"}
          </button>
        </div>
      </div>
    </div>
  );
};

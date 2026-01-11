import { Pencil, Trash2 } from "lucide-react";

export interface Warehouse {
  id: string;
  name: string;
  contact: string;
  address: string;
  city: string;
  pincode: string;
  isDefault: boolean;
}

interface WarehouseCardProps {
  warehouse: Warehouse;
  selectedId: string;
  onSelect: (id: string) => void;
  onEdit: (warehouse: Warehouse) => void;
  onDelete: (id: string) => void;
}

const WarehouseCard = ({
  warehouse,
  selectedId,
  onSelect,
  onEdit,
  onDelete,
}: WarehouseCardProps) => {
  const isSelected = selectedId === warehouse.id;

  return (
    <div
      onClick={() => onSelect(warehouse.id)}
      className={`flex cursor-pointer gap-4 rounded-xl border w-1/2 p-5 transition
        ${isSelected ? "border-blue-500 bg-blue-50" : "border-gray-200"}
      `}
    >
      {/* Radio */}
      <div className="mt-1">
        <div
          className={`h-4 w-4 rounded-full border-2 flex items-center justify-center
            ${isSelected ? "border-black" : "border-gray-400"}
          `}
        >
          {isSelected && <div className="h-2 w-2 rounded-full bg-black" />}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 space-y-1">
        <p className="font-semibold">
          {warehouse.name} · {warehouse.contact}
        </p>
        <p className="text-sm text-gray-600">{warehouse.address}</p>
        <p className="text-sm text-gray-600">
          {warehouse.city} - {warehouse.pincode}
        </p>
        <p className="text-xs text-gray-500">Warehouse ID: {warehouse.id}</p>

        {/* Actions */}
        <div className="mt-3 flex items-center gap-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit(warehouse);
            }}
            className="rounded-md border p-2 hover:bg-gray-100"
          >
            <Pencil className="h-5 w-5" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(warehouse.id);
            }}
            className="rounded-md border p-2 hover:bg-gray-100"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Default badge */}
      {warehouse.isDefault && (
        <span className="self-end flex items-center justify-center rounded-full border border-blue-700 px-3 py-1 text-xs font-bold text-blue-700">
          Default
        </span>
      )}
    </div>
  );
};

export default WarehouseCard;

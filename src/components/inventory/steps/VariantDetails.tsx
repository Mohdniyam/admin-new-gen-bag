import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Plus, X, Check } from "lucide-react";
import { useState } from "react";
import type { InventoryFormData, ProductVariant } from "../InventoryFormTypes";

interface VariantDetailsStepProps {
  formData: InventoryFormData;
  onChange: (data: Partial<InventoryFormData>) => void;
  errors: Record<string, string>;
}

const VariantDetails = ({
  formData,
  onChange,
  errors,
}: VariantDetailsStepProps) => {
  const variants = formData.variants;

  const [newVariantName, setNewVariantName] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState("");
  const [newValues, setNewValues] = useState<Record<string, string>>({});

  /* ------------------ Variant Actions ------------------ */

  const addVariant = () => {
    if (!newVariantName.trim()) return;

    const newVariant: ProductVariant = {
      id: crypto.randomUUID(),
      name: newVariantName.trim(),
      values: [],
    };

    onChange({ variants: [...variants, newVariant] });
    setNewVariantName("");
  };

  const deleteVariant = (id: string) => {
    onChange({ variants: variants.filter((v) => v.id !== id) });
  };

  const startEdit = (variant: ProductVariant) => {
    setEditingId(variant.id);
    setEditingName(variant.name);
  };

  const saveEdit = (id: string) => {
    onChange({
      variants: variants.map((v) =>
        v.id === id ? { ...v, name: editingName.trim() } : v
      ),
    });
    setEditingId(null);
    setEditingName("");
  };

  /* ------------------ Value Actions ------------------ */

  const addValue = (variantId: string) => {
    const value = newValues[variantId]?.trim();
    if (!value) return;

    onChange({
      variants: variants.map((v) =>
        v.id === variantId ? { ...v, values: [...v.values, value] } : v
      ),
    });

    setNewValues((prev) => ({
      ...prev,
      [variantId]: "",
    }));
  };

  const removeValue = (variantId: string, index: number) => {
    onChange({
      variants: variants.map((v) =>
        v.id === variantId
          ? { ...v, values: v.values.filter((_, i) => i !== index) }
          : v
      ),
    });
  };

  return (
    <div className="rounded-lg border bg-white p-4 space-y-6">
      {/* Add Variant */}
      <div className="space-y-2">
        <p className="text-sm font-medium">Add Variant Type</p>
        <div className="flex gap-2">
          <Input
            placeholder="e.g. Name, Color"
            value={newVariantName}
            onChange={(e) => setNewVariantName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addVariant()}
            className={`focus-visible:ring-1 focus-visible:ring-blue-500 focus:border-none ${
              errors.variants ? "border-destructive" : ""
            }`}
          />
          <Button
            onClick={addVariant}
            disabled={!newVariantName.trim()}
            className="enabled:cursor-pointer disabled:cursor-not-allowed"
          >
            <Plus className="h-4 w-4" /> Add
          </Button>
        </div>
      </div>

      {/* Variant List */}
      {variants.length === 0 ? (
        <p className="text-sm text-muted-foreground text-center">
          No variants added yet
        </p>
      ) : (
        <div className="space-y-4">
          {variants.map((variant) => (
            <div key={variant.id} className="rounded-md border p-4 space-y-3">
              {/* Header */}
              <div className="flex justify-between items-center">
                {editingId === variant.id ? (
                  <div className="flex gap-2 items-center">
                    <Input
                      value={editingName}
                      onChange={(e) => setEditingName(e.target.value)}
                      className="h-8 w-40 focus-visible:ring-blue-300"
                      autoFocus
                    />
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => saveEdit(variant.id)}
                      className="bg-blue-100 hover:bg-blue-50 hover:cursor-pointer"
                    >
                      <Check className="h-4 w-4 text-blue-600" />
                    </Button>
                  </div>
                ) : (
                  <p className="font-medium">{variant.name}</p>
                )}

                <div className="flex gap-2">
                  <button
                    onClick={() => startEdit(variant)}
                    className="cursor-pointer"
                  >
                    <Pencil className="h-4 w-4 text-blue-600" />
                  </button>
                  <button
                    onClick={() => deleteVariant(variant.id)}
                    className="cursor-pointer"
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </button>
                </div>
              </div>

              {/* Values */}
              <div className="flex flex-wrap gap-2">
                {variant.values.map((val, i) => (
                  <span
                    key={i}
                    className="flex items-center gap-1 rounded-full bg-muted px-3 py-1 text-sm"
                  >
                    {val}
                    <button onClick={() => removeValue(variant.id, i)}>
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>

              {/* Add Value */}
              <div className="flex gap-2">
                <Input
                  placeholder={`Add ${variant.name.toLowerCase()} value`}
                  value={newValues[variant.id] || ""}
                  onChange={(e) =>
                    setNewValues((prev) => ({
                      ...prev,
                      [variant.id]: e.target.value,
                    }))
                  }
                  onKeyDown={(e) => e.key === "Enter" && addValue(variant.id)}
                  className="focus-visible:ring-1 focus-visible:ring-blue-500 focus:border-none"
                />
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => addValue(variant.id)}
                  className="bg-gray-200 cursor-pointer"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {errors.variants && (
        <p className="text-sm text-destructive">{errors.variants}</p>
      )}
    </div>
  );
};

export default VariantDetails;

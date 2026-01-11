import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Plus, X, Check, Sparkles, Image } from "lucide-react";
import { useState } from "react";
import type { InventoryFormData, ProductVariant } from "../InventoryFormTypes";
import { TbGripVertical } from "react-icons/tb";
import { PiListBullets } from "react-icons/pi";

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
        v.id === variantId
          ? {
              ...v,
              values: [
                ...v.values,
                {
                  id: crypto.randomUUID(),
                  value,
                  image: undefined,
                },
              ],
            }
          : v
      ),
    });

    setNewValues((prev) => ({ ...prev, [variantId]: "" }));
  };

  const handleValueImage = (variantId: string, valueId: string, file: File) => {
    const imageUrl = URL.createObjectURL(file);

    onChange({
      variants: variants.map((v) =>
        v.id === variantId
          ? {
              ...v,
              values: v.values.map((val) =>
                val.id === valueId ? { ...val, image: imageUrl } : val
              ),
            }
          : v
      ),
    });
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
        <div className="flex gap-2">
          <Sparkles className="w-4 h-4 text-xl text-blue-600" />
          <p className="self-center text-sm font-medium text-blue-600">
            Quick add:
          </p>
        </div>
        <div className="flex gap-2">
          <Input
            placeholder="e.g. Name"
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
                      className="h-8 w-40 focus-visible:ring-1 focus-visible:ring-blue-500 focus:border-none"
                      autoFocus
                    />
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => saveEdit(variant.id)}
                      className="bg-blue-600 hover:bg-blue-500 hover:cursor-pointer"
                    >
                      <Check className="h-4 w-4 text-white" />
                    </Button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <span>
                      <TbGripVertical className="text-lg" />
                    </span>
                    <p className="font-medium">{variant.name}</p>
                  </div>
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
              <div className="flex flex-wrap gap-2 ">
                {variant.values.map((val) => (
                  <span
                    key={val.id}
                    className="flex items-center gap-2 rounded-full bg-blue-100 text-sm "
                  >
                    {/* Image Upload */}
                    <label className="cursor-pointer">
                      {val.image ? (
                        <img
                          src={val.image}
                          alt={val.value}
                          className="w-8 h-8 object-cover border-2 border-blue-600 rounded-full"
                        />
                      ) : (
                        <Image className="w-5 h-5 text-blue-600 my-1.5 ml-1" />
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        hidden
                        onChange={(e) =>
                          e.target.files &&
                          handleValueImage(
                            variant.id,
                            val.id,
                            e.target.files[0]
                          )
                        }
                      />
                    </label>

                    {val.value}

                    <button
                      onClick={() =>
                        removeValue(variant.id, variant.values.indexOf(val))
                      }
                      className="bg-white hover:bg-red-500 hover:text-white p-1 rounded-full cursor-pointer my-1 mr-1"
                    >
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
                  className="bg-blue-600 hover:bg-blue-500 text-white cursor-pointer"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}

          <div className="font-medium rounded-lg border p-4 space-y-4">
            <p className="text-sm font-semibold uppercase tracking-wider">
              Preview
            </p>

            {variants.map((variant) => (
              <div key={variant.id} className="space-y-2">
                {/* Variant Name */}
                <p className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                  <PiListBullets className="text-lg" />
                  {variant.name}
                </p>

                {/* Values */}
                <div className="grid grid-cols-5 gap-5 w-full">
                  {variant.values.map((val) => (
                    <div
                      key={val.id}
                      className="flex items-center border border-blue-600 rounded-xl bg-blue-100 overflow-hidden"
                    >
                      {/* Image (only if exists) */}
                      {val.image && (
                        <div className="w-20 h-20 border-2 border-blue-200 rounded-xl overflow-hidden shrink-0">
                          <img
                            src={val.image}
                            alt={val.value}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}

                      {/* Value (always show) */}
                      <div className="flex-1 flex items-center justify-center">
                        <span className="text-sm text-gray-700 truncate">
                          {val.value}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* error */}
      {errors.variants && (
        <p className="text-sm text-destructive">{errors.variants}</p>
      )}
    </div>
  );
};

export default VariantDetails;

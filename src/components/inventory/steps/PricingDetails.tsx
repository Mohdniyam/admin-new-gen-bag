import { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { DollarSign, Percent, Tag, AlertCircle } from "lucide-react";
import type { InventoryFormData } from "../InventoryFormTypes";

/* ------------------ Helpers ------------------ */

const generateCombinations = (variants: InventoryFormData["variants"]) => {
  const valid = variants.filter((v) => v.values.length);
  return valid.flatMap((v) => v.values);
};

/* ------------------ Component ------------------ */

interface PricingStepProps {
  formData: InventoryFormData;
  onChange: (data: Partial<InventoryFormData>) => void;
  errors: Record<string, string>;
}

const PricingStep = ({ formData, onChange, errors }: PricingStepProps) => {
  const { variants, pricing } = formData;

  /* Auto-generate combinations */
  useEffect(() => {
    const values = generateCombinations(variants);

    const updatedPricing = values.map((value) => {
      const existing = pricing.find((p) => p.value === value);

      return (
        existing || {
          id: crypto.randomUUID(),
          value, // important
          costPrice: 0,
          sellingPrice: 0,
          taxPercentage: 0,
          discount: 0,
        }
      );
    });

    if (JSON.stringify(updatedPricing) !== JSON.stringify(pricing)) {
      onChange({ pricing: updatedPricing });
    }
  }, [variants]);

  const updatePricing = (
    id: string,
    field: keyof Omit<(typeof pricing)[number], "id" | "combination">,
    value: number
  ) => {
    onChange({
      pricing: pricing.map((p) => (p.id === id ? { ...p, [field]: value } : p)),
    });
  };

  const hasNoVariants =
    variants.length === 0 || variants.every((v) => v.values.length === 0);

  if (hasNoVariants) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <AlertCircle className="w-12 h-12 mx-auto mb-4 text-destructive opacity-50" />
        <p className="font-medium text-destructive">No variants defined</p>
        <p className="text-sm mt-1 text-destructive">
          Add variant values to enable pricing
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {errors.pricing && (
        <div className="flex gap-2 text-sm text-destructive">
          <AlertCircle className="w-4 h-4" />
          {errors.pricing}
        </div>
      )}

      <div className="overflow-x-auto border rounded-lg">
        <table className="w-full text-sm">
          <thead className="bg-muted">
            <tr className="">
              <th className="p-3 text-left">Variant</th>
              <th className="p-3">
                <DollarSign className="inline w-4 h-4 text-blue-600" /> Cost
              </th>
              <th className="p-3">
                <Tag className="inline w-4 h-4 text-blue-600" /> Selling
              </th>
              <th className="p-3">
                <Percent className="inline w-4 h-4 text-blue-600" /> Tax
              </th>
              <th className="p-3">
                <Percent className="inline w-4 h-4 text-blue-600" /> Discount
              </th>
            </tr>
          </thead>

          <tbody>
            {pricing.map((item) => (
              <tr key={item.id} className="border-t">
                <td className="p-3 font-medium">{item.value}</td>
                <td className="p-2">
                  <Input
                    type="number"
                    value={item.costPrice || ""}
                    onChange={(e) =>
                      updatePricing(item.id, "costPrice", +e.target.value || 0)
                    }
                    className={`focus-visible:ring-blue-300 ${errors.costPrice} ? "border-destructive" : ""`}
                  />
                </td>
                <td className="p-2">
                  <Input
                    type="number"
                    value={item.sellingPrice || ""}
                    onChange={(e) =>
                      updatePricing(
                        item.id,
                        "sellingPrice",
                        +e.target.value || 0
                      )
                    }
                    className="focus-visible:ring-blue-300"
                  />
                </td>
                <td className="p-2">
                  <Input
                    type="number"
                    value={item.taxPercentage || ""}
                    onChange={(e) =>
                      updatePricing(
                        item.id,
                        "taxPercentage",
                        +e.target.value || 0
                      )
                    }
                    className="focus-visible:ring-blue-300"
                  />
                </td>
                <td className="p-2">
                  <Input
                    type="number"
                    value={item.discount || ""}
                    onChange={(e) =>
                      updatePricing(item.id, "discount", +e.target.value || 0)
                    }
                    className="focus-visible:ring-blue-300"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PricingStep;

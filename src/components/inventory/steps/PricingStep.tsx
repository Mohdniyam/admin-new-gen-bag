import { useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { type InventoryFormData } from "../InventoryFormTypes";
import { DollarSign, Percent, Tag, Calculator } from "lucide-react";

interface PricingStepProps {
  formData: InventoryFormData;
  onChange: (data: Partial<InventoryFormData>) => void;
  errors: Record<string, string>;
}

const PricingStep = ({ formData, onChange, errors }: PricingStepProps) => {
  const calculations = useMemo(() => {
    const basePrice = formData.sellingPrice || 0;
    const discountAmount = (basePrice * (formData.discount || 0)) / 100;
    const priceAfterDiscount = basePrice - discountAmount;
    const taxAmount =
      (priceAfterDiscount * (formData.taxPercentage || 0)) / 100;
    const finalPrice = priceAfterDiscount + taxAmount;
    const margin =
      formData.costPrice > 0
        ? ((priceAfterDiscount - formData.costPrice) / formData.costPrice) * 100
        : 0;

    return {
      discountAmount,
      priceAfterDiscount,
      taxAmount,
      finalPrice,
      margin,
    };
  }, [
    formData.sellingPrice,
    formData.discount,
    formData.taxPercentage,
    formData.costPrice,
  ]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label
            htmlFor="costPrice"
            className="flex items-center gap-2 text-sm font-medium"
          >
            <DollarSign className="w-4 h-4 text-blue-600" />
            Cost Price (₹) <span className="text-destructive">*</span>
          </Label>
          <Input
            id="costPrice"
            type="number"
            min="0"
            step="0.01"
            placeholder="0.00"
            value={formData.costPrice || ""}
            onChange={(e) =>
              onChange({ costPrice: parseFloat(e.target.value) || 0 })
            }
            className={errors.costPrice ? "border-destructive" : ""}
          />
          {errors.costPrice && (
            <p className="text-sm text-destructive">{errors.costPrice}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="sellingPrice"
            className="flex items-center gap-2 text-sm font-medium"
          >
            <Tag className="w-4 h-4 text-blue-600" />
            Selling Price (₹) <span className="text-destructive">*</span>
          </Label>
          <Input
            id="sellingPrice"
            type="number"
            min="0"
            step="0.01"
            placeholder="0.00"
            value={formData.sellingPrice || ""}
            onChange={(e) =>
              onChange({ sellingPrice: parseFloat(e.target.value) || 0 })
            }
            className={errors.sellingPrice ? "border-destructive" : ""}
          />
          {errors.sellingPrice && (
            <p className="text-sm text-destructive">{errors.sellingPrice}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label
            htmlFor="taxPercentage"
            className="flex items-center gap-2 text-sm font-medium"
          >
            <Percent className="w-4 h-4 text-blue-600" />
            Tax / GST (%)
          </Label>
          <Input
            id="taxPercentage"
            type="number"
            min="0"
            max="100"
            step="0.1"
            placeholder="18"
            value={formData.taxPercentage || ""}
            onChange={(e) =>
              onChange({ taxPercentage: parseFloat(e.target.value) || 0 })
            }
          />
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="discount"
            className="flex items-center gap-2 text-sm font-medium"
          >
            <Tag className="w-4 h-4 text-blue-600" />
            Discount (%){" "}
            <span className="text-muted-foreground text-xs">(Optional)</span>
          </Label>
          <Input
            id="discount"
            type="number"
            min="0"
            max="100"
            step="0.1"
            placeholder="0"
            value={formData.discount || ""}
            onChange={(e) =>
              onChange({ discount: parseFloat(e.target.value) || 0 })
            }
          />
        </div>
      </div>

      {/* Price Preview Card */}
      <div className="p-6 rounded-xl bg-linear-to-br from-primary/5 to-primary/10 border border-primary/20">
        <div className="flex items-center gap-2 mb-4">
          <Calculator className="w-5 h-5 text-blue-600" />
          <h3 className="font-semibold text-primary">Price Breakdown</h3>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Base Price</span>
            <span>₹{formData.sellingPrice?.toFixed(2) || "0.00"}</span>
          </div>

          {formData.discount > 0 && (
            <div className="flex justify-between text-sm text-success">
              <span>Discount ({formData.discount}%)</span>
              <span>- ₹{calculations.discountAmount.toFixed(2)}</span>
            </div>
          )}

          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Subtotal</span>
            <span>₹{calculations.priceAfterDiscount.toFixed(2)}</span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">
              Tax ({formData.taxPercentage}%)
            </span>
            <span>+ ₹{calculations.taxAmount.toFixed(2)}</span>
          </div>

          <div className="border-t border-primary/20 pt-3 mt-3">
            <div className="flex justify-between font-semibold text-lg">
              <span>Final Price</span>
              <span className="text-primary">
                ₹{calculations.finalPrice.toFixed(2)}
              </span>
            </div>
          </div>

          {formData.costPrice > 0 && (
            <div className="flex justify-between text-sm pt-2 border-t border-dashed border-primary/20">
              <span className="text-muted-foreground">Profit Margin</span>
              <span
                className={
                  calculations.margin >= 0 ? "text-success" : "text-destructive"
                }
              >
                {calculations.margin.toFixed(1)}%
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PricingStep;

import { useMemo, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { type InventoryFormData } from "../InventoryFormTypes";
import { Scale, Ruler, Package, Truck } from "lucide-react";

interface ShippingStepProps {
  formData: InventoryFormData;
  onChange: (data: Partial<InventoryFormData>) => void;
  errors: Record<string, string>;
}

const ShippingStep = ({ formData, onChange, errors }: ShippingStepProps) => {
  const volumetricWeight = useMemo(() => {
    const { length, width, height } = formData;
    if (length && width && height) {
      // Volumetric weight formula: (L × W × H) / 5000 for cm to kg
      return (length * width * height) / 5000;
    }
    return 0;
  }, [formData.length, formData.width, formData.height]);

  const chargeableWeight = useMemo(() => {
    return Math.max(formData.weight || 0, volumetricWeight);
  }, [formData.weight, volumetricWeight]);

  // Auto-update shipping category based on weight
  useEffect(() => {
    let newCategory: "light" | "medium" | "heavy";
    if (chargeableWeight <= 1) {
      newCategory = "light";
    } else if (chargeableWeight <= 5) {
      newCategory = "medium";
    } else {
      newCategory = "heavy";
    }
    if (newCategory !== formData.shippingCategory) {
      onChange({ shippingCategory: newCategory });
    }
  }, [chargeableWeight]);

  const getShippingBadge = () => {
    switch (formData.shippingCategory) {
      case "light":
        return (
          <Badge className="bg-success-background text-primary">
            Light (≤1 kg)
          </Badge>
        );
      case "medium":
        return (
          <Badge className="bg-warning-background text-primary">
            Medium (1-5 kg)
          </Badge>
        );
      case "heavy":
        return <Badge variant="destructive">Heavy (&gt;5 kg)</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label
          htmlFor="weight"
          className="flex items-center gap-2 text-sm font-medium"
        >
          <Scale className="w-4 h-4 text-blue-600" />
          Product Weight (kg) <span className="text-destructive">*</span>
        </Label>
        <Input
          id="weight"
          type="number"
          min="0"
          step="0.01"
          placeholder="0.00"
          value={formData.weight || ""}
          onChange={(e) =>
            onChange({ weight: parseFloat(e.target.value) || 0 })
          }
          className={errors.weight ? "border-destructive" : ""}
        />
        {errors.weight && (
          <p className="text-sm text-destructive">{errors.weight}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label className="flex items-center gap-2 text-sm font-medium">
          <Ruler className="w-4 h-4 text-blue-600" />
          Dimensions (cm) <span className="text-destructive">*</span>
        </Label>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <Input
              type="number"
              min="0"
              step="0.1"
              placeholder="Length"
              value={formData.length || ""}
              onChange={(e) =>
                onChange({ length: parseFloat(e.target.value) || 0 })
              }
              className={errors.length ? "border-destructive" : ""}
            />
            <span className="text-xs text-muted-foreground mt-1 block">
              Length
            </span>
          </div>
          <div>
            <Input
              type="number"
              min="0"
              step="0.1"
              placeholder="Width"
              value={formData.width || ""}
              onChange={(e) =>
                onChange({ width: parseFloat(e.target.value) || 0 })
              }
              className={errors.width ? "border-destructive" : ""}
            />
            <span className="text-xs text-muted-foreground mt-1 block">
              Width
            </span>
          </div>
          <div>
            <Input
              type="number"
              min="0"
              step="0.1"
              placeholder="Height"
              value={formData.height || ""}
              onChange={(e) =>
                onChange({ height: parseFloat(e.target.value) || 0 })
              }
              className={errors.height ? "border-destructive" : ""}
            />
            <span className="text-xs text-muted-foreground mt-1 block">
              Height
            </span>
          </div>
        </div>
        {(errors.length || errors.width || errors.height) && (
          <p className="text-sm text-destructive">
            All dimensions are required
          </p>
        )}
      </div>

      {/* Weight Calculation Card */}
      <div className="p-6 rounded-xl bg-linear-to-br from-primary/5 to-primary/10 border border-primary/20">
        <div className="flex items-center gap-2 mb-4">
          <Package className="w-5 h-5 text-blue-600" />
          <h3 className="font-semibold text-primary">Weight Calculation</h3>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Actual Weight</span>
            <span>{formData.weight?.toFixed(2) || "0.00"} kg</span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">
              Volumetric Weight
              <span className="block text-xs">(L × W × H ÷ 5000)</span>
            </span>
            <span>{volumetricWeight.toFixed(2)} kg</span>
          </div>

          <div className="border-t border-primary/20 pt-3 mt-3">
            <div className="flex justify-between font-semibold">
              <span>Chargeable Weight</span>
              <span className="text-primary">
                {chargeableWeight.toFixed(2)} kg
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Higher of actual or volumetric weight
            </p>
          </div>
        </div>
      </div>

      {/* Shipping Category */}
      <div className="p-4 rounded-lg bg-secondary/50 border border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Truck className="w-5 h-5 text-blue-600" />
            <span className="font-medium">Shipping Category</span>
          </div>
          {getShippingBadge()}
        </div>
        <p className="text-sm text-muted-foreground mt-2">
          Auto-assigned based on chargeable weight
        </p>
      </div>
    </div>
  );
};

export default ShippingStep;

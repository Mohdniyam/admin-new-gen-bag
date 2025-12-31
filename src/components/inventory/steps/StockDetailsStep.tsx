import { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  type InventoryFormData,
  warehouseLocations,
} from "../InventoryFormTypes";
import { Package, AlertTriangle, MapPin, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface StockDetailsStepProps {
  formData: InventoryFormData;
  onChange: (data: Partial<InventoryFormData>) => void;
  errors: Record<string, string>;
}

const StockDetailsStep = ({
  formData,
  onChange,
  errors,
}: StockDetailsStepProps) => {
  // Auto-update stock status based on quantity
  useEffect(() => {
    let newStatus: "in_stock" | "out_of_stock" | "low_stock";
    if (formData.quantity <= 0) {
      newStatus = "out_of_stock";
    } else if (formData.quantity <= formData.minStockLevel) {
      newStatus = "low_stock";
    } else {
      newStatus = "in_stock";
    }
    if (newStatus !== formData.stockStatus) {
      onChange({ stockStatus: newStatus });
    }
  }, [formData.quantity, formData.minStockLevel]);

  const getStatusBadge = () => {
    switch (formData.stockStatus) {
      case "in_stock":
        return (
          <Badge className="bg-success-background text-success">In Stock</Badge>
        );
      case "low_stock":
        return (
          <Badge className="bg-warning-background text-warning">
            Low Stock
          </Badge>
        );
      case "out_of_stock":
        return <Badge variant="destructive">Out of Stock</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label
            htmlFor="quantity"
            className="flex items-center gap-2 text-sm font-medium"
          >
            <Package className="w-4 h-4 text-blue-600" />
            Available Quantity <span className="text-destructive">*</span>
          </Label>
          <Input
            id="quantity"
            type="number"
            min="0"
            placeholder="0"
            value={formData.quantity || ""}
            onChange={(e) =>
              onChange({ quantity: parseInt(e.target.value) || 0 })
            }
            className={errors.quantity ? "border-destructive" : ""}
          />
          {errors.quantity && (
            <p className="text-sm text-destructive">{errors.quantity}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="minStockLevel"
            className="flex items-center gap-2 text-sm font-medium"
          >
            <AlertTriangle className="w-4 h-4 text-blue-600" />
            Minimum Stock Alert Level
          </Label>
          <Input
            id="minStockLevel"
            type="number"
            min="0"
            placeholder="10"
            value={formData.minStockLevel || ""}
            onChange={(e) =>
              onChange({ minStockLevel: parseInt(e.target.value) || 0 })
            }
          />
          <p className="text-xs text-muted-foreground">
            Alert when stock falls below this level
          </p>
        </div>
      </div>

      <div className="p-4 rounded-lg bg-secondary/50 border border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            <span className="font-medium">Stock Status</span>
          </div>
          {getStatusBadge()}
        </div>
        <p className="text-sm text-muted-foreground mt-2">
          Status updates automatically based on quantity and minimum stock level
        </p>
      </div>

      <div className="space-y-2">
        <Label
          htmlFor="warehouseLocation"
          className="flex items-center gap-2 text-sm font-medium"
        >
          <MapPin className="w-4 h-4 text-blue-600" />
          Warehouse / Storage Location{" "}
          <span className="text-destructive">*</span>
        </Label>
        <Select
          value={formData.warehouseLocation}
          onValueChange={(value) => onChange({ warehouseLocation: value })}
        >
          <SelectTrigger
            className={errors.warehouseLocation ? "border-destructive" : ""}
          >
            <SelectValue placeholder="Select warehouse location" />
          </SelectTrigger>
          <SelectContent>
            {warehouseLocations.map((loc) => (
              <SelectItem key={loc} value={loc}>
                {loc}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.warehouseLocation && (
          <p className="text-sm text-destructive">{errors.warehouseLocation}</p>
        )}
      </div>
    </div>
  );
};

export default StockDetailsStep;

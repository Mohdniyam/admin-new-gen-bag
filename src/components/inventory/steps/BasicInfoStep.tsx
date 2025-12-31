import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { type InventoryFormData, categories } from "../InventoryFormTypes";
import { Package, Tag, Layers, Building2, FileText } from "lucide-react";

interface BasicInfoStepProps {
  formData: InventoryFormData;
  onChange: (data: Partial<InventoryFormData>) => void;
  errors: Record<string, string>;
}

const BasicInfoStep = ({ formData, onChange, errors }: BasicInfoStepProps) => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label
          htmlFor="productName"
          className="flex items-center gap-2 text-sm font-medium"
        >
          <Package className="w-4 h-4 text-blue-600" />
          Product Name <span className="text-destructive">*</span>
        </Label>
        <Input
          id="productName"
          placeholder="Enter product name"
          value={formData.productName}
          onChange={(e) => onChange({ productName: e.target.value })}
          className={`${errors.productName ? "border-destructive" : ""}`}
        />
        {errors.productName && (
          <p className="text-sm text-destructive">{errors.productName}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label
          htmlFor="sku"
          className="flex items-center gap-2 text-sm font-medium"
        >
          <Tag className="w-4 h-4 text-blue-600" />
          SKU / Product Code <span className="text-destructive">*</span>
        </Label>
        <Input
          id="sku"
          placeholder="e.g., SKU-12345-BLK"
          value={formData.sku}
          onChange={(e) => onChange({ sku: e.target.value.toUpperCase() })}
          className={errors.sku ? "border-destructive" : ""}
        />
        {errors.sku && <p className="text-sm text-destructive">{errors.sku}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label
            htmlFor="category"
            className="flex items-center gap-2 text-sm font-medium"
          >
            <Layers className="w-4 h-4 text-blue-600" />
            Category <span className="text-destructive">*</span>
          </Label>
          <Select
            value={formData.category}
            onValueChange={(value) => onChange({ category: value })}
          >
            <SelectTrigger
              className={errors.category ? "border-destructive" : ""}
            >
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.category && (
            <p className="text-sm text-destructive">{errors.category}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="brand"
            className="flex items-center gap-2 text-sm font-medium"
          >
            <Building2 className="w-4 h-4 text-blue-600" />
            Brand{" "}
            <span className="text-muted-foreground text-xs">(Optional)</span>
          </Label>
          <Input
            id="brand"
            placeholder="Enter brand name"
            value={formData.brand}
            onChange={(e) => onChange({ brand: e.target.value })}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label
          htmlFor="description"
          className="flex items-center gap-2 text-sm font-medium"
        >
          <FileText className="w-4 h-4 text-blue-600" />
          Product Description
        </Label>
        <Textarea
          id="description"
          placeholder="Enter a detailed product description..."
          value={formData.description}
          onChange={(e) => onChange({ description: e.target.value })}
          rows={4}
          className="resize-none"
        />
      </div>
    </div>
  );
};

export default BasicInfoStep;

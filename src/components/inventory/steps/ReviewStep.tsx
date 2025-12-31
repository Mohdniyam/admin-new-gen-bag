import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { type InventoryFormData } from "../InventoryFormTypes";
import { Package, Layers, DollarSign, Truck, Edit2 } from "lucide-react";

interface ReviewStepProps {
  formData: InventoryFormData;
  onEditStep: (step: number) => void;
}

interface SectionCardProps {
  title: string;
  step: number;
  icon: React.ElementType;
  onEditStep: (step: number) => void;
  children: React.ReactNode;
}

export const SectionCard = ({
  title,
  step,
  icon: Icon,
  onEditStep,
  children,
}: SectionCardProps) => (
  <div className="p-5 rounded-xl bg-card border border-border">
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-2">
        <Icon className="w-5 h-5 text-blue-600" />
        <h3 className="font-semibold">{title}</h3>
      </div>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onEditStep(step)}
        className="h-8 text-primary hover:text-primary hover:bg-primary/10"
      >
        <Edit2 className="w-4 h-4 mr-1" />
        Edit
      </Button>
    </div>
    {children}
  </div>
);

interface InfoRowProps {
  label: string;
  value: React.ReactNode;
}

export const InfoRow = ({ label, value }: InfoRowProps) => (
  <div className="flex justify-between py-2 border-b border-border/50 last:border-0">
    <span className="text-muted-foreground text-sm">{label}</span>
    <span className="font-medium text-sm">{value}</span>
  </div>
);

const ReviewStep = ({ formData, onEditStep }: ReviewStepProps) => {
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

  const getShippingBadge = () => {
    switch (formData.shippingCategory) {
      case "light":
        return (
          <Badge className="bg-success-background text-success">Light</Badge>
        );
      case "medium":
        return (
          <Badge className="bg-warning-background text-warning">Medium</Badge>
        );
      case "heavy":
        return <Badge variant="destructive">Heavy</Badge>;
    }
  };

  const calculateFinalPrice = () => {
    const basePrice = formData.sellingPrice || 0;
    const discountAmount = (basePrice * (formData.discount || 0)) / 100;
    const priceAfterDiscount = basePrice - discountAmount;
    const taxAmount =
      (priceAfterDiscount * (formData.taxPercentage || 0)) / 100;
    return priceAfterDiscount + taxAmount;
  };

  return (
    <div className="space-y-6">
      <div className="p-4 rounded-lg bg-blue-600/5 border border-primary/20 mb-6">
        <p className="text-sm text-primary font-medium text-center">
          Please review all the information below before adding the product to
          inventory
        </p>
      </div>

      <SectionCard
        title="Basic Product Information"
        step={1}
        icon={Package}
        onEditStep={onEditStep}
      >
        <InfoRow label="Product Name" value={formData.productName} />
        <InfoRow
          label="SKU"
          value={
            <code className="bg-muted px-2 py-0.5 rounded text-xs">
              {formData.sku}
            </code>
          }
        />
        <InfoRow label="Category" value={formData.category} />
        <InfoRow label="Brand" value={formData.brand || "Not specified"} />
        {formData.description && (
          <div className="pt-2 mt-2 border-t border-border/50">
            <span className="text-muted-foreground text-sm">Description</span>
            <p className="text-sm mt-1">{formData.description}</p>
          </div>
        )}
      </SectionCard>

      <SectionCard
        title="Inventory & Stock Details"
        step={2}
        icon={Layers}
        onEditStep={onEditStep}
      >
        <InfoRow label="Available Quantity" value={formData.quantity} />
        <InfoRow label="Min Stock Level" value={formData.minStockLevel} />
        <InfoRow label="Stock Status" value={getStatusBadge()} />
        <InfoRow
          label="Warehouse Location"
          value={formData.warehouseLocation}
        />
      </SectionCard>

      <SectionCard
        title="Pricing Information"
        step={3}
        icon={DollarSign}
        onEditStep={onEditStep}
      >
        <InfoRow
          label="Cost Price"
          value={`₹${formData.costPrice?.toFixed(2)}`}
        />
        <InfoRow
          label="Selling Price"
          value={`₹${formData.sellingPrice?.toFixed(2)}`}
        />
        <InfoRow label="Tax / GST" value={`${formData.taxPercentage}%`} />
        <InfoRow
          label="Discount"
          value={formData.discount ? `${formData.discount}%` : "None"}
        />
        <div className="pt-3 mt-2 border-t border-border">
          <div className="flex justify-between">
            <span className="font-semibold">Final Price</span>
            <span className="font-bold text-lg text-primary">
              ₹{calculateFinalPrice().toFixed(2)}
            </span>
          </div>
        </div>
      </SectionCard>

      <SectionCard
        title="Shipping & Physical Details"
        step={4}
        icon={Truck}
        onEditStep={onEditStep}
      >
        <InfoRow label="Weight" value={`${formData.weight?.toFixed(2)} kg`} />
        <InfoRow
          label="Dimensions"
          value={`${formData.length} × ${formData.width} × ${formData.height} cm`}
        />
        <InfoRow
          label="Volumetric Weight"
          value={`${(
            (formData.length * formData.width * formData.height) /
            5000
          ).toFixed(2)} kg`}
        />
        <InfoRow label="Shipping Category" value={getShippingBadge()} />
      </SectionCard>
    </div>
  );
};

export default ReviewStep;

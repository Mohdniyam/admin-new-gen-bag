import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { type InventoryFormData } from "../InventoryFormTypes";
import { Package, Layers, Truck, Edit2 } from "lucide-react";

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

  const calculateFinalPrice = (
    selling: number,
    tax: number,
    discount: number
  ) => {
    const discountAmount = (selling * discount) / 100;
    const afterDiscount = selling - discountAmount;
    const taxAmount = (afterDiscount * tax) / 100;
    return afterDiscount + taxAmount;
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
        title="Product Details (Variants, Pricing & Shipping)"
        step={2}
        icon={Layers}
        onEditStep={onEditStep}
      >
        {/* VARIANTS */}
        <InfoRow
          label="Variants"
          value={
            formData.variants.length
              ? formData.variants
                  .map((v) => `${v.name}: ${v.values.join(", ")}`)
                  .join(" | ")
              : "No variants added"
          }
        />

        {/* PRICING */}
        <div className="mt-4 space-y-3">
          <span className="text-sm font-semibold text-muted-foreground">
            Pricing
          </span>

          {formData.pricing.length === 0 ? (
            <p className="text-sm text-muted-foreground">No pricing defined</p>
          ) : (
            formData.pricing.map((p) => (
              <div
                key={p.id}
                className="rounded-md border p-3 text-sm space-y-1"
              >
                <p className="font-medium">{p.value}</p>

                <div className="grid grid-cols-2 gap-x-4">
                  <span>Cost:</span>
                  <span className="text-right">₹{p.costPrice.toFixed(2)}</span>

                  <span>Selling:</span>
                  <span className="text-right">
                    ₹{p.sellingPrice.toFixed(2)}
                  </span>

                  <span>Tax:</span>
                  <span className="text-right">{p.taxPercentage}%</span>

                  <span>Discount:</span>
                  <span className="text-right">
                    {p.discount ? `${p.discount}%` : "—"}
                  </span>

                  <span className="font-semibold">Final:</span>
                  <span className="text-right font-semibold text-primary">
                    ₹
                    {calculateFinalPrice(
                      p.sellingPrice,
                      p.taxPercentage,
                      p.discount
                    ).toFixed(2)}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* SHIPPING */}
        <div className="mt-6 space-y-2">
          <span className="flex text-center gap-2 text-sm font-semibold text-muted-foreground">
            <Truck className="w-5 h-5 text-blue-600" />
            Shipping Details
          </span>

          <InfoRow label="Weight" value={`${formData.weight} kg`} />
          <InfoRow
            label="Dimensions"
            value={`${formData.length} × ${formData.width} × ${formData.height} cm`}
          />
          <InfoRow label="Shipping Category" value={getShippingBadge()} />
        </div>
      </SectionCard>
    </div>
  );
};

export default ReviewStep;

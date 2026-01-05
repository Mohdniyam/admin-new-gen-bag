import VariantDetails from "./VariantDetails";
import PricingDetails from "./PricingDetails";
import ShippingDetails from "./ShippingDetails";

import type { InventoryFormData } from "../InventoryFormTypes";

interface Props {
  formData: InventoryFormData;
  onChange: (data: Partial<InventoryFormData>) => void;
  errors: Record<string, string>;
}

const VariantDetailsStep = ({ formData, onChange, errors }: Props) => {
  return (
    <div className="space-y-8">
      {/* VARIANT DETAILS */}
      <section className="rounded-xl border bg-white p-6">
        <h2 className="text-lg font-semibold mb-4">Variant Details</h2>
        <VariantDetails
          formData={formData}
          onChange={onChange}
          errors={errors}
        />
      </section>

      {/* PRICING */}
      <section className="rounded-xl border bg-white p-6">
        <h2 className="text-lg font-semibold mb-4">Pricing</h2>
        <PricingDetails
          formData={formData}
          onChange={onChange}
          errors={errors}
        />
      </section>

      {/* SHIPPING */}
      <section className="rounded-xl border bg-white p-6">
        <h2 className="text-lg font-semibold mb-4">Shipping</h2>
        <ShippingDetails
          formData={formData}
          onChange={onChange}
          errors={errors}
        />
      </section>
    </div>
  );
};

export default VariantDetailsStep;

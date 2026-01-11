// Variant Types
export interface VariantValue {
  id: string;
  value: string;
  image?: string;
}

export interface ProductVariant {
  id: string;
  name: string;
  values: VariantValue[];
}

// Pricing Types
export interface PricingItem {
  id: string;
  variantId: string;
  valueId: string;
  value: string;
  image?: string;
  costPrice: number;
  sellingPrice: number;
  taxPercentage: number;
  discount: number;
}

// Inventory Form Data
export interface InventoryFormData {
  /* Basic Product Info */
  productName: string;
  sku: string;
  category: string;
  brand: string;
  description: string;

  /* Variants & Pricing */
  variants: ProductVariant[];
  pricing: PricingItem[];

  /* Shipping Details */
  weight: number;
  length: number;
  width: number;
  height: number;
  shippingCategory: "light" | "medium" | "heavy";
}

// Default Form State
export const defaultFormData: InventoryFormData = {
  productName: "",
  sku: "",
  category: "",
  brand: "",
  description: "",

  variants: [],
  pricing: [],

  weight: 0,
  length: 0,
  width: 0,
  height: 0,
  shippingCategory: "light",
};

// Static Options
export const categories = [
  "Electronics",
  "Clothing & Apparel",
  "Home & Kitchen",
  "Sports & Outdoors",
  "Books & Stationery",
  "Health & Beauty",
  "Toys & Games",
  "Automotive",
  "Food & Beverages",
  "Other",
];

export const warehouseLocations = [
  "Warehouse A - North Zone",
  "Warehouse B - South Zone",
  "Warehouse C - East Zone",
  "Warehouse D - West Zone",
  "Central Distribution Hub",
];

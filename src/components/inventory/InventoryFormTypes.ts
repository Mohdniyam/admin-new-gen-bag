// Variant type (Step 2)
export interface ProductVariant {
  id: string;
  name: string;
  values: string[];
}

// InventoryFormTypes.ts

export interface VariantCombination {
  id: string;
  value: string;
  costPrice: number;
  sellingPrice: number;
  taxPercentage: number;
  discount: number;
}

export interface InventoryFormData {
  // Step 1: Basic Info
  productName: string;
  sku: string;
  category: string;
  brand: string;
  description: string;

  // Step 2: Variant Details
  variants: ProductVariant[];
  // ADD ONLY THIS
  pricing: VariantCombination[];

  // Step 3: Pricing
  // costPrice: number;
  // sellingPrice: number;
  // taxPercentage: number;
  // discount: number;

  // Step 4: Shipping
  weight: number;
  length: number;
  width: number;
  height: number;
  shippingCategory: "light" | "medium" | "heavy";
}

export const defaultFormData: InventoryFormData = {
  // Step 1
  productName: "",
  sku: "",
  category: "",
  brand: "",
  description: "",
  // Step 2
  variants: [],
  // Step 3
  pricing: [],
  // costPrice: 0,
  // sellingPrice: 0,
  // taxPercentage: 18,
  // discount: 0,

  // Step 4
  weight: 0,
  length: 0,
  width: 0,
  height: 0,
  shippingCategory: "light",
};

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

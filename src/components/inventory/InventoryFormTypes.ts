export interface InventoryFormData {
  // Step 1: Basic Info
  productName: string;
  sku: string;
  category: string;
  brand: string;
  description: string;

  // Step 2: Stock Details
  quantity: number;
  minStockLevel: number;
  stockStatus: "in_stock" | "out_of_stock" | "low_stock";
  warehouseLocation: string;

  // Step 3: Pricing
  costPrice: number;
  sellingPrice: number;
  taxPercentage: number;
  discount: number;

  // Step 4: Shipping
  weight: number;
  length: number;
  width: number;
  height: number;
  shippingCategory: "light" | "medium" | "heavy";
}

export const defaultFormData: InventoryFormData = {
  productName: "",
  sku: "",
  category: "",
  brand: "",
  description: "",
  quantity: 0,
  minStockLevel: 10,
  stockStatus: "out_of_stock",
  warehouseLocation: "",
  costPrice: 0,
  sellingPrice: 0,
  taxPercentage: 18,
  discount: 0,
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

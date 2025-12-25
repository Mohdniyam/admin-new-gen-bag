import { createSlice } from "@reduxjs/toolkit";
// import type { PayloadAction } from "@reduxjs/toolkit";

export const ORDER_STATUS = {
  ON_HOLD: "onhold",
  PENDING: "pending",
  DISPATCHED: "dispatched",
  READY: "ready",
  SHIPPED: "shipped",
  CANCELLED: "cancelled",
} as const;

export type OrderStatus = (typeof ORDER_STATUS)[keyof typeof ORDER_STATUS];

export interface Order {
  id: string;
  customer: string;
  status: OrderStatus;
  createdAt: string;
}

export const ordersManagementSlice = createSlice({
  name: "orders",
  initialState: {},
  reducers: {},
  extraReducers: () => {},
});

export default ordersManagementSlice.reducer;

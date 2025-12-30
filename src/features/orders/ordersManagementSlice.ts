import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ORDER_STATUS, type OrdersState, type OrderStatus } from "./types";

// Dummy data
const initialState: OrdersState = {
  activeStatus: ORDER_STATUS.ON_HOLD,
  orders: [
    {
      id: "ODRID_1",
      customer: "Customer_1",
      amount: 1200,
      status: ORDER_STATUS.PENDING,
      createdAt: "2025-12-20",
    },
    {
      id: "ODRID_2",
      customer: "Customer_2",
      amount: 3400,
      status: ORDER_STATUS.SHIPPED,
      createdAt: "2025-12-18",
    },
    {
      id: "ODRID_3",
      customer: "Customer_3",
      amount: 1500,
      status: ORDER_STATUS.PENDING,
      createdAt: "2025-12-22",
    },
  ],
};

export const ordersManagementSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    changeTab(state, action: PayloadAction<OrderStatus>) {
      state.activeStatus = action.payload;
    },
  },
  extraReducers: () => {},
});

export const { changeTab } = ordersManagementSlice.actions;
export default ordersManagementSlice.reducer;

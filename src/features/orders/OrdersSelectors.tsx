import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "@/redux/store";
import { ORDER_STATUS, type OrderStatus } from "./types";

const selectOrders = (state: RootState) => state.orders.orders;
const selectActiveStatus = (state: RootState) => state.orders.activeStatus;

export const selectFilteredOrders = createSelector(
  [selectOrders, selectActiveStatus],
  (orders, activeStatus) => {
    if (activeStatus === ORDER_STATUS.ALL) {
      return orders; // SAME reference returned
    }

    return orders.filter((order) => order.status === activeStatus);
  }
);

// Order Counts for Tab
export const selectOrderCounts = createSelector([selectOrders], (orders) => {
  const counts: Record<OrderStatus, number> = {
    onhold: 0,
    pending: 0,
    dispatched: 0,
    ready: 0,
    shipped: 0,
    cancelled: 0,
    all: 0,
  };

  orders.forEach((order) => {
    counts[order.status]++;
  });

  return counts;
});

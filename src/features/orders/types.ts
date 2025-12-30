export const ORDER_STATUS = {
  ON_HOLD: "onhold",
  PENDING: "pending",
  DISPATCHED: "dispatched",
  READY: "ready",
  SHIPPED: "shipped",
  CANCELLED: "cancelled",
  ALL: "all",
} as const;

export type OrderStatus = (typeof ORDER_STATUS)[keyof typeof ORDER_STATUS];

export interface Order {
  id: string;
  customer: string;
  amount: number;
  status: OrderStatus;
  createdAt: string;
}

export interface OrdersState {
  orders: Order[];
  activeStatus: OrderStatus;
}

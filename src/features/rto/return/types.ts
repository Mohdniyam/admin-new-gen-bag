export const RETURN_STATUS = {
  OVERVIEW: "overview",
  IN_TRANSIT: "in_transit",
  ARRIVING_TODAY: "received",
  DELIVERED: "delivered",
} as const;

export type ReturnStatus = (typeof RETURN_STATUS)[keyof typeof RETURN_STATUS];

export interface ReturnState {
  activeStatus: ReturnStatus;
}

import { apiClient } from "./apiClient";

type SupplierBase = {
  _id: string;
  name: string;
  email: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
};

export type Supplier = SupplierBase;

export type SupplierProfile = SupplierBase & {
  role: string;
  createdAt: string;
  updatedAt: string;
};

export const supplierService = {
  async getAllSuppliers(token: string) {
    return apiClient<Supplier[]>("/all", {
      method: "GET",
      token,
    });
  },

  async approveSupplier(id: string, token: string) {
    return apiClient(`/suppliers/${id}/approve`, {
      method: "PUT",
      token,
    });
  },

  async rejectSupplier(id: string, token: string) {
    return apiClient(`/suppliers/${id}/reject`, {
      method: "PUT",
      token,
    });
  },

  async getMyProfile(token: string) {
    return apiClient<SupplierProfile>("/auth/me", {
      method: "GET",
      token,
    });
  },
};

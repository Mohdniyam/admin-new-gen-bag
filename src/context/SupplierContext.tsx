"use client";

import { createContext, useContext, useEffect, useState } from "react";
import {
  supplierService,
  type Supplier,
} from "../lib/services/supplier.service";

type SupplierContextType = {
  suppliers: Supplier[];
  loading: boolean;
  getSuppliersByStatus: (
    status: "PENDING" | "APPROVED" | "REJECTED",
  ) => Supplier[];
  approveSupplier: (id: string) => Promise<void>;
  rejectSupplier: (id: string) => Promise<void>;
  refreshSuppliers: () => Promise<void>;
};

const SupplierContext = createContext<SupplierContextType | undefined>(
  undefined,
);

export function SupplierProvider({ children }: { children: React.ReactNode }) {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSuppliers = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");
      if (!token) return;

      const data = await supplierService.getAllSuppliers(token);

      setSuppliers(data);
      console.log("SUPPLIER API CALLED");
    } catch (err) {
      console.error("Failed to fetch suppliers", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);

  //  Filter locally (NO API CALL)
  const getSuppliersByStatus = (
    status: "PENDING" | "APPROVED" | "REJECTED",
  ) => {
    return suppliers.filter((s) => s.status.toUpperCase() === status);
  };

  const approveSupplier = async (id: string) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      await supplierService.approveSupplier(id, token);

      //  Local state update (no refetch)
      setSuppliers((prev) =>
        prev.map((s) => (s._id === id ? { ...s, status: "APPROVED" } : s)),
      );
    } catch (err) {
      console.error("Approve failed", err);
    }
  };

  const rejectSupplier = async (id: string) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      await supplierService.rejectSupplier(id, token);

      setSuppliers((prev) =>
        prev.map((s) => (s._id === id ? { ...s, status: "REJECTED" } : s)),
      );
    } catch (err) {
      console.error("Reject failed", err);
    }
  };

  return (
    <SupplierContext.Provider
      value={{
        suppliers,
        loading,
        getSuppliersByStatus,
        approveSupplier,
        rejectSupplier,
        refreshSuppliers: fetchSuppliers,
      }}
    >
      {children}
    </SupplierContext.Provider>
  );
}

export const useSuppliers = () => {
  const context = useContext(SupplierContext);
  if (!context) {
    throw new Error("useSuppliers must be used inside SupplierProvider");
  }
  return context;
};

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiClient } from "@/lib/services/apiClient";
import type { RootState } from "@/store/store";

export type Supplier = {
  _id: string;
  name: string;
  email: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
};

type SupplierState = {
  allSuppliers: Supplier[];
  suppliersByStatus: {
    PENDING: Supplier[];
    APPROVED: Supplier[];
    REJECTED: Supplier[];
  };
  loading: boolean;
  error: string | null;
};

const initialState: SupplierState = {
  allSuppliers: [],
  suppliersByStatus: {
    PENDING: [],
    APPROVED: [],
    REJECTED: [],
  },
  loading: false,
  error: null,
};

//
//  Fetch All Suppliers (Main API)
//
export const fetchAllSuppliers = createAsyncThunk(
  "suppliers/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token");

      return await apiClient<Supplier[]>("/supplier/all", {
        method: "GET",
        token,
      });
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

//
//  Approve Supplier
//
export const approveSupplier = createAsyncThunk(
  "suppliers/approve",
  async (id: string, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token");

      await apiClient(`/suppliers/${id}/approve`, {
        method: "PUT",
        token,
      });

      return id;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

//
//  Reject Supplier
//
export const rejectSupplier = createAsyncThunk(
  "suppliers/reject",
  async (id: string, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token");

      await apiClient(`/suppliers/${id}/reject`, {
        method: "PUT",
        token,
      });

      return id;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

//
//  SLICE
//
const supplierSlice = createSlice({
  name: "suppliers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // FETCH ALL
      .addCase(fetchAllSuppliers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllSuppliers.fulfilled, (state, action) => {
        state.loading = false;
        state.allSuppliers = action.payload;

        //  Categorize once (NO NEED TO CALL API AGAIN)
        state.suppliersByStatus.PENDING = action.payload.filter(
          (s) => s.status === "PENDING",
        );
        state.suppliersByStatus.APPROVED = action.payload.filter(
          (s) => s.status === "APPROVED",
        );
        state.suppliersByStatus.REJECTED = action.payload.filter(
          (s) => s.status === "REJECTED",
        );
      })

      // APPROVE
      .addCase(approveSupplier.fulfilled, (state, action) => {
        const id = action.payload;

        const supplier = state.allSuppliers.find((s) => s._id === id);
        if (supplier) supplier.status = "APPROVED";

        state.suppliersByStatus.PENDING =
          state.suppliersByStatus.PENDING.filter((s) => s._id !== id);

        if (supplier) state.suppliersByStatus.APPROVED.push(supplier);
      })

      // REJECT
      .addCase(rejectSupplier.fulfilled, (state, action) => {
        const id = action.payload;

        const supplier = state.allSuppliers.find((s) => s._id === id);
        if (supplier) supplier.status = "REJECTED";

        state.suppliersByStatus.PENDING =
          state.suppliersByStatus.PENDING.filter((s) => s._id !== id);

        if (supplier) state.suppliersByStatus.REJECTED.push(supplier);
      });
  },
});

export const selectSuppliersByStatus = (
  state: RootState,
  status: "PENDING" | "APPROVED" | "REJECTED",
) => state.suppliers.suppliersByStatus[status];

export const selectLoading = (state: RootState) => state.suppliers.loading;

export default supplierSlice.reducer;

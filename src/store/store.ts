import ordersManagementReducer from "@/features/orders/ordersManagementSlice";
import returnManagementReducer from "@/features/rto/return/returnManagementSlice";
import supplierReducer from "@/features/supplier/supplierSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    orders: ordersManagementReducer,
    return: returnManagementReducer,
    suppliers: supplierReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

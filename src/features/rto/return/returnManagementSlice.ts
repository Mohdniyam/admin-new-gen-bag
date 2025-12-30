import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { RETURN_STATUS, type ReturnState, type ReturnStatus } from "./types";

const initialState: ReturnState = {
  activeStatus: RETURN_STATUS.IN_TRANSIT,
};

export const returnManagementSlice = createSlice({
  name: "returns",
  initialState,
  reducers: {
    changeTab(state, action: PayloadAction<ReturnStatus>) {
      state.activeStatus = action.payload;
    },
  },
  extraReducers: () => {},
});

export const { changeTab } = returnManagementSlice.actions;
export default returnManagementSlice.reducer;

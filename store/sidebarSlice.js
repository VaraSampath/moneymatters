import { sidebarTabs } from "../utils/constants";
import { createSlice } from "@reduxjs/toolkit";

const sidebarSlice = createSlice({
  initialState: sidebarTabs,
  name: "sidebar",
  reducers: {
    updateTab: (state, action) => {
      state.forEach((each) => {
        if (each.id === action.payload) {
          each.active = true;
        } else {
          each.active = false;
        }
      });
    },
  },
});

export const sideTabs = (state) => state.sidebar;
export const { updateTab } = sidebarSlice.actions;
export const sidebar = sidebarSlice.reducer;

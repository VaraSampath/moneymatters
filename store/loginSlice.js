import { createSlice } from "@reduxjs/toolkit";

const initialState = { login: "" };

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    updateLogin(state, action) {
      state.login = action.payload;
    },
  },
});

export const { updateLogin } = loginSlice.actions;

export default loginSlice.reducer;

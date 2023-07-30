import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = [];
export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await axios.get(
    "https://bursting-gelding-24.hasura.app/api/rest/all-transactions",
    {
      limit: 10,
      offset: 2,
    }
  );
  return response.data;
});
const tableDataSlice = createSlice({
  name: "table",
  initialState,
  reducers: {
    updateTable(state, action) {
      state = [...action.payload];
    },
  },
});

export const { updateTable } = tableDataSlice.actions;

export default tableDataSlice.reducer;

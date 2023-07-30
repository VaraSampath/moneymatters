import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
let params = {
  limit: 10,
  offset: 2,
};
const url = "https://bursting-gelding-24.hasura.app/api/rest/all-transactions";
let config = {
  headers: {
    "content-type": "application/json",
    "x-hasura-admin-secret":
      "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF",
    "x-hasura-role": "user",
    "x-hasura-user-id": "1",
  },
  params,
};

export const fetchAllTransactions = createAsyncThunk(
  "store/allTransactionsSlice",
  async () => {
    const response = await axios.get(url, config);

    return response.data["transactions"];
  }
);

const initialState = {
  data: [],
  loading: "idle",
  error: null,
};

const allTransactionsSlice = createSlice({
  initialState,
  name: "allTransactions",
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllTransactions.pending, (state, action) => {
      if (state.loading === "idle") {
        state.loading = "pending";
      }
    });
    builder.addCase(fetchAllTransactions.fulfilled, (state, action) => {
      if (state.loading === "pending") {
        state.data = action.payload;
        state.loading = "success";
      }
    });
    builder.addCase(fetchAllTransactions.rejected, (state, action) => {
      if (state.loading === "pending") {
        state.loading = "idle";
        state.error = "Error occured";
      }
    });
  },
});
export const { deleteTrans } = allTransactionsSlice.actions;
export const allTransactionsReducer = allTransactionsSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url =
  "https://bursting-gelding-24.hasura.app/api/rest/daywise-totals-7-days";
let config = {
  headers: {
    "content-type": "application/json",
    "x-hasura-admin-secret":
      "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF",
    "x-hasura-role": "user",
    "x-hasura-user-id": "1",
  },
};

export const fetchWeekTransactions = createAsyncThunk(
  "store/weekTransactionSlice",
  async () => {
    const response = await axios.get(url, config);

    return response.data["last_7_days_transactions_credit_debit_totals"];
  }
);

const initialState = {
  data: [],
  loading: "idle",
  error: null,
};

const weekTransactionSlice = createSlice({
  initialState,
  name: "weekTransactions",
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchWeekTransactions.pending, (state, action) => {
      if (state.loading === "idle") {
        state.loading = "pending";
      }
    });
    builder.addCase(fetchWeekTransactions.fulfilled, (state, action) => {
      if (state.loading === "pending") {
        state.data = action.payload;
        state.loading = "idle";
      }
    });
    builder.addCase(fetchWeekTransactions.rejected, (state, action) => {
      if (state.loading === "pending") {
        state.loading = "idle";
        state.error = "Error occured";
      }
    });
  },
});

export const weekTransaction = weekTransactionSlice.reducer;

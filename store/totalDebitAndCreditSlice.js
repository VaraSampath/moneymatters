import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const userId = localStorage.getItem("userID");
const url =
  "https://bursting-gelding-24.hasura.app/api/rest/credit-debit-totals";
const options = {
  headers: {
    "content-type": "application/json",
    "x-hasura-admin-secret":
      "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF",
    "x-hasura-role": "user",
    "x-hasura-user-id": `${Number(userId) || 1}`,
  },
};
export const fetchTotalTransactionData = createAsyncThunk(
  "store/fetchTotalTransactionData",
  async () => {
    const response = await axios.get(url, options);

    return response.data["totals_credit_debit_transactions"];
  }
);

const initialState = {
  data: [],
  loading: "idle",
  error: null,
};

const totalDebitAndCreditSlice = createSlice({
  initialState,
  name: "totalDebitAndCredit",
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTotalTransactionData.pending, (state, action) => {
      if (state.loading === "idle") {
        state.loading = "pending";
      }
    });
    builder.addCase(fetchTotalTransactionData.fulfilled, (state, action) => {
      if (state.loading === "pending") {
        state.data = action.payload;
        state.loading = "success";
      }
    });
    builder.addCase(fetchTotalTransactionData.rejected, (state, action) => {
      if (state.loading === "pending") {
        state.loading = "idle";
        state.error = "Error occured";
      }
    });
  },
});

export const totalDebitCredit = totalDebitAndCreditSlice.reducer;

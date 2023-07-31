import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url =
  "https://bursting-gelding-24.hasura.app/api/rest/transaction-totals-admin";
const options = {
  headers: {
    "content-type": "application/json",
    "x-hasura-admin-secret":
      "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF",
    "x-hasura-role": "admin",
  },
};
export const fetchAdminTotalTransactionData = createAsyncThunk(
  "store/fetchAdminTotalTransactionData",
  async () => {
    const response = await axios.get(url, options);

    return response.data["transaction_totals_admin"];
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
    builder.addCase(fetchAdminTotalTransactionData.pending, (state, action) => {
      if (state.loading === "idle") {
        state.loading = "pending";
      }
    });
    builder.addCase(
      fetchAdminTotalTransactionData.fulfilled,
      (state, action) => {
        if (state.loading === "pending") {
          state.data = action.payload;
          state.loading = "success";
        }
      }
    );
    builder.addCase(
      fetchAdminTotalTransactionData.rejected,
      (state, action) => {
        if (state.loading === "pending") {
          state.loading = "idle";
          state.error = "Error occured";
        }
      }
    );
  },
});

export const adminTotalDebitCredit = totalDebitAndCreditSlice.reducer;

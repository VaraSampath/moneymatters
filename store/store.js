import { configureStore } from "@reduxjs/toolkit";
import { sidebar } from "./sidebarSlice";
import { totalDebitCredit } from "./totalDebitAndCreditSlice";
import { allTransactionsReducer } from "./allTransactionsSlice";
import { weekTransaction } from "./weekTransactionSlice";
import tableDataSlice from "./tableDataSlice";
import loginSlice from "./loginSlice";

const store = configureStore({
  reducer: {
    sidebar,
    totalDebitCredit,
    allTransactions: allTransactionsReducer,
    weekTransaction,
    tableDataSlice,
    loginSlice,
  },
});

export default store;

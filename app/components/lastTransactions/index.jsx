import { fetchAllTransactions } from "../../../store/allTransactionsSlice";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomTable from "../customTable/CustomTable";

const LastTransactions = () => {
  const { data, loading, error } = useSelector(
    (state) => state.allTransactions
  );

  const sortedData = [...data].sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });
  const newData = sortedData.slice(0, 3);
  const [tableData, setTableData] = useState(newData);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllTransactions());
  }, [tableData, dispatch]);

  let f;
  if (tableData.length === 0) {
    f = newData;
  } else {
    f = tableData;
  }
  return (
    <div className="mt-5">
      <h1 className="font-bold">Last Transaction</h1>
      <CustomTable
        data={f}
        setTableData={setTableData}
      />
    </div>
  );
};

export default LastTransactions;

"use client";

import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import CustomTable from "../components/customTable/CustomTable";
import { updateTable } from "../../store/tableDataSlice";
const tableCategory = [
  { id: 1, name: "all transactions", active: true },
  { id: 2, name: "debit", active: false },
  { id: 3, name: "credit", active: false },
];

const page = () => {
  const [currentCat, setCurrentCat] = useState(tableCategory);
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.allTransactions);
  const table = useSelector((state) => state.tableDataSlice);
  if (!data) {
    return <div>Loading</div>;
  }
  useEffect(() => {
    dispatch(updateTable(data));
  }, []);

  console.log(table);
  const sortedData = [...data].sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });
  const [tableData, setTableData] = useState(sortedData);
  let getCategory = "all";
  currentCat.map((each) => {
    if (each.active) getCategory = each.name;
  });

  let content;
  if (loading == "idle") {
    content = <div>Loading</div>;
  }
  if (loading == "success") {
    content = (
      <div>
        <CustomTable
          data={tableData}
          isHeader={true}
          category={getCategory}
          setTableData={setTableData}
        />
      </div>
    );
  }
  const handleCat = (id) => {
    const newCat = currentCat.map((each) => {
      if (each.id === id) {
        return { ...each, active: true };
      } else {
        return { ...each, active: false };
      }
    });

    setCurrentCat(newCat);
  };
  return (
    <div className=" flex  h-[85vh] overflow-y-auto">
      <div className=" w-max">
        <Sidebar />
      </div>
      <div className=" flex-1">
        <Header />
        <div className="flex gap-5 px-5">
          {currentCat.map((each) => (
            <div
              key={each.id}
              onClick={() => {
                handleCat(each.id);
              }}
              className={`${
                each.active
                  ? "text-blue-500 border-b-2 border-blue-500"
                  : "text-black border-b-2 border-white"
              } cursor-pointer`}
            >
              <span className=" capitalize">{each.name}</span>
            </div>
          ))}
        </div>
        <div className=" bg-gray-100 p-5">{content}</div>
      </div>
    </div>
  );
};

export default page;

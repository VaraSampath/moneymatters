"use client";
import { Provider, useDispatch, useSelector } from "react-redux";
import store from "../../../store/store";
import { useEffect, useState } from "react";
import { fetchAdminTransactions } from "../../../store/adminTransactions";

import AdminCustomTable from "../../components/adminCustomTable";
import AdminSidebar from "../../components/adminSidebar";

const tableCategory = [
  { id: 1, name: "all transactions", active: true },
  { id: 2, name: "debit", active: false },
  { id: 3, name: "credit", active: false },
];

const page = () => {
  const [currentCat, setCurrentCat] = useState(tableCategory);
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.adminTransactions);

  useEffect(() => {
    dispatch(fetchAdminTransactions());
  }, [dispatch]);

  if (!data) {
    return <div>Loading</div>;
  }

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
        <AdminCustomTable
          data={tableData}
          isHeader={true}
          category={getCategory}
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
    <div className=" flex  h-[80vh] ">
      <div className=" w-max h-[80vh]">
        <AdminSidebar />
      </div>
      <div className=" flex-1">
        <div className="flex gap-5 p-5">
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
        <div className=" bg-gray-100 p-5 h-[80vh] overflow-y-auto">
          {content}
        </div>
      </div>
    </div>
  );
};

export default page;

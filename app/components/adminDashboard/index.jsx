import Header from "../Header";
import { useEffect, useState } from "react";

import { fetchAdminTotalTransactionData } from "../../../store/adminTotalDebitCreditSlice";
import { useDispatch, useSelector } from "react-redux";
import LastTransactions from "../lastTransactions";
import Example from "../customChart";
import { useRouter } from "next/navigation";
import AdminCustomTable from "../adminCustomTable";
import AdminLastTransactions from "../adminLastTransactions/AdminLastTrasactions";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector(
    (state) => state.adminTotalDebitCredit
  );

  useEffect(() => {
    if (loading == "idle") {
      dispatch(fetchAdminTotalTransactionData());
    }
  }, []);
  const formatter = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  let content;
  if (loading === "pending") {
    content = (
      <div className="d-flex justify-content-center">
        <div
          className="spinner-border"
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }
  if (loading === "success") {
    content = (
      <div className=" flex  flex-row-reverse justify-evenly gap-20">
        {
          (content = data.map((item) => {
            if (item.type !== "")
              return (
                <div
                  className="bg-white flex flex-1 justify-between  rounded-xl"
                  user={item}
                  key={item.id}
                >
                  <div className="flex flex-col gap-2 p-5">
                    <span
                      className={`${
                        item.type === "credit"
                          ? "text-green-500"
                          : "text-red-600"
                      } font-bold `}
                    >
                      {item.sum
                        .toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD",
                        })
                        .replace(/\.0+$/, "")}
                    </span>
                    <span className=" text-gray-400 capitalize text-sm">
                      {item.type}
                    </span>
                  </div>
                  <div>
                    <img
                      src={`${
                        item.type == "credit" ? "/credit.png" : "/debit.png"
                      }`}
                    />
                  </div>
                </div>
              );
          }))
        }
      </div>
    );
  }
  if (error !== null) {
    content = (
      <div
        className="alert alert-danger"
        role="alert"
      >
        {error}
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="h-full bg-gray-100 py-8 px-10 overflow-y-auto">
        <div>{content}</div>
        <AdminLastTransactions />
        <Example />
      </div>
    </>
  );
};

export default AdminDashboard;

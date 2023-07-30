import React, { useEffect, useState } from "react";

import { CgDanger } from "react-icons/Cg";

const EditModal = ({ close, handleEdit, id }) => {
  const [formData, setFormData] = useState({
    transaction_name: "",
    type: "",
    category: "",
    amount: 0,
    date: "",
  });
  const editTransaction = async () => {
    handleEdit(id, {
      id: id,
      ...formData,
    });
    close();
  };

  return (
    <div className="text-sm flex gap-5 mt-5">
      <form>
        <h1 className="font-bold text-xl">Update transaction</h1>
        <p className="text-gray-500 mb-4">
          You can update the transaction here
        </p>
        <div className="flex flex-col gap-3 text-gray-600">
          <div className="flex flex-col gap-2 ">
            <label htmlFor="tName">Transaction Name</label>
            <input
              className="px-2 py-1 my-2 border-2 border-gray-400"
              id="tName"
              type="text"
              value={formData.transaction_name}
              onChange={(e) => {
                setFormData({ ...formData, transaction_name: e.target.value });
              }}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label
              className=" "
              htmlFor="tType"
            >
              Transaction Type
            </label>
            <select
              name="pets"
              id="tType"
              value={formData.type}
              className="p-1 px-2 my-2 border-2 border-gray-400"
              onChange={(e) => {
                setFormData({ ...formData, type: e.target.value });
              }}
            >
              <option value="">--Please choose an option--</option>
              <option value="credit">Credit</option>
              <option value="debit">Debit</option>
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label
              className=" "
              htmlFor="category"
            >
              Category
            </label>
            <select
              value={formData.category}
              className="p-1 px-2 my-2 border-2 border-gray-400"
              id="category"
              type="text"
              onChange={(e) => {
                setFormData({ ...formData, category: e.target.value });
              }}
            >
              <option value="">--Please choose an option--</option>
              <option value="shopping">Shopping</option>
              <option value="bills">Bills</option>
              <option value="business">Business</option>
              <option value="learning">Learning</option>
              <option value="others">Others</option>
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label
              className=" "
              htmlFor="amount"
            >
              Amount
            </label>
            <input
              className="p-1 px-2 my-2 border-2 border-gray-400"
              id="amount"
              type="number"
              value={formData.amount}
              onChange={(e) => {
                setFormData({ ...formData, amount: e.target.value });
              }}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label
              className=" "
              htmlFor="date"
            >
              Date
            </label>
            <input
              value={formData.date}
              className="p-1 px-2 my-2 border-2 border-gray-400"
              id="date"
              type="date"
              onChange={(e) => {
                setFormData({ ...formData, date: e.target.value });
              }}
            />
          </div>
        </div>
        <button
          className="px-2 py-1 w-full mt-5 bg-blue-700 rounded-md  text-white"
          onClick={editTransaction}
        >
          Edit Transaction
        </button>
      </form>
    </div>
  );
};

export default EditModal;

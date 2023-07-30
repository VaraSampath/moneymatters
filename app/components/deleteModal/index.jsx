import React, { useEffect } from "react";

import { CgDanger } from "react-icons/Cg";

import { useDispatch } from "react-redux";

const DeleteModal = ({ close, handleDelete, id }) => {
  const dispatch = useDispatch();

  const deleteFromApi = async () => {
    handleDelete(id);

    close();
  };

  return (
    <div className="flex items-center p-6 gap-5">
      <div className="text-4xl text-yellow-500">
        <CgDanger />
      </div>
      <div>
        <div>
          <h1>Are you sure you want to delete?</h1>
          <p className="mt-2">
            this transaction will be deleted immediately. You can't undo this
            action.
          </p>
        </div>
        <div className="text-sm flex gap-5 mt-5">
          <button
            className="px-2 py-1 bg-red-700 rounded-md  text-white"
            onClick={deleteFromApi}
          >
            Yes, Delete
          </button>
          <button
            className="rounded-md border-2 px-2 py-1 border-gray-200"
            onClick={close}
          >
            No, Leave it
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;

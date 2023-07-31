"use client";
import { FiArrowDownCircle, FiArrowUpCircle } from "react-icons/Fi";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { LuEdit2 } from "react-icons/lu";
import { RiDeleteBin5Line } from "react-icons/Ri";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";

export const days = {
  0: "Sun",
  1: "Mon",
  2: "Tue",
  3: "Wed",
  4: "Thrus",
  5: "Fri",
  6: "Sat",
};
const month = {
  0: "Jan",
  1: "Feb",
  2: "Mar",
  3: "Apr",
  4: "May",
  5: "Jun",
  6: "Jul",
  7: "Aug",
  8: "Sep",
  9: "Oct",
  10: "Nov",
  11: "Dec",
};

import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

import DeleteModal from "../deleteModal";
import axios from "axios";
import EditModal from "../editModal";

function formatAMPM(x) {
  const date = new Date(x);

  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var strTime = hours + ":" + minutes + " " + ampm;
  if (date.getDate() < 10) {
    return `0${date.getDate()} ${month[date.getMonth()]} ${strTime}`;
  }
  return `${date.getDate()} ${month[date.getMonth()]} ${strTime}`;
}

const CustomTable = ({ data, isHeader, category, setTableData }) => {
  const handleDelete = async (id) => {
    let config = {
      method: "delete",
      maxBodyLength: Infinity,
      url: "https://bursting-gelding-24.hasura.app/api/rest/delete-transaction",
      headers: {
        "content-type": "application/json",
        "x-hasura-admin-secret":
          "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF",
        "x-hasura-role": "user",
        "x-hasura-user-id": `${localStorage.getItem("userID")}`,
      },
      params: {
        id: id,
      },
    };
    const response = await axios.request(config);
    const x = data.filter((each) => each.id !== id);
    console.log(setTableData(x));
  };
  const handleEdit = async (id, bodyData) => {
    console.log(bodyData);
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://bursting-gelding-24.hasura.app/api/rest/update-transaction",
      headers: {
        "content-type": "application/json",
        "x-hasura-admin-secret":
          "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF",
        "x-hasura-role": "user",
        "x-hasura-user-id": `${localStorage.getItem("userID")}`,
      },
      params: {
        id: bodyData.id,
        name: bodyData["transaction_name"],
        type: bodyData.type,
        category: bodyData.category,
        amount: bodyData.amount,
        date: bodyData.date,
      },
    };

    const response = await axios.request(config);
    console.log(response);
    const x = [];
    data.map((each) => {
      if (each.id === id) {
        x.push(bodyData);
      } else {
        x.push(each);
      }
    });

    setTableData(x);
  };

  let newData = [];
  if (category === "credit") {
    data.map((each) => {
      if (each.type === category) {
        newData.push(each);
      }
    });
  } else if (category === "debit") {
    data.map((each) => {
      if (each.type === category) {
        newData.push(each);
      }
    });
  } else {
    newData = [...data];
  }

  if (newData.length === 0) {
    return <div>No Data Found</div>;
  }

  return (
    <Table className=" bg-white rounded-lg mt-5">
      {isHeader && (
        <TableHeader>
          <TableRow className="font-semibold text-sm">
            <TableCell>Transaction Name</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Amount</TableCell>
          </TableRow>
        </TableHeader>
      )}
      <TableBody>
        {newData.map(
          (each) =>
            each.type && (
              <TableRow key={each.id}>
                <TableCell className="font-medium flex gap-5 items-center">
                  <span className=" text-2xl text-gray-500">
                    {each.type === "debit" ? (
                      <FiArrowDownCircle />
                    ) : (
                      <FiArrowUpCircle />
                    )}
                  </span>
                  <span className=" capitalize">
                    {each["transaction_name"]}
                  </span>
                </TableCell>
                <TableCell>{each.category}</TableCell>
                <TableCell>{formatAMPM(each.date)}</TableCell>
                <TableCell
                  className={`${
                    each.type === "credit" ? "text-green-500" : "text-red-500"
                  }  font-semibold`}
                >
                  {each.type === "credit"
                    ? `+$${each.amount}`
                    : `-$${each.amount}`}
                </TableCell>
                <TableCell>
                  <div className="flex gap-4 font-semibold text-lg">
                    <button className=" text-blue-500">
                      <Popup
                        className=""
                        trigger={
                          <button>
                            <LuEdit2 />
                          </button>
                        }
                        modal
                        nested
                      >
                        {(close) => (
                          <div className="modal flex justify-between">
                            <div className="content ">
                              <EditModal
                                close={close}
                                id={each.id}
                                data={newData}
                                handleEdit={handleEdit}
                              />
                            </div>
                            <div>
                              <button onClick={() => close()}>
                                <AiOutlineCloseCircle className="text-2xl" />
                              </button>
                            </div>
                          </div>
                        )}
                      </Popup>
                    </button>
                    <button className=" text-red-500">
                      <Popup
                        className=""
                        trigger={
                          <button>
                            <RiDeleteBin5Line />
                          </button>
                        }
                        modal
                        nested
                      >
                        {(close) => (
                          <div className="modal flex justify-between">
                            <div className="content ">
                              <DeleteModal
                                close={close}
                                id={each.id}
                                data={newData}
                                handleDelete={handleDelete}
                              />
                            </div>
                            <div>
                              <button onClick={() => close()}>
                                <AiOutlineCloseCircle className="text-2xl" />
                              </button>
                            </div>
                          </div>
                        )}
                      </Popup>
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            )
        )}
      </TableBody>
    </Table>
  );
};

export default CustomTable;

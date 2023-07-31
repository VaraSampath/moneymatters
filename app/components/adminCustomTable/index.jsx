"use client";
import { FiArrowDownCircle, FiArrowUpCircle } from "react-icons/Fi";

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

const AdminCustomTable = ({ data, isHeader, category, setTableData }) => {
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
    return <div>Loading</div>;
  }

  return (
    <Table className=" bg-white rounded-lg mt-5">
      {isHeader && (
        <TableHeader>
          <TableRow className="font-semibold text-sm">
            <TableCell>User Name</TableCell>
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
                  <span className=" capitalize">{each["user_id"]}</span>
                </TableCell>
                <TableCell className="font-medium ">
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
              </TableRow>
            )
        )}
      </TableBody>
    </Table>
  );
};

export default AdminCustomTable;

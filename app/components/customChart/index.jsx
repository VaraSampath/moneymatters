import { useEffect } from "react";
import { Chart } from "chart.js";
import { fetchWeekTransactions } from "../../../store/weekTransactionSlice";
import { useSelector, useDispatch } from "react-redux";
import { days } from "../customTable/CustomTable";
function Example() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchWeekTransactions());
  }, [dispatch]);
  const { data, loading, error } = useSelector(
    (state) => state.weekTransaction
  );

  const sortedData = [...data].sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });
  const creditData = [];
  const debitData = [];
  const labels = new Set();
  sortedData.forEach((each) => {
    labels.add(days[new Date(each.date).getDay()]);
  });
  labels.forEach((each) => {
    data.forEach((x) => {
      if (days[new Date(x.date).getDay()] === each) {
        if (x.type === "credit") {
          creditData.push(x.sum);
        }
        if (x.type === "debit") {
          debitData.push(x.sum);
        }
      }
    });
  });
  const xAxis = [...labels];

  var myChart;
  useEffect(() => {
    var ctx = document.getElementById("canvas").getContext("2d");
    if (typeof myChart !== "undefined") myChart.destroy();
    myChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: xAxis,
        datasets: [
          {
            data: creditData,
            label: "Credit",
            borderColor: "#3e95cd",
            backgroundColor: "#7bb6dd",
            fill: false,
          },
          {
            data: debitData,
            label: "Debit",
            borderColor: "#3cba9f",
            backgroundColor: "#71d1bd",
            fill: false,
          },
        ],
      },
    });
  }, []);
  return (
    <>
      {/* line chart */}

      <div className="w-[100%] h-screen flex mx-auto my-auto">
        <div className="border border-gray-400 pt-0 rounded-xl  w-full h-fit my-auto  shadow-xl">
          <canvas id="canvas"></canvas>
        </div>
      </div>
    </>
  );
}

export default Example;

import React from "react";
import { Line } from "react-chartjs-2";

const LineChart = ({ label, chartData, deviceId }) => {
  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            max: 5,
          },
          gridLines: {
            display: true,
          },
        },
      ],
      xAxes: [
        {
          type: "time",
          // time: {
          //   format: "hh:mm:ss",
          // },
        },
      ],
    },
  };

  const data = {
    labels: label,
    datasets: [
      {
        label: `ID:--${deviceId}`,
        data: chartData,
        fill: true,
        backgroundColor: "rgb(0, 153, 255, 0.2)",
        borderColor: "rgba(0, 153, 255, 0.5)",
      },
    ],
  };

  return (
    <>
      <Line data={data} options={options} />
    </>
  );
};

export default LineChart;

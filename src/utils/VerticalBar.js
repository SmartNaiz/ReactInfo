import React from "react";
import { Bar } from "react-chartjs-2";

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
        gridLines: {
          display: true,
        },
      },
    ],
  },
};

const VerticalBar = ({ charData }) => {
  const data = {
    labels: [
      "Гүний худаг 1",
      "Гүний худаг 2",
      "Ахуйн цэвэр ус",
      "Цэвэр ус",
      "Эргэлтийн ус",
    ],
    datasets: [
      {
        label: "Усны зарцуулалт",
        data: charData,
        backgroundColor: [
          "rgba(0, 153, 255, 0.2)",
          "rgba(0, 153, 255, 0.2)",
          "rgba(0, 153, 255, 0.2)",
          "rgba(0, 153, 255, 0.2)",
          "rgba(0, 153, 255, 0.2)",
        ],
        borderColor: [
          "rgba(0, 153, 255, 1)",
          "rgba(0, 153, 255, 1)",
          "rgba(0, 153, 255, 1)",
          "rgba(0, 153, 255, 1)",
          "rgba(0, 153, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <>
      <Bar data={data} options={options} height={60} width={160} />
    </>
  );
};

export default VerticalBar;

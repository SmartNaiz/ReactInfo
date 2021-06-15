import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import { transpose } from "./needFunctions";
const genData = (data) => ({
  labels: data[1],
  datasets: [
    {
      type: "bar",
      label: "Гүний худаг 1",
      backgroundColor: `rgb(233, 123, 45)`,
      data: data[3],
      borderColor: "white",
      borderWidth: 2,
    },
    {
      type: "bar",
      label: "Гүний худаг 2",
      backgroundColor: `rgb(34, 211, 45)`,
      data: data[4],
    },
    {
      type: "bar",
      label: "Ахуйн цэвэр ус",
      backgroundColor: `rgb(23, 123, 45)`,
      data: data[5],
    },
    {
      type: "bar",
      label: "Эргэлтийн ус",
      backgroundColor: `rgb(54, 8, 45)`,
      data: data[6],
    },
    {
      type: "bar",
      label: "Цэвэр ус",
      backgroundColor: `rgb(231, 12, 45)`,
      data: data[7],
    },
  ],
});

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};

const ClickEvents = ({ barData }) => {
  console.log(barData);
  const data = barData.map((item) => Object.values(item));

  transpose(data);
  console.log(data);
  const barChartData = genData(data);
  return (
    <>
      <Bar data={barChartData} options={options} />
    </>
  );
};

export default ClickEvents;

import React, { Component } from "react";
import { Line, Pie } from "react-chartjs-2";

const colors = ["#78ce90", "#b977ce", "#fac76e", "#ae4d4d"];
const data = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "My First dataset",
      fill: false,
      lineTension: 0.1,
      backgroundColor: colors,
      borderColor: "rgba(75,156,192,0.3)",
      // borderCapStyle: "butt",
      // borderDash: [],
      // borderDashOffset: 0.0,
      // borderJoinStyle: "miter",
      // pointBorderColor: "rgba(75,192,192,1)",
      // pointBackgroundColor: "#fff",
      // pointBorderWidth: 1,
      // pointHoverRadius: 5,
      // pointHoverBackgroundColor: "rgba(75,192,192,1)",
      // pointHoverBorderColor: "rgba(220,220,220,1)",
      // pointHoverBorderWidth: 2,
      // pointRadius: 1,
      // pointHitRadius: 10,
      data: [65, 59, 80, 81, 56, 55, 40],
    },
    {
      data: [78, 51, 95, 40, 5, 55, 20],
      fill: false,
      label: " dataset",
    },
    {
      data: [23, 44, 11, 55, 55, 45, 98],
      fill: false,
      label: "My First",
    },
  ],
};

const getOptions = (showLabelX, showLabelY) => {
  return {
    legend: {
      display: true,
      position: "right",
    },
    scales: {
      yAxes: [
        {
          scaleLabel: {
            display: true,
          },
          ticks: {
            display: showLabelX ? true : false,
            beginAtZero: true,
            minRotation: 0,
          },
        },
      ],
      xAxes: [
        {
          gridLines: {
            display: true,
          },
          scaleLabel: {
            display: true,
          },
          ticks: {
            display: showLabelY ? true : false,
            minRotation: 0,
          },
        },
      ],
    },
  };
};

export default class LineDemo extends Component {
  componentDidMount = () => {
    console.log("component did mount");
  };
  render() {
    const options = getOptions(true, true);

    return (
      <div>
        <h2>Line Example</h2>
        <Line data={data} options={options} />
      </div>
    );
  }
}

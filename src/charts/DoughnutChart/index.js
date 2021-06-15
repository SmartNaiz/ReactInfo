import React from "react";
import { Doughnut } from "react-chartjs-2";
import css from "./style.module.css";
const options = {
  // responsive: true,
  cutoutPercentage: 70,
  animation: {
    animateScale: true,
  },
  // circumference: 1.5 * Math.PI,
  rotation: 0.9 * Math.PI,
};

const DoughnutChart = ({ dayTime, deviceId }) => {
  const data = {
    datasets: [
      {
        data: dayTime,
        backgroundColor: ["#B8D803", "#ccc"],
      },
      // {
      //   data: nightTime,
      //   backgroundColor: ["goldenrod", "#ccc"],
      // },
    ],
  };

  const Clock = Math.floor(dayTime[0] / 60);
  const miniut = dayTime[0] % 60;
  return (
    <>
      <h7>ID:{deviceId}</h7>
      <div className={css.chartContainer}>
        <Doughnut data={data} options={options} height={110} width={110} />
        <div className={css.chartInner}>
          {/* <div className={css.chartStatus}>Achieved</div> */}
          <div className={css.chartValue}>{Clock} цаг</div>
          <br />
          <div className={css.chartValue}>{miniut} минут</div>
          {/* <div className="chartTarget">Target: $120,000</div>
        <div className="chartDaysRemaining">120</div>
        <div className="chartDaysLabel">Days left</div> */}
        </div>
      </div>
    </>
  );
};

export default DoughnutChart;

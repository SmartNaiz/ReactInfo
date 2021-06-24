import React from "react";
import { Doughnut } from "react-chartjs-2";
import css from "./style.module.css";
import { motorDough } from "../../utils/needFunctions";
const options = {
  // responsive: true,
  cutoutPercentage: 70,
  animation: {
    animateScale: true,
  },
  // circumference: 1.5 * Math.PI,
  rotation: 0.9 * Math.PI,
};

const DoughnutChart = ({ deviceId, workedTime }) => {
  let dayTime = [0, 1440];
  let hour = 0;
  let minut = 0;
  if (workedTime !== undefined) {
    const WT = workedTime.hour * 60 + workedTime.minut;
    if (WT > 0) {
      dayTime = motorDough(WT);
    }
    hour = workedTime.hour;
    minut = workedTime.minut;
  }
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

  return (
    <>
      <h7>ID :{deviceId}</h7>
      <div className={css.chartContainer}>
        <Doughnut data={data} options={options} height={100} width={100} />
        <div className={css.chartInner}>
          {/* <div className={css.chartStatus}>Achieved</div> */}
          <div className={css.chartValue}>{hour} ц</div>
          <br />
          <div className={css.chartValue}>{minut} м</div>
          {/* <div className="chartTarget">Target: $120,000</div>
          <div className="chartDaysRemaining">120</div>
          <div className="chartDaysLabel">Days left</div> */}
        </div>
      </div>
    </>
  );
};

export default DoughnutChart;

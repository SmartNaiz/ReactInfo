import React from "react";
import { connect } from "react-redux";
import ST1vs0 from "../../ST1vs0";
import ST2vs1 from "../../ST2vs1";
import ST4vs2 from "../../ST4vs2";
import css from "./style.module.css";
const BGNURboard = ({ chartData, workedTime }) => {
  let label = [];
  let APWdata = [];
  let PWdata = [];
  let ER1data = [];
  let ER2data = [];
  if (chartData !== undefined) {
    label = chartData[1];
    APWdata = chartData[5];
    PWdata = chartData[6];
    ER1data = chartData[7];
    ER2data = chartData[8];
  }

  let GX1PmpTime = 0;
  let GX2PmpTime = 0;
  let ASHnss1Time = 0;
  let ASHnss2Time = 0;
  let URnss1Time = 0;
  let URnss2Time = 0;
  let PWnss1Time = 0;
  let ERnss1Time = 0;
  let ERnss2Time = 0;

  if (workedTime !== undefined) {
    GX1PmpTime = workedTime.GX1Pmp;
    GX2PmpTime = workedTime.GX2Pmp;
    ASHnss1Time = workedTime.ASHnss1;
    ASHnss2Time = workedTime.ASHnss2;
    URnss1Time = workedTime.URnss1;
    URnss2Time = workedTime.URnss2;
    PWnss1Time = workedTime.PWnss1;
    ERnss1Time = workedTime.ERnss1;
    ERnss2Time = workedTime.ERnss2;
  }

  return (
    <>
      <div className={css.gridLayout}>
        <div className={css.gridItem}>
          <ST1vs0 title={"Гүний худаг 1"} motorTime={GX1PmpTime} />
        </div>
        <div className={css.gridItem}>
          <ST1vs0 title={"Гүний худаг 2"} motorTime={GX2PmpTime} />
        </div>
        <div className={css.gridItem}>
          <ST1vs0 title={"Гүний худаг 6"} motorTime={GX2PmpTime} />
        </div>
        <div className={css.gridItem}>
          <ST1vs0 title={"Гүний худаг 7"} motorTime={GX2PmpTime} />
        </div>
        <div className={css.gridItem}>
          <ST2vs1 title={"Хэрлэн станц"} motorTime={[URnss1Time, URnss2Time]} />
        </div>
        <div className={css.gridItem}>
          <ST4vs2 title={"Наран станц"} motorTime={[URnss1Time, URnss2Time]} />
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    chartData: state.waterSan.chartData,
    workedTime: state.workedTime[0],
  };
};

export default connect(mapStateToProps)(BGNURboard);

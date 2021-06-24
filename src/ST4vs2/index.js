import React from "react";
import { Tabs, Tab } from "react-bootstrap";
import Doughnut from "../charts/DoughnutChart";
import LineChart from "../utils/Line";
import { motorDough } from "../utils/needFunctions";
import WaterCard from "../components/waterCard";
import ElectricCard from "../components/electricCard";
import css from "./style.module.css";
const ST4vs2 = ({
  title,
  label,
  chartData1,
  chartData2,
  deviceId1,
  deviceId2,
  workedTime1,
  workedTime2,
  workedTime3,
  workedTime4,
  pumpCtSt,
  waterAlarm,
  nasos1Id,
  nasos2Id,
  nasos3Id,
  nasos4Id,
}) => {
  let Alarms = [];

  if (waterAlarm.length > 1 && waterAlarm !== undefined) {
    Alarms = waterAlarm;
  }

  let States = [];
  if (pumpCtSt.length > 1 && pumpCtSt !== undefined) {
    States = pumpCtSt;
  }

  return (
    <>
      <h5>{title}</h5>
      <br />
      <Tabs defaultActiveKey="home" id="uncontrolled-tab-example">
        <Tab eventKey="home" title="Home">
          <br />
          <div className="row">
            <div className="col-sm-6">
              <div className="row">
                <div className="col-sm-3">
                  <Doughnut workedTime={workedTime1} deviceId={nasos1Id} />
                </div>
                <div className="col-sm-3">
                  <Doughnut workedTime={workedTime2} deviceId={nasos2Id} />
                </div>
                <div className="col-sm-3">
                  <Doughnut workedTime={workedTime3} deviceId={nasos3Id} />
                </div>
                <div className="col-sm-3">
                  <Doughnut workedTime={workedTime4} deviceId={nasos4Id} />
                </div>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="row">
                <div className="col-sm-3">
                  <br />
                  <WaterCard yesterdayValue={"---"} todayValue={"---"} />
                  <br />
                  <WaterCard yesterdayValue={"---"} todayValue={"---"} />
                </div>
                <div className="col-sm-3">
                  <br />
                  <WaterCard yesterdayValue={"---"} todayValue={"---"} />
                  <br />
                  <WaterCard yesterdayValue={"---"} todayValue={"---"} />
                </div>
                <div className="col-sm-3">
                  <br />
                  <ElectricCard yesterdayValue={"---"} todayValue={"---"} />
                </div>
                <div className="col-sm-3"></div>
              </div>
            </div>
          </div>
          <br />

          <div className="row">
            <div className="col-sm-6">
              <LineChart
                label={label}
                chartData={chartData1}
                deviceId={deviceId1}
              />
            </div>
            <div className="col-sm-6">
              <LineChart
                label={label}
                chartData={chartData2}
                deviceId={deviceId2}
              />
            </div>
          </div>
        </Tab>
        <Tab eventKey="WorkedTime" title="WorkedTime">
          <br />
          <div className={css.note}>
            <ol>
              {States.map((el) => (
                <li>
                  {el.created} {el.idEQ} {el.CtSt}
                </li>
              ))}
            </ol>
          </div>
        </Tab>
        <Tab eventKey="Alarms" title="Alarms">
          <br />
          <div className={css.note}>
            <ol>
              {Alarms.map((el) => (
                <li>
                  {el.created} {el.idEQ} {el.idAL}
                </li>
              ))}
            </ol>
          </div>
        </Tab>
      </Tabs>
    </>
  );
};

export default ST4vs2;

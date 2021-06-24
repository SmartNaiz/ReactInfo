import React from "react";
import Doughnut from "../charts/DoughnutChart";
import LineChart from "../utils/Line";
import { motorDough } from "../utils/needFunctions";
import WaterCard from "../components/waterCard";
import ElectricCard from "../components/electricCard";
import { Tabs, Tab } from "react-bootstrap";
import css from "./style.module.css";
const ST2vs1 = ({
  title,
  label,
  chartData,
  deviceId,
  waterMeter1,
  waterMeter2,
  workedTime1,
  workedTime2,
  pumpCtSt,
  waterAlarm,
  nasos1Id,
  nasos2Id,
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
      <h5> {title}</h5>
      <br />
      <Tabs defaultActiveKey="home" id="uncontrolled-tab-example">
        <Tab eventKey="home" title="Home">
          <br />
          <div className="row">
            <div className="col-sm-3">
              <Doughnut workedTime={workedTime1} deviceId={nasos1Id} />
            </div>
            <div className="col-sm-3">
              <Doughnut workedTime={workedTime2} deviceId={nasos2Id} />
            </div>
            <div className="col-sm-3">
              <br />
              <WaterCard
                yesterdayValue={waterMeter1[0]}
                todayValue={waterMeter1[1]}
              />
              <br />
              <WaterCard
                yesterdayValue={waterMeter2[0]}
                todayValue={waterMeter2[1]}
              />
            </div>
            <div className="col-sm-3">
              <br />
              <ElectricCard
                yesterdayValue={"---"}
                todayValue={"---"}
                realValue={"---"}
              />
            </div>
          </div>
          <br />
          <LineChart label={label} chartData={chartData} deviceId={deviceId} />
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
export default ST2vs1;

import React from "react";
import { Tabs, Tab } from "react-bootstrap";
import Doughnut from "../charts/DoughnutChart";

import WaterCard from "../components/waterCard";
import ElectricCard from "../components/electricCard";
import css from "./style.module.css";
const ST1vs0 = ({
  title,
  nasosId,
  waterMeter,
  workedTime,
  pumpCtSt,
  waterAlarm,
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
            <br />
            <div className="col-sm-6">
              <Doughnut workedTime={workedTime} deviceId={nasosId} />
            </div>
            <div className="col-sm-6">
              <br />
              <WaterCard
                yesterdayValue={waterMeter[0]}
                todayValue={waterMeter[1]}
              />
              <br />
              <ElectricCard yesterdayValue={"---"} todayValue={"---"} />
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

export default ST1vs0;

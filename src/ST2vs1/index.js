import React from "react";
import Doughnut from "../charts/DoughnutChart";
import LineChart from "../utils/Line";
import { motorDough } from "../utils/needFunctions";
import WaterCard from "../components/waterCard";
import ElectricCard from "../components/electricCard";
import { Tabs, Tab } from "react-bootstrap";
import css from "./style.module.css";
const ST2vs1 = ({ title, motorTime }) => {
  const mtr1 = motorTime[0];
  const mtr2 = motorTime[1];
  let nss1 = [0, 1440];
  let nss2 = [0, 1440];

  if (mtr1 > 0) {
    nss1 = motorDough(mtr1);
    nss2 = motorDough(mtr2);
  }
  return (
    <>
      <h5> {title}</h5>
      <br />
      <Tabs defaultActiveKey="home" id="uncontrolled-tab-example">
        <Tab eventKey="home" title="Home">
          <div className="row">
            <div className="col-sm-3">
              <Doughnut dayTime={nss1} />
            </div>
            <div className="col-sm-3">
              <Doughnut dayTime={nss2} />
            </div>
            <div className="col-sm-3">
              <br />
              <WaterCard yesterdayValue={23} todayValue={122} realValue={324} />
              <br />
              <WaterCard yesterdayValue={23} todayValue={122} realValue={324} />
            </div>
            <div className="col-sm-3">
              <br />
              <ElectricCard
                yesterdayValue={23}
                todayValue={122}
                realValue={324}
              />
            </div>
          </div>
          <br />
          <LineChart />
        </Tab>
        <Tab eventKey="WorkedTime" title="WorkedTime"></Tab>
        <Tab eventKey="Alarms" title="Alarms"></Tab>
      </Tabs>
    </>
  );
};
export default ST2vs1;

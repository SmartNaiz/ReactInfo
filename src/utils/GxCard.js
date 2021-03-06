import React from "react";
import { Tabs, Tab } from "react-bootstrap";
import Doughnut from "../charts/DoughnutChart";
import { motorDough } from "../utils/needFunctions";
import WaterCard from "../components/waterCard";
import ElectricCard from "../components/electricCard";
const GxCard = ({ title, motorTime }) => {
  let nss1 = [0, 1440];
  if (motorTime > 0) {
    nss1 = motorDough(motorTime);
  }
  return (
    <>
      <h6>{title}</h6>
      <br />
      <Tabs defaultActiveKey="home" id="uncontrolled-tab-example">
        <Tab eventKey="home" title="Home">
          <div className="row">
            <br />
            <div className="col-sm-6">
              <Doughnut dayTime={nss1} />
            </div>
            <div className="col-sm-6">
              <br />
              <WaterCard yesterdayValue={23} todayValue={122} realValue={324} />
              <br />
              <ElectricCard
                yesterdayValue={23}
                todayValue={122}
                realValue={324}
              />
            </div>
          </div>
        </Tab>
        <Tab eventKey="WorkedTime" title="WorkedTime"></Tab>
        <Tab eventKey="Alarms" title="Alarms"></Tab>
      </Tabs>
    </>
  );
};

export default GxCard;

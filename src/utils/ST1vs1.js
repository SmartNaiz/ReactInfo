import React from "react";
import { Card, Button, Tabs, Tab, TabContent } from "react-bootstrap";
import { CardTitle } from "react-bootstrap/Card";
import Doughnut from "../charts/DoughnutChart";
import LineChart from "./Line";
import { motorDough } from "../utils/needFunctions";
import WaterCard from "../components/waterCard";
import ElectricCard from "../components/electricCard";
const ST1vs1 = ({ title, chartData, label, motorTime }) => {
  let nss1 = [0, 1440];

  if (motorTime > 0) {
    nss1 = motorDough(motorTime);
  }

  return (
    <>
      <Card style={{ width: "29rem" }}>
        <Card.Header>{title}</Card.Header>
        <Card.Body>
          <div className="row">
            <div className="col-sm-6">
              <Doughnut dayTime={nss1} />
            </div>
            <div className="col-sm-6">
              <Card.Text>
                <WaterCard
                  yesterdayValue={23}
                  todayValue={122}
                  realValue={324}
                />
              </Card.Text>

              <Card.Text>
                <ElectricCard
                  yesterdayValue={23}
                  todayValue={122}
                  realValue={324}
                />
              </Card.Text>
            </div>
          </div>
        </Card.Body>
        <LineChart label={label} chartData={chartData} />
      </Card>
    </>
  );
};

export default ST1vs1;

import React from "react";
import { Card, Button } from "react-bootstrap";
import { CardTitle } from "react-bootstrap/Card";
import Doughnut from "../charts/DoughnutChart";
import LineChart from "./Line";
import { motorDough } from "../utils/needFunctions";
import WaterCard from "../components/waterCard";
import ElectricCard from "../components/electricCard";
const ST2vs2 = ({ title, label, chartData, motorTime }) => {
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
      <Card style={{ width: "29rem" }}>
        <Card.Header>{title}</Card.Header>
        <Card.Body>
          <div className="row">
            <div className="col-sm-6">
              <Doughnut dayTime={nss1} />
            </div>
            <div className="col-sm-6">
              <Doughnut dayTime={nss2} />
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col-sm-6">
              <Card.Text>
                <WaterCard
                  yesterdayValue={23}
                  todayValue={122}
                  realValue={324}
                />
              </Card.Text>
            </div>
            <div className="col-sm-6">
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
        <LineChart label={label} chartData={chartData[0]} />
        <br />
        <LineChart label={label} chartData={chartData[1]} />
      </Card>
    </>
  );
};

export default ST2vs2;

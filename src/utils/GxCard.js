import React from "react";
import { Badge, Card } from "react-bootstrap";
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
      <Card style={{ width: "29rem" }}>
        <Card.Header className="text-center">
          <h6>{title}</h6>
        </Card.Header>
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
      </Card>
    </>
  );
};

export default GxCard;

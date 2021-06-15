import React from "react";
import { Card } from "react-bootstrap";
import LineChart from "./Line";
import WaterCard from "../components/waterCard";
import ElectricCard from "../components/electricCard";
const ST0vs1 = ({ title, label, chartData }) => {
  return (
    <>
      <Card style={{ width: "29rem" }}>
        <Card.Header>{title}</Card.Header>
        <Card.Body>
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
        <LineChart label={label} chartData={chartData} />
      </Card>
    </>
  );
};

export default ST0vs1;

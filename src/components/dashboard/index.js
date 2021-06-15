import React, { useState, useEffect } from "react";
import UsTooluur from "./usTooluur";
import AlarmMessage from "./AlarmMessage";
import SanMeter from "./SanMeter";
import WorkedTime from "./WorkedTime";
import CardDashboard from "./cardDashboard";

import "react-datepicker/dist/react-datepicker.css";
import TimeSelector from "./timeSelector";
const Dashboard = (props) => {
  console.log("user:", props.auth.user);
  console.log("waterFlow:", props.waterFlow);

  return (
    <>
      <TimeSelector />
      <br />
      <h2>Цайрт минериалс ХХК</h2>

      <CardDashboard title={"Цайрт минериалс ХХК"} />
      <br />
      <UsTooluur />

      {/* <SanMeter /> */}
      <AlarmMessage />
      {/* <WorkedTime /> */}
    </>
  );
};

export default Dashboard;

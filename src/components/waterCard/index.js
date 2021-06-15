import React from "react";
import { Badge } from "react-bootstrap";
import css from "./style.module.css";
const WaterCard = ({ yesterdayValue, todayValue, realValue }) => {
  return (
    <div className={css.border}>
      <h6>Усны зарцуулалт</h6>
      <div>
        <h4>
          <Badge variant="primary">{realValue} m3</Badge>
        </h4>
      </div>
      <div> Өмнөх: {yesterdayValue} m3</div>
      <div> Одоох: {todayValue} m3</div>
    </div>
  );
};

export default WaterCard;

import React from "react";
import { Badge } from "react-bootstrap";
import css from "./style.module.css";
const WaterCard = ({ yesterdayValue, todayValue, realValue }) => {
  return (
    <div className={css.border}>
      <h6>Цахилгааны зарцуулалт</h6>
      <div className={css.value}>
        <h5>
          <Badge variant="danger">{realValue} m3</Badge>
        </h5>
      </div>
      <div> Өмнөх: {yesterdayValue} m3</div>
      <div> Одоох: {todayValue} m3</div>
    </div>
  );
};

export default WaterCard;

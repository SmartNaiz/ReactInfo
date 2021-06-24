import React from "react";
import { Badge } from "react-bootstrap";
import css from "./style.module.css";
const WaterCard = ({ yesterdayValue, todayValue }) => {
  let realValue = 0;

  if (yesterdayValue < 0 && todayValue < 0) {
    realValue = 0;
  } else {
    realValue = todayValue - yesterdayValue;
  }

  return (
    <div className={css.border}>
      <h6>Усны зарцуулалт</h6>
      <div>
        <h4>
          <Badge variant="primary">{realValue} m3</Badge>
        </h4>
      </div>
      <div> Өчигдөр: {yesterdayValue} m3</div>
      <div> Өнөөдөр: {todayValue} m3</div>
    </div>
  );
};

export default WaterCard;

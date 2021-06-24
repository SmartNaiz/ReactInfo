import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch } from "react-redux";
import {
  getWaterFlow,
  getWaterSan,
  getWorkedTime,
  getWaterAlarm,
  getPumpCtSt,
} from "../../store/actions";
import moment from "moment";
const TimeSelector = ({ userId }) => {
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState(new Date());
  const endDate = new Date(
    moment(Date.parse(startDate) + 86400000).format("YYYY/MM/DD HH:mm:ss")
  );

  const handleDateChange = (date) => {
    date.setHours(8, 0, 0, 0);
    setStartDate(date);
  };
  console.log("startdate=====", startDate);
  console.log("endDate=====", endDate);

  useEffect(() => {
    dispatch(getWaterFlow(startDate, endDate, userId));
    dispatch(getWaterSan(startDate, endDate, userId));
    dispatch(getWorkedTime(startDate, endDate, userId));
    dispatch(getWaterAlarm(startDate, endDate, userId));
    dispatch(getPumpCtSt(startDate, endDate, userId));
    // dispatch(getWorkedTime(startDate, endDate, userId));
  }, [startDate]);
  return (
    <div>
      <DatePicker
        className="blue-border"
        selected={startDate}
        onChange={handleDateChange}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  console.log("state++++++++++++++s", state);
  return {
    userId: state.auth.user.UserId,
  };
};

export default connect(mapStateToProps)(TimeSelector);

import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch } from "react-redux";
import { getWaterFlow, getWaterSan, getWorkedTime } from "../../store/actions";
import moment from "moment";
const TimeSelector = () => {
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState(new Date());
  const endDate = new Date(
    moment(Date.parse(startDate) + 86400000).format("YYYY/MM/DD HH:mm:ss")
  );
  const handleDateChange = (date) => {
    date.setHours(8, 0, 0, 0);
    setStartDate(date);
  };
  useEffect(() => {
    dispatch(getWaterFlow(startDate, endDate));
    dispatch(getWaterSan(startDate, endDate));
    dispatch(getWorkedTime(startDate, endDate));
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
export default TimeSelector;

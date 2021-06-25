import React from "react";
import { connect } from "react-redux";
import BGNURboard from "../../components/dashboard/BGNURboard";
import "react-datepicker/dist/react-datepicker.css";
import TimeSelector from "../../components/dashboard/timeSelector";
import { ExportCSV } from "../../components/excel/ExportCSV";

const DashPage = (props) => {
  const { UserId } = props.auth.user;

  const excelData = [
    { id: 1, name: "tech" },
    { id: 2, name: "nekk" },
  ];
  let waterFlow = [];
  if (props.waterFlow !== undefined) {
    waterFlow = props.waterFlow;
  }

  let waterSan = [];
  if (props.waterSan !== undefined) {
    waterSan = props.waterSan;
  }

  let workedTime = [];
  if (props.workedTime !== undefined) {
    workedTime = props.workedTime;
  }

  let pumpCtSt = [];
  if (props.pumpCtSt !== undefined) {
    pumpCtSt = props.pumpCtSt;
  }
  let waterAlarm = [];
  if (props.waterAlarm !== undefined) {
    waterAlarm = props.waterAlarm;
  }
  return (
    <>
      <div className="row">
        <div className="col-sm-6">
          <TimeSelector />
        </div>
        <div className="col-sm-6">
          <ExportCSV
            csvData={waterFlow}
            csvData1={excelData}
            fileName={"ddd"}
          />
        </div>
      </div>

      {/* <CardDashboard title={"Цайрт минериалс ХХК"} /> */}
      <BGNURboard
        waterSan={waterSan}
        waterFlow={waterFlow}
        workedTime={workedTime}
        pumpCtSt={pumpCtSt}
        waterAlarm={waterAlarm}
      />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    waterFlow: state.waterFlow,
    waterSan: state.waterSan,
    workedTime: state.workedTime,
    pumpCtSt: state.pumpCtSt,
    waterAlarm: state.waterAlarm,
  };
};

export default connect(mapStateToProps)(DashPage);

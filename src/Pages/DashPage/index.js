import React from "react";
import { connect } from "react-redux";
import BGNURboard from "../../components/dashboard/BGNURboard";
import "react-datepicker/dist/react-datepicker.css";
import TimeSelector from "../../components/dashboard/timeSelector";
import { ExportCSV } from "../../utils/ExportCSV";

const DashPage = (props) => {
  const { UserId } = props.auth.user;

  const excelData = [
    { id: 1, name: "tech" },
    { id: 2, name: "nekk" },
  ];
  let FlowMeter = [];
  if (props.waterFlow[0] !== undefined) {
    FlowMeter = props.waterFlow[0].FlowMeter;
  }
  console.log("====++====", FlowMeter);

  // const replacer = (key, value) => (value === null ? "" : value); // specify how you want to handle null values here
  // const header = Object.keys(FlowMeter[0]);
  // const csv = [
  //   header.join(","), // header row first
  //   ...FlowMeter.map((row) =>
  //     header
  //       .map((fieldName) => JSON.stringify(row[fieldName], replacer))
  //       .join(",")
  //   ),
  // ].join("\r\n");

  // console.log(typeof csv);
  return (
    <>
      <TimeSelector />
      <br />
      <ExportCSV csvData={FlowMeter} fileName={"ddd"} />
      {/* <CardDashboard title={"Цайрт минериалс ХХК"} /> */}
      <BGNURboard />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    waterFlow: state.waterFlow,
  };
};

export default connect(mapStateToProps)(DashPage);

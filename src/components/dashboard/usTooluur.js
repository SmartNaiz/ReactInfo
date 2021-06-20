import React from "react";
import { connect } from "react-redux";
import { Table } from "react-bootstrap";
import VerticalBar from "../../utils/VerticalBar";
import HorizontalBar from "../../utils/HorizontalBar";

import LineDemo from "../../utils/LineDemo";
import BarChart from "../../utils/BarChart";

const UsTooluur = ({
  tableData,
  startedDate,
  endedDate,
  excelData,
  charData,
}) => {
  return (
    <>
      <div className="jumbotron">
        <div className="row">
          <div className="col-sm-6">
            <h1> Усны тоолуурын мэдээ</h1>

            <Table striped bordered hover size="sm">
              <thead className="thead-dark">
                <tr>
                  <th>№</th>
                  <th>Байршил</th>
                  <th>{endedDate}</th>
                  <th>{startedDate}</th>
                  <th>Усны зарцуулалт</th>
                </tr>
              </thead>
              <tbody>
                {tableData !== undefined
                  ? tableData.map((item, i) => {
                      console.log("item:", item.Байршил);
                      return (
                        <tr key={i}>
                          <td>{item[0]}</td>
                          <td>{item[1]}</td>
                          <td>{item[2]}</td>
                          <td>{item[3]}</td>
                          <td>{item[4]}</td>
                        </tr>
                      );
                    })
                  : null}
              </tbody>
            </Table>
            <br />
            <VerticalBar charData={charData} />
            {/* <HorizontalBar />
            <LineDemo /> */}
            {/* <BarChart /> */}
          </div>
          <div className="col-sm-6">
            {/* <h1> Цахилгаан зарцуулалтын мэдээ</h1>
            <Table striped bordered hover size="sm">
              <thead className="thead-dark">
                <tr>
                  <th>№</th>
                  <th>Байршил</th>
                  <th>2021-04-05 08:00:00</th>
                  <th>2021-04-06 08:00:00</th>
                  <th>Цахилгаан хэрэглээ хэмжээ</th>
                </tr>
              </thead>
              <tbody>
                {flowData.map((item, i) => (
                  <tr key={i}>
                    <td>{item.id}</td>
                    <td>{item.created}</td>
                    <td>{item.GX1FMT}</td>
                    <td>{item.GX2FMT}</td>
                    <td>{item.APWFMT}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <br />
            <LineChart /> */}
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    tableData: state.waterFlow.tableData,
    excelData: state.waterFlow.excelData,
    charData: state.waterFlow.charData,
    startedDate: state.waterFlow.startedDate,
    endedDate: state.waterFlow.endedDate,
  };
};
export default connect(mapStateToProps)(UsTooluur);

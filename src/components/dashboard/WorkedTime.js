import React, { Component } from "react";
import { Table } from "react-bootstrap";
import moment from "moment";

class WorkedTime extends Component {
  render() {
    return (
      <>
        {/* <Table striped bordered hover size="sm">
          <thead className="thead-dark">
            <tr>
              <th>№</th>
              <th>Хугацаа</th>
              <th>Алдааны мессеж</th>
              <th>Төхөөрөмжийн нэр</th>
            </tr>
          </thead>
          <tbody>
            {this.state.alarmData.map((item, i) => (
              <tr key={i}>
                <td>{item.id}</td>
                <td>{item.created}</td>
                <td>{item.idEQ}</td>
                <td>{item.idAL}</td>
              </tr>
            ))}
          </tbody>
        </Table> */}
        <div className="mt-3">
          <div className="btn btn-primary mr-2" onClick={this.prevPosts}>
            PREV
          </div>
          <div className="btn btn-primary mr-2" onClick={this.nextPosts}>
            NEXT
          </div>
        </div>
      </>
    );
  }
}
export default WorkedTime;

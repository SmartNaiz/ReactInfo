import React, { Component } from "react";
import { Table } from "react-bootstrap";
import moment from "moment";
import { sanCollection } from "../../utils/fbase";

class SanMeter extends Component {
  state = {
    sanData: [],
    limit: 20,
    count: 20,
  };

  render() {
    return (
      <>
        <div className="jumbotron">
          <Table striped bordered hover size="sm">
            <thead className="thead-dark">
              <tr>
                <th>№</th>
                <th>Хугацаа</th>
                <th>Ашиглалтын станц сан</th>
                <th>Өргөлтийн станц сан</th>
                <th>Ахуйн цэвэр ус сан</th>
                <th>Эргэлтийн сан 1</th>
                <th>Эргэлтийн сан 2</th>
                <th>Цэвэр усны сан</th>
              </tr>
            </thead>
            <tbody>
              {this.state.sanData.map((item, i) => (
                <tr key={i}>
                  <td>{item.id}</td>
                  <td>{item.created}</td>
                  <td>{item.ASHsan}</td>
                  <td>{item.URsan}</td>
                  <td>{item.APWsan}</td>
                  <td>{item.ERsan1}</td>
                  <td>{item.ERsan2}</td>
                  <td>{item.PWsan}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div className="mt-3">
            <div className="btn btn-primary mr-2" onClick={this.prevPosts}>
              PREV
            </div>
            <div className="btn btn-primary mr-2" onClick={this.nextPosts}>
              NEXT
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default SanMeter;

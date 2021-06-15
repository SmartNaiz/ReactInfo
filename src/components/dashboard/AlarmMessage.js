import React, { Component } from "react";
import { Table } from "react-bootstrap";
import moment from "moment";
import { alarmCollection } from "../../utils/fbase";
import { AlarmMessageId, EquipmentId } from "../../utils/IdMessage";
class AlarmMessage extends Component {
  state = {
    alarmData: [],
    limit: 20,
    count: 20,
  };

  componentDidMount() {
    alarmCollection
      .orderBy("created")
      .limit(this.state.limit)
      .get()
      .then((snapshot) => {
        this.handleVars(snapshot, false);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  nextPosts = () => {
    alarmCollection
      .orderBy("created")
      .startAfter(this.state.last)
      .limit(this.state.limit)
      .get()
      .then((snapshot) => {
        if (snapshot.docs.length > 0) {
          this.handleVars(snapshot, "sum");
        } else {
          console.log("sorry it is the end");
        }
      });
  };

  prevPosts = () => {
    if (this.state.count <= this.state.limit) {
      console.log("sorry dude, no more posts");
    } else {
      alarmCollection
        .orderBy("created")
        .endBefore(this.state.first)
        .limit(this.state.limit)
        .get()
        .then((snapshot) => {
          this.handleVars(snapshot, "rest");
        });
    }
  };

  handleVars = (snapshot, action) => {
    const { count } = this.state;
    const { docs } = snapshot;

    const alarmList = docs.map((doc, i) => {
      const { UserId, created, idAL, idEQ } = doc.data();
      return {
        id: i + 1,
        created: moment.unix(created.seconds).format("YYYY/MM/DD HH:mm:ss"),
        UserId,
        idAL: AlarmMessageId[idAL],
        idEQ: EquipmentId[idEQ],
      };
    });

    const lastVisible = docs[docs.length - 1];
    const firstVisible = docs[0];
    const restSum =
      action === "sum" ? count + docs.length : count - docs.length;

    this.setState((prev) => ({
      alarmData: alarmList,
      last: lastVisible,
      first: firstVisible,
      count: !action ? prev.count : restSum,
    }));
  };

  render() {
    return (
      <>
        <Table striped bordered hover size="sm">
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
        </Table>
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
export default AlarmMessage;

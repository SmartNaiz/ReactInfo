import React from "react";
import { Container } from "react-bootstrap";
import { connect } from "react-redux";
import Masonry from "react-masonry-css";
import GxCard from "../../utils/GxCard";
import ST2vs1 from "../../utils/ST2vs1";
import ST2vs2 from "../../utils/ST2vs2";
import ST1vs1 from "../../utils/ST1vs1";
import ST0vs1 from "../../utils/ST0vs1";

const CardDashboard = ({ chartData, workedTime }) => {
  let label = [];
  let APWdata = [];
  let PWdata = [];
  let ER1data = [];
  let ER2data = [];
  if (chartData !== undefined) {
    label = chartData[1];
    APWdata = chartData[5];
    PWdata = chartData[6];
    ER1data = chartData[7];
    ER2data = chartData[8];
  }

  let GX1PmpTime = 0;
  let GX2PmpTime = 0;
  let ASHnss1Time = 0;
  let ASHnss2Time = 0;
  let URnss1Time = 0;
  let URnss2Time = 0;
  let PWnss1Time = 0;
  let ERnss1Time = 0;
  let ERnss2Time = 0;

  if (workedTime !== undefined) {
    GX1PmpTime = workedTime.GX1Pmp;
    GX2PmpTime = workedTime.GX2Pmp;
    ASHnss1Time = workedTime.ASHnss1;
    ASHnss2Time = workedTime.ASHnss2;
    URnss1Time = workedTime.URnss1;
    URnss2Time = workedTime.URnss2;
    PWnss1Time = workedTime.PWnss1;
    ERnss1Time = workedTime.ERnss1;
    ERnss2Time = workedTime.ERnss2;
  }

  return (
    <>
      <Container fluid>
        <Masonry
          breakpointCols={4}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          <GxCard title={"Гүний худаг 1"} motorTime={GX1PmpTime} />
          <GxCard title={"Гүний худаг 2"} motorTime={GX2PmpTime} />
          <ST1vs1
            title={"Цэвэр усны сан"}
            label={label}
            chartData={PWdata}
            motorTime={PWnss1Time}
          />
          <ST2vs2
            title={"Эргэлтийн сан"}
            label={label}
            chartData={[ER1data, ER2data]}
            motorTime={[ERnss1Time, ERnss2Time]}
          />
          <ST2vs1
            title={"Өргөлтийн станц"}
            motorTime={[URnss1Time, URnss2Time]}
          />
          <ST2vs1
            title={"Ашиглалтын станц"}
            motorTime={[ASHnss1Time, ASHnss2Time]}
          />
          <ST0vs1
            title={"Ахуйн цэвэр ус сан"}
            label={label}
            chartData={APWdata}
          />
        </Masonry>
      </Container>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    chartData: state.waterSan.chartData,
    workedTime: state.workedTime[0],
  };
};

export default connect(mapStateToProps)(CardDashboard);

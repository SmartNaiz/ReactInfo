import React from "react";
import ST1vs0 from "../../ST1vs0";
import ST2vs1 from "../../ST2vs1";
import ST4vs2 from "../../ST4vs2";
import { EquipmentId } from "../../utils/IdMessage";
import {
  numArray,
  numArrayArray,
  filterArrayOfObject,
  filteredCtSt,
  filteredAlarm,
} from "../../utils/needFunctions";
import css from "./style.module.css";
const BGNURboard = ({
  workedTime,
  waterSan,
  waterFlow,
  pumpCtSt,
  waterAlarm,
}) => {
  ////////waterAlarm/////////////
  let BGNGX1ALM = [];
  let BGNGX2ALM = [];
  let BGNGX6ALM = [];
  let BGNGX7ALM = [];
  let BGNHRNALM = [];
  let BGNNRNALM = [];
  if (waterAlarm.length > 0 && waterAlarm !== undefined) {
    BGNGX1ALM = filteredAlarm(filterArrayOfObject(waterAlarm, "BGNGX1"));
    BGNGX2ALM = filteredAlarm(filterArrayOfObject(waterAlarm, "BGNGX2"));
    BGNGX6ALM = filteredAlarm(filterArrayOfObject(waterAlarm, "BGNGX6"));
    BGNGX7ALM = filteredAlarm(filterArrayOfObject(waterAlarm, "BGNGX7"));
    BGNHRNALM = filteredAlarm(filterArrayOfObject(waterAlarm, "BGNHRN"));
    BGNNRNALM = filteredAlarm(filterArrayOfObject(waterAlarm, "BGNNRN"));
  }
  ////////pumpCtSt/////////////
  let BGNGX1CTST = [];
  let BGNGX2CTST = [];
  let BGNGX6CTST = [];
  let BGNGX7CTST = [];
  let BGNHRNCTST = [];
  let BGNNRNCTST = [];

  if (pumpCtSt.length > 1 && pumpCtSt !== undefined) {
    BGNGX1CTST = filteredCtSt(filterArrayOfObject(pumpCtSt, "BGNGX1"));
    BGNGX2CTST = filteredCtSt(filterArrayOfObject(pumpCtSt, "BGNGX2"));
    BGNGX6CTST = filteredCtSt(filterArrayOfObject(pumpCtSt, "BGNGX6"));
    BGNGX7CTST = filteredCtSt(filterArrayOfObject(pumpCtSt, "BGNGX7"));
    BGNHRNCTST = filteredCtSt(filterArrayOfObject(pumpCtSt, "BGNHRN"));
    BGNNRNCTST = filteredCtSt(filterArrayOfObject(pumpCtSt, "BGNNRN"));

    // const aaa = BGNGX6CTST.map((el) => {
    //   return {
    //     created: el.created,
    //     idEQ: EquipmentId[el.idEQ],
    //     CtSt: el.CtSt ? "ажилласан" : "зогссон",
    //   };
    // });
  }

  //////////////workedTime/////////////////
  let BGNGX1WT = [];
  let BGNGX2WT = [];
  let BGNGX6WT = [];
  let BGNGX7WT = [];
  let BGNHRNWT1 = [];
  let BGNHRNWT2 = [];
  let BGNNRNWT1 = [];
  let BGNNRNWT2 = [];
  let BGNNRNWT3 = [];
  let BGNNRNWT4 = [];
  if (workedTime.length > 0 && workedTime !== undefined) {
    const Times = workedTime.map((doc) => {
      return doc.WorkedTime;
    });
    BGNGX1WT = numArrayArray(Times, "BGNGX1PMP");
    BGNGX2WT = numArrayArray(Times, "BGNGX2PMP");
    BGNGX6WT = numArrayArray(Times, "BGNGX6PMP");
    BGNGX7WT = numArrayArray(Times, "BGNGX7PMP");
    BGNHRNWT1 = numArrayArray(Times, "BGNHRNNSS1");
    BGNHRNWT2 = numArrayArray(Times, "BGNHRNNSS2");
    BGNNRNWT1 = numArrayArray(Times, "BGNNRNNSS1");
    BGNNRNWT2 = numArrayArray(Times, "BGNNRNNSS2");
    BGNNRNWT3 = numArrayArray(Times, "BGNNRNNSS3");
    BGNNRNWT4 = numArrayArray(Times, "BGNNRNNSS4");
  }
  /////////////FlowMeter////////////////////
  let BGNGX1FMT = [];
  let BGNGX2FMT = [];
  let BGNGX6FMT = [];
  let BGNGX7FMT = [];
  let BGNHRNFMT1 = [];
  let BGNHRNFMT2 = [];
  if (waterFlow.length > 0 && waterFlow !== undefined) {
    const Flows = waterFlow.map((doc) => {
      return doc.FlowMeter;
    });
    BGNGX1FMT = numArray(Flows, "BGNGX1FMT");
    BGNGX2FMT = numArray(Flows, "BGNGX2FMT");
    BGNGX6FMT = numArray(Flows, "BGNGX6FMT");
    BGNGX7FMT = numArray(Flows, "BGNGX7FMT");
    BGNHRNFMT1 = numArray(Flows, "BGNHRNFMT1");
    BGNHRNFMT2 = numArray(Flows, "BGNHRNFMT2");
  }
  //////////////waterSan//////////
  let BGNHRNSAN = [];
  let BGNNRNSAN1 = [];
  let BGNNRNSAN2 = [];
  let timedata = [];

  if (waterSan.length > 1 && waterSan !== undefined) {
    timedata = waterSan.map((doc) => {
      return doc.created;
    });

    const Sans = waterSan.map((doc) => {
      return doc.San;
    });

    BGNHRNSAN = numArray(Sans, "BGNHRNSAN");
    BGNNRNSAN1 = numArray(Sans, "BGNNRNSAN1");
    BGNNRNSAN2 = numArray(Sans, "BGNNRNSAN2");
  }

  return (
    <>
      <div className={css.gridLayout}>
        <div className={css.gridItem}>
          <ST1vs0
            title={"Гүний худаг 1"}
            waterMeter={BGNGX1FMT}
            workedTime={BGNGX1WT}
            pumpCtSt={BGNGX1CTST}
            waterAlarm={BGNGX1ALM}
            nasosId={"BGNGX1PMP"}
          />
        </div>
        <div className={css.gridItem}>
          <ST1vs0
            title={"Гүний худаг 2"}
            waterMeter={BGNGX2FMT}
            workedTime={BGNGX2WT}
            pumpCtSt={BGNGX2CTST}
            waterAlarm={BGNGX2ALM}
            nasosId={"BGNGX2PMP"}
          />
        </div>
        <div className={css.gridItem}>
          <ST1vs0
            title={"Гүний худаг 6"}
            waterMeter={BGNGX6FMT}
            workedTime={BGNGX6WT}
            pumpCtSt={BGNGX6CTST}
            waterAlarm={BGNGX6ALM}
            nasosId={"BGNGX6PMP"}
          />
        </div>
        <div className={css.gridItem}>
          <ST1vs0
            title={"Гүний худаг 7"}
            waterMeter={BGNGX7FMT}
            workedTime={BGNGX7WT}
            pumpCtSt={BGNGX7CTST}
            waterAlarm={BGNGX7ALM}
            nasosId={"BGNGX7PMP"}
          />
        </div>
        <div className={css.gridItem}>
          <ST2vs1
            title={"Хэрлэн станц"}
            label={timedata}
            chartData={BGNHRNSAN}
            deviceId={"BGNHRNSAN"}
            waterMeter1={BGNHRNFMT1}
            waterMeter2={BGNHRNFMT2}
            workedTime1={BGNHRNWT1}
            workedTime2={BGNHRNWT2}
            pumpCtSt={BGNHRNCTST}
            waterAlarm={BGNHRNALM}
            nasos1Id={"BGNHRNNSS1"}
            nasos2Id={"BGNHRNNSS2"}
          />
        </div>
        <div className={css.gridItem}>
          <ST4vs2
            title={"Наран станц"}
            label={timedata}
            chartData1={BGNNRNSAN1}
            chartData2={BGNNRNSAN2}
            deviceId1={"BGNNRNSAN1"}
            deviceId2={"BGNNRNSAN2"}
            workedTime1={BGNNRNWT1}
            workedTime2={BGNNRNWT2}
            workedTime3={BGNNRNWT3}
            workedTime4={BGNNRNWT4}
            pumpCtSt={BGNNRNCTST}
            waterAlarm={BGNNRNALM}
            nasos1Id={"BGNHRNNSS1"}
            nasos2Id={"BGNHRNNSS2"}
            nasos3Id={"BGNHRNNSS3"}
            nasos4Id={"BGNHRNNSS4"}
          />
        </div>
      </div>
    </>
  );
};

export default BGNURboard;

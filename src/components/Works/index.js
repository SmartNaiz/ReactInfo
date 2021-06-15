import React, { useState, useEffect } from "react";
import css from "./style.module.css";
import SBDDT from "../../img/SBDDT.jpg";
import SBWCS from "../../img/SBWCS.jpg";
import SHWCS from "../../img/SHWCS.jpg";
import DDT from "../../img/DDT.png";
import KHWCS from "../../img/KHWCS.jpg";
import SHWCSS from "../../img/SHWCSS.jpg";
import TSWCS from "../../img/TSWCS.jpg";
import BTNZR from "../../img/BTNZR.jpg";
const Works = () => {
  const [appState, changeState] = useState({
    activeObject: null,
    objects: [
      { id: 1 },
      { id: 2 },
      { id: 3 },
      { id: 4 },
      { id: 5 },
      { id: 6 },
      { id: 7 },
      { id: 8 },
    ],
  });

  useEffect(() => {
    toggleActive(6);
  }, []);

  const toggleActive = (index) => {
    changeState({ ...appState, activeObject: appState.objects[index] });
  };

  const toggleActiveStyles = (index) => {
    if (appState.objects[index] === appState.activeObject) {
      return `${css.panel} ${css.active}`;
    } else {
      return `${css.panel}`;
    }
  };

  return (
    <>
      <div className={css.container}>
        <div
          key={1}
          className={toggleActiveStyles(1)}
          onClick={() => {
            toggleActive(1);
          }}
          style={{
            backgroundImage: `url(${SBDDT})`,
          }}
        >
          <p> "Баруун-урт хотын дулаан дамжуулах төвийн автоматжуулалт" </p>
        </div>
        <div
          key={2}
          className={toggleActiveStyles(2)}
          onClick={() => {
            toggleActive(2);
          }}
          style={{
            backgroundImage: `url(${SBWCS})`,
          }}
        >
          <p>"Баруун-урт хотын ус хангамжийн автоматжуулалт"</p>
        </div>
        <div
          key={3}
          className={toggleActiveStyles(3)}
          onClick={() => {
            toggleActive(3);
          }}
          style={{
            backgroundImage: `url(${SHWCS})`,
          }}
        >
          <p>"Сайншанд хотын ус хангамжийн автоматжуулалт"</p>
        </div>
        <div
          key={4}
          className={toggleActiveStyles(4)}
          onClick={() => {
            toggleActive(4);
          }}
          style={{
            backgroundImage: `url(${KHWCS})`,
          }}
        >
          <p> "Чингис хотын ус хангамжийн автоматжуулалт"</p>
        </div>
        <div
          key={5}
          className={toggleActiveStyles(5)}
          onClick={() => {
            toggleActive(5);
          }}
          style={{
            backgroundImage: `url(${SHWCSS})`,
          }}
        >
          <p>"Зүүнбаян болон Их хэт сумдын ус хангамжийн автоматжуулалт"</p>
        </div>
        <div
          key={6}
          className={toggleActiveStyles(6)}
          onClick={() => {
            toggleActive(6);
          }}
          style={{
            backgroundImage: `url(${TSWCS})`,
          }}
        >
          <p>"Цайрт минерал ХХК ус хангамжийн автоматжуулалт"</p>
        </div>
        <div
          key={7}
          className={toggleActiveStyles(7)}
          onClick={() => {
            toggleActive(7);
          }}
          style={{
            backgroundImage: `url(${DDT})`,
          }}
        >
          <p>"Дулаан дамжуулах төвийн автоматжуулалт"</p>
        </div>
        <div
          key={8}
          className={toggleActiveStyles(8)}
          onClick={() => {
            toggleActive(8);
          }}
          style={{
            backgroundImage: `url(${BTNZR})`,
          }}
        >
          <p> "Бетон зуурмагийн үйлдвэрийн автоматжуулалт"</p>
        </div>
      </div>
    </>
  );
};

export default Works;

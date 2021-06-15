import React from "react";
import Works from "../../components/Works";
import Info from "../../components/info";
import Login from "../../components/login";
import css from "./style.module.css";
const HomePage = (props) => {
  return (
    <>
      <div className={css.container}>
        <Works />
        <Login />
      </div>
      <Info />
    </>
  );
};
export default HomePage;

import React from "react";
import "./App.css";

const CalcElement = props => {
  return <div id={props.element}>{props.btnLabel}</div>;
};

export default CalcElement;

import React from "react";
import "./App.css";

export default function Buttons(props) {
  return <div id={props.displayID}>{props.displayLabel}</div>;
}

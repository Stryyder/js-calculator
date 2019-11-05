import React from "react";

export default function Buttons(props) {
  return (
    <div
      id={props.buttonID}
      onClick={props.handleClick}
      className={props.buttonType}
    >
      {props.buttonLabel}
    </div>
  );
}

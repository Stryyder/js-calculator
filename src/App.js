import React, { Component } from "react";
import "./App.css";
import Buttons from "./Buttons.js";

const DATA = [
  { buttonValue: "", buttonLabel: "", id: "display", buttonType: "display" },
  { buttonValue: "0", buttonLabel: "0", id: "inp", buttonType: "input" },
  { buttonValue: "0", buttonLabel: "AC", id: "clear", buttonType: "clear" },
  { buttonValue: "", buttonLabel: "/", id: "divide", buttonType: "operation" },
  {
    buttonValue: "",
    buttonLabel: "*",
    id: "multiply",
    buttonType: "operation"
  },
  { buttonValue: "7", buttonLabel: "7", id: "seven", buttonType: "number" },
  { buttonValue: "8", buttonLabel: "8", id: "eight", buttonType: "number" },
  { buttonValue: "9", buttonLabel: "9", id: "nine", buttonType: "number" },
  {
    buttonValue: "",
    buttonLabel: "-",
    id: "subtract",
    buttonType: "operation"
  },
  { buttonValue: "4", buttonLabel: "4", id: "four", buttonType: "number" },
  { buttonValue: "5", buttonLabel: "5", id: "five", buttonType: "number" },
  { buttonValue: "6", buttonLabel: "6", id: "six", buttonType: "number" },
  { buttonValue: "", buttonLabel: "+", id: "add", buttonType: "operation" },
  { buttonValue: "1", buttonLabel: "1", id: "one", buttonType: "number" },
  { buttonValue: "2", buttonLabel: "2", id: "two", buttonType: "number" },
  { buttonValue: "3", buttonLabel: "3", id: "three", buttonType: "number" },
  { buttonValue: "", buttonLabel: "=", id: "equals", buttonType: "number" },
  { buttonValue: "0", buttonLabel: "0", id: "zero", buttonType: "number" },
  { buttonValue: ".", buttonLabel: ".", id: "decimal", buttonType: "operation" }
];

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputDisplay: "0"
    };
  }

  updateDisplay = event => {
    this.setState({
      inputDisplay: this.state.inputDisplay + event.target.buttonValue
    });
    document.getElementById("inp").innerHTML = this.state.inputDisplay;
  };

  render() {
    return (
      <div id="wrapper">
        {DATA.map(e => (
          <Buttons
            buttonID={e.id}
            buttonLabel={e.buttonLabel}
            buttonValue={e.buttonValue}
            buttonType={e.buttonType}
            handleClick={this.updateDisplay}
            key={Math.random()}
          />
        ))}
      </div>
    );
  }
}

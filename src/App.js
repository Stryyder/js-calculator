import React, { Component } from "react";
import "./App.css";
import Buttons from "./Buttons.js";

const DATA = [
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
  { buttonValue: "", buttonLabel: "=", id: "equals", buttonType: "operation" },
  { buttonValue: "0", buttonLabel: "0", id: "zero", buttonType: "number" },
  { buttonValue: ".", buttonLabel: ".", id: "decimal", buttonType: "operation" }
];

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      readoutDisplay: "0",
      inputDisplay: "0"
    };
  }

  updateDisplay = event => {
    let inp = this.state.inputDisplay;
    if (inp.charAt() === "0" && inp.charAt(1) !== ".") {
      while (inp.charAt(0) === "0") {
        inp = inp.substr(1);
      }

      this.setState({ inputDisplay: inp });
    }

    switch (true) {
      case event.target.className === "number":
        this.setState({
          inputDisplay: this.state.inputDisplay + event.target.innerHTML
        });

        break;

      case event.target.id === "clear":
        this.setState({ readoutDisplay: "0", inputDisplay: "0" });
        break;
      default:
        break;
    }
    document.getElementById("inp").innerHTML = this.state.inputDisplay;
  };

  render() {
    return (
      <div id="wrapper">
        <div id="display">{this.state.readoutDisplay}</div>
        <div id="inp">{this.state.inputDisplay}</div>

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

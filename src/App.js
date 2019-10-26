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
  { buttonValue: "", buttonLabel: "=", id: "equals", buttonType: "equals" },
  { buttonValue: "0", buttonLabel: "0", id: "zero", buttonType: "number" },
  { buttonValue: ".", buttonLabel: ".", id: "decimal", buttonType: "decimal" }
];

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      readoutDisplay: "0",
      inputDisplay: "0",
      decimalAdded: false,
      previousKeyEntered: "number"
    };
  }

  calculateResults = inputString => {
    console.log(inputString);
  };

  processInput = event => {
    let inp = this.state.inputDisplay + event.target.innerHTML;
    console.log(inp);
    switch (true) {
      case event.target.className === "number":
        this.setState({ inputDisplay: inp, previousKeyEntered: "number" });
        break;

      case event.target.className === "decimal" &&
        this.state.decimalAdded === false:
        this.setState({
          inputDisplay: inp,
          decimalAdded: true,
          previousKeyEntered: "decimal"
        });
        break;

      case event.target.className === "operator" &&
        this.state.previousKeyEntered !== "operator":
        this.setState({
          inputDisplay: inp,
          previousKeyEntered: "operator"
        });

        break;

      case event.target.className === "equals":
        this.calculateResults(inp);
        break;

      case event.target.id === "clear":
        this.setState({ readoutDisplay: "0", inputDisplay: "0" });
        break;

      default:
        break;
    }
  };

  render() {
    return (
      <div id="wrapper">
        <div id="display">{this.state.readoutDisplay}</div>
        <div id="inp">{this.state.inputDisplay}</div>

        {DATA.map(i => (
          <Buttons
            buttonID={i.id}
            buttonLabel={i.buttonLabel}
            buttonValue={i.buttonValue}
            buttonType={i.buttonType}
            handleClick={this.processInput}
            key={Math.random()}
          />
        ))}
      </div>
    );
  }
}

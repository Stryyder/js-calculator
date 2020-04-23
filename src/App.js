import React, { Component } from "react";
import "./App.css";
import Buttons from "./Buttons.js";
const MATH = require("mathjs");
const DATA = [
  { buttonValue: "0", buttonLabel: "AC", id: "clear", buttonType: "clear" },
  { buttonValue: "", buttonLabel: "/", id: "divide", buttonType: "operation" },
  {
    buttonValue: "",
    buttonLabel: "*",
    id: "multiply",
    buttonType: "operation",
  },
  { buttonValue: "7", buttonLabel: "7", id: "seven", buttonType: "number" },
  { buttonValue: "8", buttonLabel: "8", id: "eight", buttonType: "number" },
  { buttonValue: "9", buttonLabel: "9", id: "nine", buttonType: "number" },
  {
    buttonValue: "",
    buttonLabel: "-",
    id: "subtract",
    buttonType: "operation",
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
  { buttonValue: ".", buttonLabel: ".", id: "decimal", buttonType: "decimal" },
];

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      readoutDisplay: "",
      inputDisplay: "0",
      previousKeyEntered: "number",
      decimalCleared: true,
      lastOperationEntered: "",
      resultOfPreviousCalculation: 0,
    };
  }
  calculateResults = (expr) => {
    console.log(expr);

    // reg expression to fix >3 operators
    let equationToSolve = expr;
    let regex = /\s?[-|+|*|\\|\s?]{3,}\s?/gm;
    equationToSolve = expr.replace(regex, this.state.lastOperationEntered);

    this.setState({
      inputDisplay: MATH.evaluate(equationToSolve),
      readoutDisplay: "",
      resultOfPreviousCalculation: MATH.evaluate(expr),
    });
  };

  processInput = (event) => {
    // setup shortcut references
    let keyEntered = event.target.innerHTML;
    let inp = this.state.inputDisplay + keyEntered;

    // remove leading zeros from input unless it's decimalized
    if (inp.charAt() === "0" && inp.charAt(1) !== ".") {
      inp = parseInt(inp, 10);
    }

    // react (get it?) to any type of input we could get
    switch (true) {
      // any number is entered
      case event.target.className === "number":
        this.setState({
          inputDisplay: inp,
          readoutDisplay: this.state.readoutDisplay + keyEntered,
          previousKeyEntered: "number",
        });
        break;

      // decimal key is pressed
      case event.target.className === "decimal" &&
        this.state.previousKeyEntered !== "decimal" &&
        this.state.decimalCleared === true:
        this.setState({
          inputDisplay: inp,
          readoutDisplay: this.state.readoutDisplay + keyEntered,
          previousKeyEntered: "decimal",
          decimalCleared: false,
        });
        break;

      case event.target.className === "operation":
        if (this.state.previousKeyEntered === "equals") {
          this.setState({
            inputDisplay: this.state.resultOfPreviousCalculation + keyEntered,
            readoutDisplay:
              this.state.readoutDisplay +
              this.state.resultOfPreviousCalculation +
              keyEntered,
            previousKeyEntered: "operation",
            decimalCleared: true,
            lastOperationEntered: keyEntered,
          });
        } else {
          this.setState({
            inputDisplay: keyEntered,
            readoutDisplay: this.state.readoutDisplay + keyEntered,
            previousKeyEntered: "operation",
            decimalCleared: true,
            lastOperationEntered: keyEntered,
          });
        }

        break;

      // equals key is pressed  // update state with calculation
      case event.target.className === "equals":
        this.setState({
          decimalCleared: true,
          previousKeyEntered: "equals",
        });

        this.calculateResults(this.state.readoutDisplay);

        break;

      // AC button is pressed
      case event.target.id === "clear":
        this.setState({
          readoutDisplay: "",
          inputDisplay: "0",
          decimalCleared: true,
          previousKeyEntered: "number",
        });

        break;

      default:
        break;
    }
  };

  render() {
    return (
      <div id="wrapper">
        <div id="readout">
          <div id="inp">{this.state.readoutDisplay}</div>
          <div id="display">{this.state.inputDisplay}</div>
        </div>
        {DATA.map((i) => (
          <Buttons
            buttonID={i.id}
            buttonLabel={i.buttonLabel}
            buttonValue={i.buttonValue}
            buttonType={i.buttonType}
            handleClick={this.processInput}
            key={i.id}
          />
        ))}
      </div>
    );
  }
}

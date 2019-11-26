import React, { Component } from "react";
import "./App.css";
import Buttons from "./Buttons.js";

const DATA = [
  { buttonValue: "", buttonLabel: "AC", id: "clear", buttonType: "clear" },
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
var Parser = require("expr-eval").Parser;

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      readoutDisplay: "0",
      inputDisplay: "0",
      previousKeyEntered: "number",
      decimalCleared: true
    };
  }

  calculateResults = () => {
    let expr = Parser.parse(this.state.readoutDisplay);
    this.setState({
      readoutDisplay: this.state.readoutDisplay + " = " + expr.evaluate({}),
      inputDisplay: expr.evaluate({})
    });
  };
  removeDuplicateEntries = inp => {};

  processInput = event => {
    // exit immediately on first load of component as no input provided yet
    if (event === undefined) {
      return;
    }

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
          previousKeyEntered: "number"
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
          decimalCleared: false
        });
        break;

      // any math key is pressed
      case event.target.className === "operation" &&
        this.state.previousKeyEntered !== "operation":
        this.setState({
          inputDisplay: keyEntered,
          readoutDisplay: this.state.readoutDisplay + keyEntered,
          previousKeyEntered: "operation",
          decimalCleared: true
        });

        break;

      // equals key is pressed
      case event.target.className === "equals":
        this.setState({
          decimalCleared: true
        });
        this.calculateResults(inp); // update state with calculation
        break;

      // AC button is pressed
      case event.target.id === "clear":
        this.setState({
          readoutDisplay: "0",
          inputDisplay: "0",
          decimalCleared: true,
          previousKeyEntered: "number"
        });
        console.log("processInput says: " + this.state.inputDisplay);
        break;

      default:
        break;
    }
  };

  render() {
    return (
      <div id="wrapper">
        <div id="readout">
          {this.processInput()}
          <div id="inp">{this.state.readoutDisplay}</div>
          <div id="display">{this.state.inputDisplay}</div>
          {console.log("component says: " + this.state.inputDisplay)}
        </div>
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

import React, { Component } from "react";
import "./App.css";
import CalcElement from "./CalcElement.js";

/*
1: a clickable element containing an =(equal sign) with a corresponding id="equals".
2: 10 clickable elements containing one number each from 0-9, with the following corresponding IDs: id="zero", id="one", id="two", id="three", id="four", id="five", id="six", id="seven", id="eight", and id="nine".
3: 4 clickable elements each containing one of the 4 primary mathematical operators with the following corresponding IDs: id="add", id="subtract", id="multiply", id="divide".
4: a clickable element containing a .(decimal point) symbol with a corresponding id="decimal".
5: a clickable element with an id="clear".
6: an element to display values with a corresponding id="display".
7: At any time, pressing the clear button clears the input and output values, and returns the calculator to its initialized state; 0 should be shown in the element with the id of display.
8: As I input numbers, I should be able to see my input in the element with the id of display.
9: In any order, I should be able to add, subtract, multiply and divide a chain of numbers of any length, and when I hit =, the correct result should be shown in the element with the id of display.
10: When inputting numbers, my calculator should not allow a number to begin with multiple zeros.
11: When the decimal element is clicked, a .should append to the currently displayed value; two .in one number should not be accepted.
12: I should be able to perform any operation (+, -, *, /) on numbers containing decimal points.
13: If 2 or more operators are entered consecutively, the operation performed should be the last operator entered.
14: Pressing an operator immediately following =should start a new calculation that operates on the result of the previous evaluation.
15: My calculator should have several decimal places of precision when it comes to rounding (note that there is no exact standard, but you should be able to handle calculations like 2 / 7with reasonable precision to at least 4 decimal places).

checker: https://cdn.freecodecamp.org/testable-projects-fcc/v1/bundle.js
*/
const DATA = [
  { buttonDisplay: "", id: "disp" },
  { buttonDisplay: 0, id: "inp" },
  { buttonDisplay: "AC", id: "ac" },
  { buttonDisplay: "/", id: "oDiv" },
  { buttonDisplay: "X", id: "oMult" },
  { buttonDisplay: "7", id: "seven" },
  { buttonDisplay: "8", id: "eight" },
  { buttonDisplay: "9", id: "nine" },
  { buttonDisplay: "-", id: "oSub" },
  { buttonDisplay: "4", id: "four" },
  { buttonDisplay: "5", id: "five" },
  { buttonDisplay: "6", id: "six" },
  { buttonDisplay: "+", id: "oPlus" },
  { buttonDisplay: "1", id: "one" },
  { buttonDisplay: "2", id: "two" },
  { buttonDisplay: "3", id: "three" },
  { buttonDisplay: "=", id: "oEquals" },
  { buttonDisplay: "0", id: "eZero" },
  { buttonDisplay: ".", id: "oDot" }
];
class App extends Component {
  state = {
    display: "0",
    inputDisplay: 0,
    entries: "",
    operand: ""
  };

  componentDidMount = () => {
    this.setState({ display: "0", inputDisplay: 0 });
  };

  updateLabel = e => {
    switch (true) {
      case e === "inp":
        return this.state.inputDisplay;

      case e === "disp":
        return this.state.display;

      default:
        return e.buttonDisplay;
    }
  };

  render() {
    return (
      <div id="wrapper">
        {DATA.map(e => (
          <CalcElement
            element={e.id}
            btnLabel={this.updateLabel(e)}
            dispLabel={this.state.inputDisplay}
            key={Math.random()}
          />
        ))}
      </div>
    );
  }
}
export default App;

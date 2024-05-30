import { useReducer } from "react";
import { evaluate } from "mathjs";
import CalculatorButton from "./CalculatorButton";
import CalculatorResult from "./CalculatorResult";
import { CalculatorAction, CalculatorResultTypes } from "./types";
// eslint-disable-next-line no-useless-escape
const operatorRegex = /\+|\-|\*|\//g;
/**
 * Renders a calculator component with a display and buttons for numbers, operators, and other functions.
 * @return {JSX.Element} The JSX element representing the calculator component.
 */
const Calculator = (): JSX.Element => {
  /**Ｆ
   * Reduces the state of the calculator based on the given action.
   * @param {CalculatorResultTypes} state - The current state of the calculator.
   * @param {CalculatorAction} action - The action to be performed on the calculator.
   * @return {CalculatorResultTypes} The new state of the calculator after the action is performed.
   */
  const calcReducer = (
    state: CalculatorResultTypes,
    action: CalculatorAction
  ): CalculatorResultTypes => {
    const lastKeyValue = state.calcValue[state.calcValue.length - 1];
    const lastNumber = state.calcValue.split(operatorRegex).slice(-1)[0];
    switch (action.type) {
      case "+":
      case "-":
      case "*":
      case "/":
        // Implement the logic for these operations
        return clickOperatorBtn(state.calcValue, action.type); // Placeholder to avoid TS error
      case "=":
        if (checkIsLastCharacterOperator(lastKeyValue)) return state;
        return clickCalculate(state.calcValue);
      case ".":
        // Implement the logic for dot operation
        if (
          lastKeyValue === "." ||
          checkIsLastCharacterOperator(lastKeyValue) ||
          lastNumber.includes(".")
        ) {
          return state;
        } else {
          return { calcValue: state.calcValue + "." };
        }
      case "c":
        // Reset calcValue to 0
        return { calcValue: "0" };
      case "DEL":
        // Delete last character
        if (state.calcValue === "0") {
          return state;
        } else {
          const val =
            state.calcValue.slice(0, -1) === ""
              ? "0"
              : state.calcValue.slice(0, -1);
          return { calcValue: val };
        }
      case 0:
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
      case 7:
      case 8:
      case 9:
        return clickNumberBtn(state.calcValue, action.type.toString());
      default:
        throw new Error("Unexpected action");
    }
  };

  /**
   * Generates a new CalculatorResultTypes object based on the current string and target number string.
   * @param {string} currentStr - The current string value.
   * @param {string} targetNumString - The target number string to concatenate with the current string.
   * @return {CalculatorResultTypes} The new CalculatorResultTypes object.
   */
  const clickNumberBtn = (
    currentStr: string,
    targetNumString: string
  ): CalculatorResultTypes => {
    let returnNumStr: CalculatorResultTypes = { calcValue: "0" };
    // If the current string is 0, replace it with the target number string
    currentStr === "0"
      ? (returnNumStr = { calcValue: targetNumString })
      : (returnNumStr = {
          calcValue: currentStr.concat(targetNumString),
        });
    return returnNumStr;
  };

  /**
   * ClickOperatorBtn is a function that takes in a current string and a target operator string, and returns a CalculatorResultTypes object.
   * @param {string} currentStr - The current string.
   * @param {string} targetOperatorString - The target operator string.
   * @return {CalculatorResultTypes} The CalculatorResultTypes object.
   */
  const clickOperatorBtn = (
    currentStr: string,
    targetOperatorString: string
  ): CalculatorResultTypes => {
    let returnStr: CalculatorResultTypes = { calcValue: "0" };
    const lastAlphabet = currentStr[currentStr.length - 1];
    if (!checkIsLastCharacterOperator(lastAlphabet)) {
      // if the last character is not an operator, add the operator to the end of the string
      returnStr = { calcValue: currentStr.concat(targetOperatorString) };
    } else {
      // if the last character is an operator, remove the operator from the end of the string
      returnStr = {
        calcValue: currentStr
          .slice(0, currentStr.length - 1)
          .concat(targetOperatorString),
      };
    }
    return returnStr;
  };

  /**
   * Clicks the calculate button and returns the result of the calculation.
   * @param {string} currentStr - The string representing the current state of the calculator.
   * @return {CalculatorResultTypes} The result of the calculation. If an error occurs, returns { calcValue: "NaN" }.
   */
  const clickCalculate = (currentStr: string): CalculatorResultTypes => {
    try {
      return { calcValue: String(evaluate(currentStr)) };
    } catch (error) {
      return { calcValue: "NaN" };
    }
  };

  /**
   * Checks if the last character of the given string is an operator.
   * @param {string} currentStr - The string to check.
   * @return {boolean} True if the last character is an operator, false otherwise.
   */
  const checkIsLastCharacterOperator = (currentStr: string): boolean => {
    const lastAlphabet = currentStr[currentStr.length - 1];

    return lastAlphabet.match(operatorRegex) !== null;
  };

  const INITIAL_STATE: CalculatorResultTypes = { calcValue: "0" };
  const [calcResult, dispatch] = useReducer(calcReducer, INITIAL_STATE);
  return (
    <div className="w-[390px] h-[580px] bg-sky-950 rounded-3xl shadow-black shadow-2xl text-white p-4 flex justify-start items-start flex-col">
      <CalculatorResult value={calcResult?.calcValue}></CalculatorResult>

      <div className="flex h-full w-full relative">
        <div className="mt-3 w-full flex items-center justify-start flex-col">
          <CalculatorButton
            actions="c"
            onClick={() => dispatch({ type: "c" })}
          ></CalculatorButton>
          <CalculatorButton
            actions="7"
            onClick={() => dispatch({ type: 7 })}
          ></CalculatorButton>
          <CalculatorButton
            actions="4"
            onClick={() => dispatch({ type: 4 })}
          ></CalculatorButton>
          <CalculatorButton
            actions="1"
            onClick={() => dispatch({ type: 1 })}
          ></CalculatorButton>
        </div>
        <div className="mt-3 w-full flex items-center justify-start flex-col">
          <CalculatorButton
            actions="DEL"
            onClick={() => dispatch({ type: "DEL" })}
          ></CalculatorButton>
          <CalculatorButton
            actions="8"
            onClick={() => dispatch({ type: 8 })}
          ></CalculatorButton>
          <CalculatorButton
            actions="5"
            onClick={() => dispatch({ type: 5 })}
          ></CalculatorButton>
          <CalculatorButton
            actions="2"
            onClick={() => dispatch({ type: 2 })}
          ></CalculatorButton>
        </div>
        <div className="mt-3 w-full flex items-center justify-start flex-col">
          <CalculatorButton
            actions="/"
            onClick={() => dispatch({ type: "/" })}
          ></CalculatorButton>
          <CalculatorButton
            actions="9"
            onClick={() => dispatch({ type: 9 })}
          ></CalculatorButton>
          <CalculatorButton
            actions="6"
            onClick={() => dispatch({ type: 6 })}
          ></CalculatorButton>
          <CalculatorButton
            actions="3"
            onClick={() => dispatch({ type: 3 })}
          ></CalculatorButton>
          <CalculatorButton
            actions="."
            onClick={() => dispatch({ type: "." })}
          ></CalculatorButton>
        </div>
        <div className="mt-3 w-full flex items-center justify-start flex-col">
          <CalculatorButton
            actions="*"
            onClick={() => dispatch({ type: "*" })}
          ></CalculatorButton>
          <CalculatorButton
            actions="-"
            onClick={() => dispatch({ type: "-" })}
          ></CalculatorButton>
          <CalculatorButton
            actions="+"
            onClick={() => dispatch({ type: "+" })}
          ></CalculatorButton>
          <CalculatorButton
            actions="="
            onClick={() => dispatch({ type: "=" })}
          ></CalculatorButton>
        </div>
        <CalculatorButton
          actions="0"
          onClick={() => dispatch({ type: 0 })}
        ></CalculatorButton>
      </div>
    </div>
  );
};

export default Calculator;

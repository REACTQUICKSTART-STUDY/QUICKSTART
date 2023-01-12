/* 
  제어 컴포넌트로 만든 사칙연산,
  PropTypes를 이용한 유효성 검증 
*/
import React from "react";
import PropTypes from "prop-types";
import { Operands } from "../App";

type CalcPropsType = {
  operands: Operands;
  operator: string;
  handleOperand: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleOperator: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Calc = ({
  operands,
  operator,
  handleOperand,
  handleOperator,
}: CalcPropsType) => {
  let result: number | string = 0;
  switch (operator.trim()) {
    case "+":
      result = operands.x + operands.y;
      break;
    case "-":
      result = operands.x - operands.y;
      break;
    case "*":
      result = operands.x * operands.y;
      break;
    case "/":
      result = operands.x / operands.y;
      break;
    default:
      result = "`+, -, *, /` 만 입력";
  }
  return (
    <div className="card card-body bg-light mb-3">
      <h4>제어 컴포넌트</h4>
      <h5>
        사칙 연산자:{" "}
        <input type="text" value={operator} onChange={handleOperator} />
      </h5>
      <div className="ms-2">
        <input
          type="number"
          name="x"
          value={operands.x}
          onChange={handleOperand}
        />{" "}
        {operator}{" "}
        <input
          type="number"
          name="y"
          value={operands.y}
          onChange={handleOperand}
        />{" "}
        = {result}
        <div>
          연산자가 +, -, *, /가 아니거나 2번째 피연산자가 홀수가 아니면 콘솔에
          1회 경고
        </div>
      </div>
    </div>
  );
};

const calcChecker = (props: any, propName: string, componentName: string) => {
  if (propName === "operator") {
    if (
      props[propName] !== "+" &&
      props[propName] !== "-" &&
      props[propName] !== "*" &&
      props[propName] !== "/"
    ) {
      return new Error(
        `${propName} 속성의 값은 반드시 '+', '-', '*', '/'만 허용합니다(at ${componentName})`
      );
    }
  }
  if (propName === "operands") {
    let y = props[propName].y;
    if (y % 2 === 0) {
      return new Error(
        `2번째(y) ${propName} 속성의 값은 홀수만 허용합니다(at ${componentName})`
      );
    }
  }
};

Calc.propTypes = {
  operands: calcChecker,
  operator: calcChecker,
  handleOperand: PropTypes.func.isRequired,
  handleOperator: PropTypes.func.isRequired,
};

export default Calc;

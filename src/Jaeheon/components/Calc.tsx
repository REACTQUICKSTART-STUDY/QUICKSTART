import React from "react";
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
  switch (operator) {
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
      <h3>
        사칙 연산 방식:{" "}
        <input type="text" value={operator} onChange={handleOperator} />
      </h3>
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
      </div>
    </div>
  );
};

export default Calc;

import React from "react";
import { connectMousePos, PositionType } from "./connectMousePos";
import { connectClockTime, TimeFormatEnum } from "./connectClockTime";

type PropsType = { currentTime: string; position: PositionType };

const child = (props: PropsType) => {
  return (
    <div>
      <h2>고차 컴포넌트 사용하기</h2>
      <div>현재 시각 : {props.currentTime}</div>
      <hr />
      <div>
        마우스 위치: {props.position.x}, {props.position.y}
      </div>
    </div>
  );
};

export default connectMousePos(
  connectClockTime(child, TimeFormatEnum.HHmmssKOR, 5000)
);

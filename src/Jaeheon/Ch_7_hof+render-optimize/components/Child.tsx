import React from "react";
import { TimeFormatEnum } from "../../Ch_6_react-hook/hooks/useClockTime";
import { connectClockTime } from "../HOF/connectClockTime";
import { connectMousePos, PositionType } from "../HOF/connectMousePos";

type Props = {
  currentTime: string;
  position: PositionType;
};

const Child = ({ currentTime, position }: Props) => {
  return (
    <div>
      <h2>고차 컴포넌트 사용하기</h2>
      <div>현재 시각 : {currentTime}</div>
      <hr />
      <div>
        마우스 위치 : {position.x}, {position.y}
      </div>
    </div>
  );
};

export default connectMousePos(
  connectClockTime(Child, TimeFormatEnum.HHmmssKOR, 1000)
);

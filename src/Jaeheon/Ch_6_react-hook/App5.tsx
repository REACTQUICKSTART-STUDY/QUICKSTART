import React from "react";
import { TimeFormatEnum, useClockTime } from "./hooks/useClockTime";

type Props = {};

const App5 = (props: Props) => {
  const currentTime = useClockTime(1000, TimeFormatEnum.HHmmssKOR);

  return (
    <div style={{ border: "1px solid gray", padding: "5px", margin: "5px" }}>
      <h2>현재 시각 (사용자 정의 훅 사용)</h2>
      <hr />
      <div>{currentTime}</div>
    </div>
  );
};

export default App5;

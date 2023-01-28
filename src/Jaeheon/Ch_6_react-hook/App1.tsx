import React, { useEffect, useState } from "react";
import Clock from "./components/Clock";

type Props = {};

const App1 = (props: Props) => {
  const [formatString, setFormatString] = useState("HH:mm:ss");
  const [clockVisible, setClockVisible] = useState(false);

  return (
    <div style={{ border: "1px solid gray", padding: "5px", margin: "5px" }}>
      <h2>간단한 디지털 시계 (useEffect 사용)</h2>
      <button onClick={() => setClockVisible(!clockVisible)}>
        시계 토글하기
      </button>
      <hr />
      {clockVisible ? <Clock formatString={formatString} /> : ""}
    </div>
  );
};

export default App1;

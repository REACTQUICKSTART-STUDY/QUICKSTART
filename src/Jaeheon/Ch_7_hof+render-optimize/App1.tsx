import React from "react";
import Child from "./components/Child";

type Props = {};

const App1 = (props: Props) => {
  return (
    <div>
      <h2>고차 컴포넌트 테스트</h2>
      <hr />
      <Child />
    </div>
  );
};

export default App1;

import React, { useRef, useState } from "react";

type Props = {};

const App3 = (props: Props) => {
  const [name, setName] = useState<string>("소재헌");
  const refTel = useRef<string>("010-4895-5312");
  return (
    <div style={{ border: "1px solid gray", padding: "5px", margin: "5px" }}>
      <h2>State, Ref 렌더링 차이</h2>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <div>상태(name) : {name}</div>
      <input
        type="text"
        defaultValue={refTel.current}
        onChange={(e) => (refTel.current = e.target.value)}
      />
      <div> refTel 값 : {refTel.current}</div>
    </div>
  );
};

export default App3;

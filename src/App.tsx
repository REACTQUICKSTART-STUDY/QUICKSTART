import React, { useState } from "react";
import CountryList from "./CountryList";

export type CountryType = {
  no: number;
  country: string;
  visited: boolean;
};

const App = () => {
  const [msg, setMsg] = useState<string>("오늘 하루, ");
  const addResult = (x: string, y: string, z: string) => {
    return (
      <div className="card card-body bg-light mb-3">
        {x} + {y} === {z}
      </div>
    );
  };

  const [list, setList] = useState<Array<CountryType>>([
    { no: 1, country: "대한민국", visited: false },
    { no: 2, country: "멕시코", visited: true },
    { no: 3, country: "아르헨티나", visited: true },
    { no: 4, country: "브라질", visited: false },
  ]);

  const msgStateChange = () => {
    return setMsg(msg === "오늘 하루, " ? "수고했어, " : "오늘 하루, ");
  };

  const listDelete = () => {
    return setList(list.slice(1));
  };

  return (
    <div className="container">
      <button onClick={msgStateChange}>
        <h2>{msg}안녕</h2>
      </button>
      <hr className="dash-style" />
      {addResult("UX", "Programming", "David")}
      <CountryList countries={list} />
      <button className="delte-btn" onClick={listDelete}>
        위부터 삭제
      </button>
    </div>
  );
};

export default App;

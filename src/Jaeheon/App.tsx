import React, { useState } from "react";
import BucketList from "./components/BucketList";

type Props = {};

export type Bucket = {
  id: number;
  task: string;
  done: boolean;
};

const App = (props: Props) => {
  const [myName, setMyName] = useState<string>("???????");
  const nameLetters: string[] = ["J", "a", "e", "h", "e", "o", "n"];
  const [idxHistory, setIdxHistory] = useState<number[]>([]);

  const [bucketList, setBucketList] = useState<Bucket[]>([
    { id: 1, task: "스카이다이빙", done: false },
    { id: 2, task: "월드컵 결승 직관", done: false },
    { id: 3, task: "유럽여행", done: true },
    { id: 4, task: "100억 모으기", done: false },
  ]);

  const handleName = () => {
    if (idxHistory.length > 6) return;
    let randomNum = Math.floor(Math.random() * 7);
    while (idxHistory.includes(randomNum)) {
      randomNum = Math.floor(Math.random() * 7);
    }
    setIdxHistory((prev) => {
      const newHistory = prev.map((item) => item);
      newHistory.push(randomNum);
      return newHistory;
    });
    setMyName((prev) => {
      let newName = prev.split("");
      newName.splice(randomNum, 1, nameLetters[randomNum]);
      return newName.join("");
    });
  };

  const addResult = (x: number, y: number) => {
    return (
      <div className="card card-body bg-light mb-3">
        {x}+{y} = {x + y}
      </div>
    );
  };

  return (
    <div className="container">
      <h2 className="my-3">
        Hello{" "}
        {myName.includes("?") ? (
          <>
            <span className="border rounded bg-light px-2" onClick={handleName}>
              {myName}
            </span>
            {" <-- Click"}
          </>
        ) : (
          myName + "!!!"
        )}
      </h2>
      <hr />
      {addResult(1, 3)}
      <BucketList bucketList={bucketList} setBucketList={setBucketList} />
    </div>
  );
};

export default App;

import React, { useState } from "react";
import BucketList from "./components/BucketList";
import {
  BasicButton,
  FooterThemeChangeButton,
  ItalicButton,
  UnderLineButton,
  WhiteUnderLineButton,
} from "./components/Buttons";
import Calc from "./components/Calc";
import Footer from "./components/Footer";
import MyName from "./components/MyName";

type Props = {};

export type Bucket = {
  id: number;
  task: string;
  done: boolean;
};

export type Operands = {
  x: number;
  y: number;
};

const App = (props: Props) => {
  const [myName, setMyName] = useState<string>("???????");
  const nameLetters: string[] = ["J", "a", "e", "h", "e", "o", "n"];
  const [idxHistory, setIdxHistory] = useState<number[]>([]);

  const [operands, setOperands] = useState<Operands>({ x: 100, y: 300 });
  const [operator, setOperator] = useState<string>("+");

  const [theme, setTheme] = useState<string>("basic");

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

  const handleOperand = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setOperands({ ...operands, [name]: Number(value) });
  };

  const handleOperator = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOperator(e.target.value);
  };

  const handleTheme = () => {
    setTheme(theme === "basic" ? "no-basic" : "basic");
  };

  return (
    <div className="container">
      <MyName myName={myName} handleName={handleName} />
      <hr />
      <Calc
        operands={operands}
        operator={operator}
        handleOperand={handleOperand}
        handleOperator={handleOperator}
      />
      <BucketList bucketList={bucketList} setBucketList={setBucketList} />
      <div className="d-flex justify-content-center mt-3">
        <BasicButton>기본</BasicButton>
        <ItalicButton>이탤릭</ItalicButton>
        <UnderLineButton>언더라인</UnderLineButton>
        <WhiteUnderLineButton>화이트 언더라인</WhiteUnderLineButton>
        <FooterThemeChangeButton onClick={handleTheme}>
          Footer Theme Change
        </FooterThemeChangeButton>
      </div>
      <Footer theme={theme} />
    </div>
  );
};

export default App;

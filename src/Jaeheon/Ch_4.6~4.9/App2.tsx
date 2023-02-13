import React from "react";
import produce from "immer";
type Props = {};

// 불변성 라이브러리 immer 테스트
const App2 = (props: Props) => {
  const quiz = {
    students: ["라이언", "어피치", "네오", "프로도", "제이지", "튜브"],
    quizlist: [
      {
        question: "2023/1/14 기준 epl 리그 1위팀은?",
        options: [
          { no: 1, option: "맨시티" },
          { no: 2, option: "리버풀" },
          { no: 3, option: "맨유" },
          { no: 4, option: "아스날" },
        ],
        answer: 4,
      },
      {
        question: "2022 롤드컵 결승 5세트에 등장한 챔피언이 아닌 것은?",
        options: [
          { no: 1, option: "헤카림" },
          { no: 2, option: "사일러스" },
          { no: 3, option: "케이틀린" },
          { no: 4, option: "아지르" },
        ],
        answer: 2,
      },
    ],
  };
  const quiz2 = produce(quiz, (draft) => {
    draft.quizlist[0].options[0].option = "토트넘";
  });

  // false, false, false, true, false, true, true
  console.log(quiz === quiz2);
  console.log(quiz.quizlist === quiz2.quizlist);
  console.log(quiz.quizlist[0] === quiz2.quizlist[0]);
  console.log(quiz.quizlist[1] === quiz2.quizlist[1]);
  console.log(quiz.quizlist[0].options === quiz2.quizlist[0].options);
  console.log(quiz.quizlist[0].options[1] === quiz2.quizlist[0].options[1]);
  console.log(quiz.students === quiz2.students);

  return <div>불변성 라이브러리 immer 테스트</div>;
};

export default App2;

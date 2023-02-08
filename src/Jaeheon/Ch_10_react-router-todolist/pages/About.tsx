import React from "react";

type AboutProps = {};

const About = ({}: AboutProps) => {
  return (
    <div className="card card-body">
      <h2>About</h2>
      <h5>안녕 내 이름은 소재헌</h5>
      <h5>태어난 날은 1998년 3월 13일</h5>
      <h5>취미는 해축보기, 배드민턴, 당구</h5>
      <h5>모두 행복한 하루 보내세요^^</h5>
    </div>
  );
};

export default About;

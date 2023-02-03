import React from "react";
import { useNavigate } from "react-router";
import { MemberType } from "../App1";

type MemberPropsType = {
  members: MemberType[];
};

const Members = ({ members }: MemberPropsType) => {
  const navigate = useNavigate();

  const imgStyle = { width: 150, height: 200 };
  const list = members.map((member) => (
    <div key={member.name} className="col-6 col-md-4 col-lg-3">
      <img
        src={member.photo}
        alt={member.name}
        className="img-thumbnail"
        style={imgStyle}
      />
      <br />
      <h6>{member.name}</h6>
      <br />
      <br />
    </div>
  ));

  const goHome = () => {
    if (confirm("정말로 홈으로 이동할까요?")) {
      navigate("/", { state: { from: "/members" } });
    }
  };

  return (
    <div>
      <h2 className="m-4">Members</h2>
      <div className="container">
        <div className="row">{list}</div>
      </div>
      <button className="btn btn-secondary mb-3" onClick={goHome}>
        Go Home
      </button>
    </div>
  );
};

export default Members;

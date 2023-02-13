import pMinDelay from "p-min-delay";
import React from "react";
import { useNavigate } from "react-router";
import { MemberType } from "../App1";
import LoadingImage from "../components/LoadingImage";
// import MemberImage from "../components/MemberImage";

type MemberPropsType = {
  members: MemberType[];
};

const MemberImage = React.lazy(() =>
  pMinDelay(import("../components/MemberImage"), 1000)
);

const Members = ({ members }: MemberPropsType) => {
  const navigate = useNavigate();

  const list = members.map((member) => (
    <div key={member.name} className="col-6 col-md-4 col-lg-3">
      <React.Suspense fallback={<LoadingImage />}>
        <MemberImage member={member} />
      </React.Suspense>
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

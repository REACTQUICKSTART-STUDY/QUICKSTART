import React from "react";
import { useLocation } from "react-router";

type Props = {};

const NotFound = (props: Props) => {
  const { pathname } = useLocation();
  return (
    <div className="m-3">
      <h3>존재하지 않은 경로</h3>
      <p>요청 경로 : {pathname}</p>
    </div>
  );
};

export default NotFound;

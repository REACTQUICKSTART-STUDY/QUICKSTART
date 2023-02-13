import React from "react";
import { useLocation } from "react-router";

type HomePropsType = {};

type LocationStateType = {
  from: string;
};

const Home = ({}: HomePropsType) => {
  const location = useLocation();
  const state: LocationStateType = location.state;

  return (
    <div className="card card-body">
      <h2>Home</h2>
      {state?.from ? <h4>state.from : {state?.from}</h4> : ""}
    </div>
  );
};

export default Home;

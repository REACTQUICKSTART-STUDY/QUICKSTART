import React from "react";
import { ScaleLoader } from "react-spinners";

type Props = {};

const LoadingVideo = (props: Props) => {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "528.75px" }}
    >
      <div>
        <h3>Loading</h3>
        <ScaleLoader width="6px" height="40px" radius="2px" margin="2px" />
      </div>
    </div>
  );
};

export default LoadingVideo;

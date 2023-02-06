import React from "react";
import { ScaleLoader } from "react-spinners";

type Props = {};

const Loading = (props: Props) => {
  return (
    <div className="top-0 bottom-0 start-0 end-0 position-absolute m-auto">
      <div className="row w-100 h-100 d-flex justify-content-center align-items-center">
        <div className="text-center">
          <h3>Loading</h3>
          <ScaleLoader width="6px" height="40px" radius="2px" margin="2px" />
        </div>
      </div>
    </div>
  );
};

export default Loading;

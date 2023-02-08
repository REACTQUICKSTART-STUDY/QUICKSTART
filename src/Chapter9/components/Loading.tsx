import React from "react";
import { ScaleLoader } from "react-spinners";
import PacmanLoader from "react-spinners/PacmanLoader";

const Loading = () => {
  return (
    <div className="w-100 h-75 position-fixed">
      <div className="row w-100 h-100 justify-content-center align-items-center">
        <div className="col-md-2">
          <h3 className="text-center my-3">Loading...</h3>
          {/* <ScaleLoader height='40px' width='6px' radius='2px' margin='2px' /> */}
          <PacmanLoader size='45px' margin='6px' />
        </div>
      </div>
    </div>
  )
}

export default Loading;
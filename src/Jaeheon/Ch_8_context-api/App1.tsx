import React, { useState } from "react";
import BucketFilter from "./components/BucketFilter";
import BucketList from "./components/BucketList";
import InputBucket from "./components/InputBucket";

const App = () => {
  return (
    <div className="container w-50 my-5">
      <div className="card card-body bg-light">
        <h2 className="text-center fw-bolder">BucketList App</h2>
        <div className="position-relative mx-3">
          <InputBucket />
          <BucketFilter />
        </div>
        <BucketList />
      </div>
    </div>
  );
};

export default App;

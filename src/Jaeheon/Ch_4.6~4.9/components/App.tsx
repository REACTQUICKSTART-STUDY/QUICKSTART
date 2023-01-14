import React from "react";
import { Bucket } from "../AppContainer";
import BucketList from "./BucketList";
import InputBucket from "./InputBucket";

type AppProps = {
  bucketList: Bucket[];
  addBucket: (task: string) => void;
  deleteBucket: (id: number) => void;
  editBucket: (id: number, task: string) => void;
  toggleDone: (id: number) => void;
};

const App = ({
  bucketList,
  addBucket,
  deleteBucket,
  editBucket,
  toggleDone,
}: AppProps) => {
  return (
    <div className="container w-50 my-5">
      <div className="card card-body bg-light">
        <h2 className="text-center fw-bolder">BucketList App</h2>
        <InputBucket addBucket={addBucket} />
        <BucketList
          bucketList={bucketList}
          deleteBucket={deleteBucket}
          editBucket={editBucket}
          toggleDone={toggleDone}
        />
      </div>
    </div>
  );
};

export default App;

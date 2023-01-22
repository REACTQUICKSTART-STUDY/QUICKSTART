import React, { Children, useState } from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { Bucket } from "../AppContainer";
import BucketList from "./BucketList";
import InputBucket from "./InputBucket";

type AppProps = {
  bucketList: Bucket[];
  addBucket: (task: string) => void;
  deleteBucket: (id: number) => void;
  editBucket: (id: number, task: string) => void;
  toggleDone: (id: number) => void;
  filterBucketList: (filter: string, bucketList: Bucket[]) => Bucket[];
};

const App = ({
  bucketList,
  addBucket,
  deleteBucket,
  editBucket,
  toggleDone,
  filterBucketList,
}: AppProps) => {
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [selection, setSelection] = useState<string>("모두");

  const selectFilter = (eventKey: string | null, e: any) => {
    if (eventKey) {
      setFilterStatus(eventKey);
      setSelection(e.target.innerText);
    }
  };

  return (
    <div className="container w-50 my-5">
      <div className="card card-body bg-light">
        <h2 className="text-center fw-bolder">BucketList App</h2>
        <div className="position-relative mx-3">
          <InputBucket addBucket={addBucket} />
          <DropdownButton
            id="dropdown-item-button"
            title={selection}
            onSelect={selectFilter}
            className="position-absolute top-0 end-0 my-3"
          >
            <Dropdown.Item as="button" eventKey="all">
              모두
            </Dropdown.Item>
            <Dropdown.Item as="button" eventKey="done">
              성공
            </Dropdown.Item>
            <Dropdown.Item as="button" eventKey="not-done">
              아직...
            </Dropdown.Item>
          </DropdownButton>
        </div>
        <BucketList
          bucketList={bucketList}
          filterStatus={filterStatus}
          deleteBucket={deleteBucket}
          editBucket={editBucket}
          toggleDone={toggleDone}
          filterBucketList={filterBucketList}
        />
      </div>
    </div>
  );
};

export default App;

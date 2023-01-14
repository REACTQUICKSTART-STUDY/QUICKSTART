import React from "react";
import { Bucket } from "../AppContainer";
import BucketListItem from "./BucketListItem";

type BucketListProps = {
  bucketList: Bucket[];
  deleteBucket: (id: number) => void;
  editBucket: (id: number, task: string) => void;
  toggleDone: (id: number) => void;
};

const BucketList = ({
  bucketList,
  deleteBucket,
  editBucket,
  toggleDone,
}: BucketListProps) => {
  const buckets = bucketList.map((item) => {
    return (
      <BucketListItem
        key={item.id}
        bucketItem={item}
        deleteBucket={deleteBucket}
        editBucket={editBucket}
        toggleDone={toggleDone}
      />
    );
  });

  return <ul className="list-group border-top-0 mx-3 my-2">{buckets}</ul>;
};

export default BucketList;

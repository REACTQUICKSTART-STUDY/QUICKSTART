import React from "react";
import { Bucket } from "../AppContainer";
import BucketListItem from "./BucketListItem";

type BucketListProps = {
  bucketList: Bucket[];
  filterStatus: string;
  deleteBucket: (id: number) => void;
  editBucket: (id: number, task: string) => void;
  toggleDone: (id: number) => void;
  filterBucketList: (filter: string, bucketList: Bucket[]) => Bucket[];
};

const BucketList = ({
  bucketList,
  filterStatus,
  deleteBucket,
  editBucket,
  toggleDone,
  filterBucketList,
}: BucketListProps) => {
  const buckets = filterBucketList(filterStatus, bucketList).map((item) => {
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

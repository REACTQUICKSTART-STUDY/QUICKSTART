import React, { useContext } from "react";
import BucketContext from "../contexts/BucketContext";
import BucketListItem from "./BucketListItem";

const BucketList = () => {
  const value = useContext(BucketContext);
  const buckets = value?.actions.filterBucketList().map((item) => {
    return (
      <BucketListItem
        key={item.id}
        bucketItem={item}
        deleteBucket={value.actions.deleteBucket}
        editBucket={value.actions.editBucket}
        toggleDone={value.actions.toggleDone}
      />
    );
  });

  return <ul className="list-group border-top-0 mx-3 my-2">{buckets}</ul>;
};

export default BucketList;

import React, { useState } from "react";
import App from "./components/App";
import produce from "immer";

type Props = {};

export type Bucket = {
  id: number;
  task: string;
  done: boolean;
};

// 간단한 버킷리스트 App
const AppContainer = (props: Props) => {
  const [bucketList, setBucketList] = useState<Bucket[]>([
    { id: 1, task: "스카이다이빙", done: false },
    { id: 2, task: "월드컵 결승 직관", done: false },
    { id: 3, task: "유럽여행", done: true },
    { id: 4, task: "100억 모으기", done: false },
  ]);

  const addBucket = (task: string) => {
    const newList: Bucket[] = produce(bucketList, (draft) => {
      draft.push({ id: new Date().getTime(), task: task, done: false });
    });
    setBucketList(newList);
  };

  const deleteBucket = (id: number) => {
    const index = bucketList.findIndex((item) => item.id === id);
    const newList: Bucket[] = produce(bucketList, (draft) => {
      draft.splice(index, 1);
    });
    setBucketList(newList);
  };

  const editBucket = (id: number, task: string) => {
    const index = bucketList.findIndex((item) => item.id === id);
    const newList: Bucket[] = produce(bucketList, (draft) => {
      draft[index].task = task;
    });
    setBucketList(newList);
  };

  const toggleDone = (id: number) => {
    const index = bucketList.findIndex((item) => item.id === id);
    const newList: Bucket[] = produce(bucketList, (draft) => {
      draft[index].done = !draft[index].done;
    });
    setBucketList(newList);
  };

  const filterBucketList = (filter: string, bucketList: Bucket[]) => {
    switch (filter) {
      case "done":
        return bucketList.filter((item) => item.done);
      case "not-done":
        return bucketList.filter((item) => !item.done);
      default:
        return bucketList;
    }
  };

  return (
    <App
      bucketList={bucketList}
      addBucket={addBucket}
      deleteBucket={deleteBucket}
      editBucket={editBucket}
      toggleDone={toggleDone}
      filterBucketList={filterBucketList}
    />
  );
};

export default AppContainer;

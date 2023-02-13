import React, { useState } from "react";
import produce from "immer";

type Props = {
  children: JSX.Element | JSX.Element[];
};

export type Bucket = {
  id: number;
  task: string;
  done: boolean;
};

export type BucketListContextValueType = {
  state: { bucketList: Bucket[]; filterStatus: string };
  actions: {
    addBucket: (task: string) => void;
    deleteBucket: (id: number) => void;
    editBucket: (id: number, task: string) => void;
    toggleDone: (id: number) => void;
    changeFilterStatus: (filter: string) => void;
    filterBucketList: () => Bucket[];
  };
};

const BucketContext = React.createContext<BucketListContextValueType | null>(
  null
);

// 간단한 버킷리스트 App
export const BucketProvider = ({ children }: Props) => {
  const [bucketList, setBucketList] = useState<Bucket[]>([
    { id: 1, task: "스카이다이빙", done: false },
    { id: 2, task: "월드컵 결승 직관", done: false },
    { id: 3, task: "유럽여행", done: true },
    { id: 4, task: "100억 모으기", done: false },
  ]);
  const [filterStatus, setFilterStatus] = useState<string>("all");

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

  const changeFilterStatus = (filter: string) => {
    setFilterStatus(filter);
  };

  const filterBucketList = () => {
    switch (filterStatus) {
      case "done":
        return bucketList.filter((item) => item.done);
      case "not-done":
        return bucketList.filter((item) => !item.done);
      default:
        return bucketList;
    }
  };

  const value: BucketListContextValueType = {
    state: { bucketList, filterStatus },
    actions: {
      addBucket,
      deleteBucket,
      editBucket,
      toggleDone,
      changeFilterStatus,
      filterBucketList,
    },
  };

  return (
    <BucketContext.Provider value={value}>{children}</BucketContext.Provider>
  );
};

export default BucketContext;

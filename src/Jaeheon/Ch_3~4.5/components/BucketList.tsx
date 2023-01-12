// 간단한 버킷리스트
import React, { useRef, useState } from "react";
import { Bucket } from "../App";
import BucketItem from "./BucketItem";

type BucketListPropsType = {
  bucketList: Bucket[];
  setBucketList: React.Dispatch<React.SetStateAction<Bucket[]>>;
};

const BucketList = ({ bucketList, setBucketList }: BucketListPropsType) => {
  const [inputValue, setInputValue] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  const buckets = bucketList.map((bucket, index) => {
    return (
      <BucketItem
        key={index}
        bucketItem={bucket}
        setBucketList={setBucketList}
      />
    );
  });

  const handleInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleCreate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue.length > 0) {
      setBucketList((prev) => {
        const newList: Bucket[] = prev.map((item) => item);
        newList.push({
          id: newList[newList.length - 1]?.id + 1 || 1,
          task: inputValue.trim(),
          done: false,
        });
        return newList;
      });
      setInputValue("");
    } else {
      inputRef.current?.focus();
    }
  };

  return (
    <div className="container w-75">
      <div className="d-flex justify-content-between align-items-center me-3 mb-3">
        <h2 className="mb-0">버킷 리스트</h2>
        <form className="input-group w-auto" onSubmit={handleCreate}>
          <input
            type="text"
            className="border rounded-start px-2"
            placeholder="이것만은 하고 죽는다"
            aria-label="Recipient's username"
            aria-describedby="button-addon2"
            value={inputValue}
            onChange={handleInputValue}
            ref={inputRef}
            style={{ width: "300px" }}
          />
          <button className="btn btn-success" type="submit" id="button-addon2">
            추가
          </button>
        </form>
      </div>
      <ul className="list-group">{buckets}</ul>
    </div>
  );
};

export default BucketList;

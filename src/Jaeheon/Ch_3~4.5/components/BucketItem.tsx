import React, { useRef, useState } from "react";
import { Bucket } from "../App";

type BucketItemPropsType = {
  bucketItem: Bucket;
  setBucketList: React.Dispatch<React.SetStateAction<Bucket[]>>;
};

const BucketItem = ({ bucketItem, setBucketList }: BucketItemPropsType) => {
  const [editedValue, setEditedValue] = useState<string>(bucketItem.task);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const editedRef = useRef<HTMLInputElement>(null);

  const handleDone = (id: number) => {
    setBucketList((prev) => {
      const newList: Bucket[] = prev.map((item) => {
        if (item.id === id) item.done = !item.done;
        return item;
      });
      return newList;
    });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleDelete = (id: number) => {
    setBucketList((prev) => {
      const newList: Bucket[] = prev.filter((item) => item.id !== id);
      return newList;
    });
  };

  const handleEditSubmit = (
    e: React.FormEvent<HTMLFormElement>,
    id: number
  ) => {
    e.preventDefault();
    if (editedValue.length > 0) {
      setBucketList((prev) => {
        const newList: Bucket[] = prev.map((item) => {
          if (item.id === id) item.task = editedValue.trim();
          return item;
        });
        setIsEditing(false);
        return newList;
      });
    } else {
      editedRef.current?.focus();
    }
  };

  const handleEditCancel = () => {
    setIsEditing(false);
    setEditedValue(bucketItem.task);
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedValue(e.target.value);
  };

  return (
    <li
      className={
        bucketItem.done
          ? "list-group-item bg-light d-flex justify-content-between align-items-center"
          : "list-group-item d-flex justify-content-between align-items-center"
      }
    >
      {isEditing ? (
        <>
          <form
            className="d-flex justify-content-between align-items-center w-100"
            onSubmit={(e) => handleEditSubmit(e, bucketItem.id)}
          >
            <input
              className="px-2 py-1 border rounded w-75"
              value={editedValue}
              autoFocus
              onChange={handleEditChange}
              ref={editedRef}
            />
            <div>
              <button className="btn btn-primary" type="submit">
                저장
              </button>
              <button
                className="btn btn-light border ms-3"
                onClick={handleEditCancel}
              >
                취소
              </button>
            </div>
          </form>
        </>
      ) : (
        <>
          <div className="d-flex align-items-center gap-2">
            <input
              id={bucketItem.id.toString()}
              type="checkbox"
              checked={bucketItem.done}
              onChange={() => handleDone(bucketItem.id)}
            />
            <label
              className={
                bucketItem.done
                  ? "text-decoration-line-through text-break"
                  : "text-break"
              }
              htmlFor={bucketItem.id.toString()}
            >
              {bucketItem.task}
            </label>
          </div>
          <div className="d-flex flex-shrink-0">
            {/* <button
              className={
                countryItem.visited ? "btn btn-light" : "btn btn-primary"
              }
              onClick={() => handleVisited(countryItem.no)}
            >
              {countryItem.visited ? "방문 취소" : "방문 완료"}
            </button> */}
            <button className="btn btn-secondary ms-3" onClick={handleEdit}>
              수정
            </button>
            <button
              className="btn btn-danger ms-3"
              onClick={() => handleDelete(bucketItem.id)}
            >
              삭제
            </button>
          </div>
        </>
      )}
    </li>
  );
};

export default BucketItem;

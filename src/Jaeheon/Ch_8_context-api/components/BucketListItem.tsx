import React, { useState, useRef } from "react";
import { Bucket } from "../contexts/BucketContext";

type BucketListItemProps = {
  bucketItem: Bucket;
  deleteBucket: (id: number) => void;
  editBucket: (id: number, task: string) => void;
  toggleDone: (id: number) => void;
};

const BucketListItem = ({
  bucketItem,
  deleteBucket,
  editBucket,
  toggleDone,
}: BucketListItemProps) => {
  const [editedValue, setEditedValue] = useState<string>(bucketItem.task);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const editRef = useRef<HTMLInputElement>(null);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedValue(e.target.value);
  };

  const handleEditCancel = () => {
    setIsEditing(false);
    setEditedValue(bucketItem.task);
  };

  const handleEditSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editedValue.trim().length <= 0) {
      editRef.current?.focus();
      return;
    }
    editBucket(bucketItem.id, editedValue.trim());
    setIsEditing(false);
    setEditedValue(editedValue.trim());
  };

  return (
    <li
      className={
        bucketItem.done
          ? "list-group-item list-group-item-secondary d-flex justify-content-between align-items-center"
          : "list-group-item d-flex justify-content-between align-items-center"
      }
    >
      {isEditing ? (
        <>
          <form
            className="d-flex justify-content-between align-items-center w-100"
            onSubmit={handleEditSubmit}
          >
            <input
              className="px-2 py-1 border rounded w-75"
              value={editedValue}
              autoFocus
              onChange={handleEditChange}
              ref={editRef}
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
              onChange={() => toggleDone(bucketItem.id)}
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
            <button className="btn btn-secondary ms-3" onClick={handleEdit}>
              수정
            </button>
            <button
              className="btn btn-danger ms-3"
              onClick={() => deleteBucket(bucketItem.id)}
            >
              삭제
            </button>
          </div>
        </>
      )}
    </li>
  );
};

export default BucketListItem;

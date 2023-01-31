import React, { useState, useRef, useContext } from "react";
import BucketContext from "../contexts/BucketContext";

const InputBucket = () => {
  const value = useContext(BucketContext);
  const [inputValue, setInputValue] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleBucketSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue.trim().length <= 0) {
      inputRef.current?.focus();
      return;
    }
    value?.actions.addBucket(inputValue.trim());
    setInputValue("");
  };

  return (
    <div className="d-flex justify-content-center align-items-center my-3">
      <form className="input-group w-auto" onSubmit={handleBucketSubmit}>
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
  );
};

export default InputBucket;

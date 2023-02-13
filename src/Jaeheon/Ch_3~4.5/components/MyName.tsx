// 심심해서 만들어본 랜덤으로 밝혀지는 이름
import React from "react";

type MyNamePropsType = {
  myName: string;
  handleName: () => void;
};

const MyName = ({ myName, handleName }: MyNamePropsType) => {
  return (
    <h2 className="my-3">
      Hello{" "}
      {myName.includes("?") ? (
        <>
          <span className="border rounded bg-light px-2" onClick={handleName}>
            {myName}
          </span>
          {" <-- Click"}
        </>
      ) : (
        myName + "!!!"
      )}
    </h2>
  );
};

export default MyName;

import React, { useState, useContext } from "react";
import TodoContext from "../TodoContext";

type InputTodoProps = {
  addTodo: (todo: string) => void;
};

const InputTodo = () => {
  const [todo, setTodo] = useState<string>("");

  // useContext 훅으로 TodoContext의 value값을 받아냅니다.
  const value = useContext(TodoContext);

  // value의 속성의 actions의 addTodo 함수를 호출합니다.
  const addHandler = () => {
    value?.actions.addTodo(todo);
    setTodo("");
  };

  const enterInput = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      addHandler();
    }
  };

  const changeTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodo(e.target.value);
  };

  return (
    <div className="row">
      <div className="col">
        <div className="input-group">
          <input
            type="text"
            id="msg"
            className="form-control"
            name="msg"
            placeholder="할 일 입력"
            value={todo}
            onChange={changeTodo}
            onKeyUp={enterInput}
          />
          <span
            className="btn btn-primary input-group-addon"
            onClick={addHandler}
          >
            추가
          </span>
        </div>
      </div>
    </div>
  );
};

export default InputTodo;

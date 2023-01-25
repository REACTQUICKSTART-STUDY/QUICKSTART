import { useState } from "react";
import React from "react";

type InputTodoProps = {
  addTodo: (todo: string) => void;
};

const InputTodo = (props: InputTodoProps) => {
  const [todo, setTodo] = useState<string>("");

  const addHandler = () => {
    props.addTodo(todo);
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
    <div className="row input-box">
      <div className="col">
        <div className="input-group">
          <input
            type="text"
            id="msg"
            className="form-control"
            name="msg"
            placeholder="해야할 일을 입력하세요"
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

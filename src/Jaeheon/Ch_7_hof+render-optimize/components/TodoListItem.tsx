import React, { useEffect } from "react";
import { TodoListItemType } from "../App2";

type TodoListItemPropsType = {
  todoListItem: TodoListItemType;
  deleteTodo: (id: number) => void;
};

const TodoListItem = ({ todoListItem, deleteTodo }: TodoListItemPropsType) => {
  useEffect(() => {
    console.log("## TodoListItem", todoListItem.todo);
  });
  return (
    <li>
      {todoListItem.todo} &nbsp; &nbsp;
      <button onClick={() => deleteTodo(todoListItem.id)}>삭제</button>
    </li>
  );
};

export default React.memo(TodoListItem);

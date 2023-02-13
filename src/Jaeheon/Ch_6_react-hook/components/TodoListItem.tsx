import React, { useEffect } from "react";
import { TodoListItemType } from "../App4";

type TodoListItemProps = {
  item: TodoListItemType;
  deleteTodo: (id: number) => void;
};

const TodoListItem = ({ item, deleteTodo }: TodoListItemProps) => {
  useEffect(() => {
    console.log("TodoListItem: ", item.todo);
  });
  return (
    <li>
      {item.todo}&nbsp;&nbsp;
      <button onClick={() => deleteTodo(item.id)}>삭제</button>
    </li>
  );
};

export default React.memo(TodoListItem);

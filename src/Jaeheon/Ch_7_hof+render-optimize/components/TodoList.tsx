import React, { useEffect } from "react";
import { TodoListItemType } from "../App2";
import TodoListItem from "./TodoListItem";

type TodoListPropsType = {
  todoList: TodoListItemType[];
  deleteTodo: (id: number) => void;
};

const TodoList = ({ todoList, deleteTodo }: TodoListPropsType) => {
  useEffect(() => {
    console.log("## TodoList");
  });
  return (
    <ul>
      {todoList.map((item) => (
        <TodoListItem
          key={item.id}
          todoListItem={item}
          deleteTodo={deleteTodo}
        />
      ))}
    </ul>
  );
};

export default React.memo(TodoList);

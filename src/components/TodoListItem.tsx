import React from "react";
import { TodoListItemType } from "../AppContatiner";

type TodoListItemProps = {
  todoItem: TodoListItemType;
  toggleDone: (no: number) => void;
  deleteTodo: (no: number) => void;
};

const TodoListItem = (props: TodoListItemProps) => {
  let itemClassName = "List-group-item";
  if (props.todoItem.done) itemClassName += " list-group-item-success";

  return (
    <li className={itemClassName}>
      <span className={props.todoItem.done ? "todo-done pointer" : "pointer"}>
        {props.todoItem.todo}
        {props.todoItem.done ? " (완료)" : ""}
      </span>

      <span
        className="float-end badge bg-danger pointer"
        onClick={() => props.deleteTodo(props.todoItem.no)}
      >
        삭제
      </span>
      <span
        className="float-end badge bg-info  pointer done-btn"
        onClick={() => {
          props.toggleDone(props.todoItem.no);
        }}
      >
        완료
      </span>
    </li>
  );
};

export default TodoListItem;

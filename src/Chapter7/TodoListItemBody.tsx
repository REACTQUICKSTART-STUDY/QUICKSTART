import React from "react";
import { TodoListItemType } from "./App2";

type Props = {
  todoListItem: TodoListItemType;
}

const TodoListItemBody = (props: Props) => {
  console.log('## TodoListItemBody')
  return <span>{props.todoListItem.todo}</span>
}

export default React.memo(TodoListItemBody)
import React from "react";
import { TodoListItemType } from "./App2";
import TodoListItemBody from "./TodoListItemBody";
import TodoListItemDeleteButton from "./TodoListItemDeleteButton";

type Props = {
  todoListItem: TodoListItemType;
  deleteTodo: (id: number) => void
}

const TodoListItem = (props: Props) => {
  console.log('## TodoListItem')
  return (
  <li>
    <TodoListItemBody todoListItem={props.todoListItem} />
    &nbsp;&nbsp;&nbsp;
    <TodoListItemDeleteButton id={props.todoListItem.id} deleteTodo={props.deleteTodo} />
  </li>
  )
}

export default React.memo(TodoListItem
  // , (prevProps, nextProps) => {
  // return prevProps.todoListItem === nextProps.todoListItem}
)
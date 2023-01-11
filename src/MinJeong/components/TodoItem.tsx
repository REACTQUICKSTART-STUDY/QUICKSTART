import React from 'react'
import { TodoType } from '../App'

type TodoItemPropsType = {
  todoitem: TodoType
}

const TodoItem = (props: TodoItemPropsType) => {
  let item = props.todoitem
  return (
    <li className={item.done ? "list-group-item active" : "list-group-item"}>{item.todo}</li>
  )
}

export default TodoItem
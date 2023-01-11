import React from 'react'
import { TodoType } from '../App'
import TodoItem from './TodoItem'

type TodoListPropsType = {
  todos: Array<TodoType>
}

const TodoList = (props: TodoListPropsType) => {
  const list = props.todos
  let todos = list.map((item, index) => {
    return <TodoItem key={item.no} todoitem={item} />
  })
  return (
    <ul className="list-group">{todos}</ul>
  )
}

export default TodoList
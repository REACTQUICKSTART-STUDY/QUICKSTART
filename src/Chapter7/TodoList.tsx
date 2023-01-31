import React, { useCallback, useEffect, useState } from "react";
import { TodoListItemType } from "./App2";
import TodoListItem from './TodoListItem'

type Props = {
  todoList: Array<TodoListItemType>;
  deleteTodo: (id: number) => void
}

const TodoList = (props: Props) => {
  // console.log(props.todoList)
  // const [todoList, setTodoList] = useState(props.todoList)
  // console.log(todoList)
  console.log('## Todolist')

  // const deleteTodo = useCallback((id: number) => {
  //   let newTodoList = [todoList]
  //   console.log(newTodoList)

  //   const index = todoList.findIndex((item) => item.id === id)
  //   console.log(todoList)
  //   console.log(index)

  //   newTodoList.splice(index, 1)
  //   setTodoList(newTodoList)
  // }, [todoList])

  return (
    <ul>
      {props.todoList.map((item) => (
        <TodoListItem key={item.id} todoListItem={item} 
        deleteTodo={props.deleteTodo} 
        // deleteTodo={deleteTodo} 
        />
      ))}
    </ul>
  )
}

export default React.memo(TodoList)
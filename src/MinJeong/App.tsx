import React, { useState } from 'react'
import TodoList from './components/TodoList'

export type TodoType = {
  no: number
  todo: string
  done: boolean
}


const App = () => {
  const [msg, setMsg] = useState<string>("World")
  const [list, setList] = useState<Array<TodoType>>([
    {no: 1, todo: "리액트 공부", done: false},
    {no: 2, todo: "영화 보기", done: true},
    {no: 3, todo: "드라마 보기", done: true}
  ])

  const addResult = (x: string, y: string) => {
    return (
      <div className="card card-body bg-light mb-3">
        {x} + {y} = {x + y}
      </div>
    )
  }

  return (
    <div className="container">
      <h2>Hello {msg}</h2>
      <hr className="dash-style"/>
      {addResult("리액트를", "배워 봅시다")}
      <TodoList todos={list}/>
    </div>
  )
}

export default App
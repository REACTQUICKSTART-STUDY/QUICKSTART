import React, { useCallback, useState } from "react";
import Child from "./child";
import TodoList from "./TodoList";

export type TodoListItemType = { id: number; todo: string };

function App() {
  const [todoList, setTodoList] = useState<Array<TodoListItemType>>([]);
  const [todo, setTodo] = useState<string>("");

  const addTodo = useCallback(
    (todo: string) => {
      let newTodoList = [...todoList, { id: new Date().getTime(), todo: todo }];
      setTodoList(newTodoList);
      setTodo("");
    },
    [todoList]
  );

  const deleteTodo = useCallback(
    (id: number) => {
      let newTodoList = [...todoList];
      const index = todoList.findIndex((item) => item.id === id);
      newTodoList.splice(index, 1);
      setTodoList(newTodoList);
    },
    [todoList]
  );

  return (
    <div className="App">
      <h2>고차 컴포넌트 테스트</h2>
      <hr />
      <Child></Child>

      <br />
      <hr />

      <div className="boxStyle">
        <input type="text" value={todo} onChange={(e) => e.target.value} />
        <button
          onClick={() => {
            addTodo(todo);
          }}
        >
          Add Todo
        </button>
        <br />
        <TodoList todoList={todoList} deleteTodo={deleteTodo} />
        <div>todo 개수 : {todoList.length}</div>
      </div>
    </div>
  );
}

export default App;

import React, { useState, useRef, useMemo, useCallback } from "react";
import TodoListItem from "./components/TodoListItem";

type Props = {};

export type TodoListItemType = {
  id: number;
  todo: string;
};

const App4 = (props: Props) => {
  const [todoList, setTodoList] = useState<TodoListItemType[]>([]);
  const [todo, setTodo] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  const addTodo = useCallback((todo: string) => {
    if (todo.length <= 0) {
      inputRef.current?.focus();
      return;
    }
    setTodoList((todoList) => [
      ...todoList,
      { id: new Date().getTime(), todo: todo },
    ]);
    setTodo("");
  }, []);

  const deleteTodo = useCallback((id: number) => {
    setTodoList((todoList) => todoList.filter((item) => item.id !== id));
  }, []);

  const getTodoListCount = useMemo<number>(() => {
    console.log("TodoList Count : ", todoList.length);
    return todoList.length;
  }, [todoList]);

  return (
    <div style={{ border: "1px solid gray", padding: "5px", margin: "5px" }}>
      <h2>간단한 TodoList (최적화 적용, useReducer 사용 X)</h2>
      <input
        type="text"
        ref={inputRef}
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        onKeyUp={(e) => {
          if (e.key === "Enter") addTodo(todo);
        }}
      />
      <button onClick={() => addTodo(todo)}>할일 추가</button>
      <ul>
        {todoList.map((item) => (
          <TodoListItem key={item.id} item={item} deleteTodo={deleteTodo} />
        ))}
      </ul>
      <div>todo 개수 : {getTodoListCount}</div>
    </div>
  );
};

export default App4;

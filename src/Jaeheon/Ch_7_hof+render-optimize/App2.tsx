import React, { useState, useRef, useMemo, useCallback } from "react";
import TodoList from "./components/TodoList";

type Props = {};

export type TodoListItemType = {
  id: number;
  todo: string;
};

const App2 = (props: Props) => {
  const [todoList, setTodoList] = useState<TodoListItemType[]>([
    { id: 1, todo: "아침" },
    { id: 2, todo: "점심" },
    { id: 3, todo: "롤" },
  ]);
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
      <h2>간단한 TodoList (useMemo, useCallback, React.memo 최적화 적용)</h2>
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
      <TodoList todoList={todoList} deleteTodo={deleteTodo} />
      <div>todo 개수 : {getTodoListCount}</div>
    </div>
  );
};

export default App2;

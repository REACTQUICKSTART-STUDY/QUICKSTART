import React, {
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import TodoListItem from "./components/TodoListItem";
import {
  TodoActionCreator,
  TodoItemType,
  TodoReducer,
} from "./reducer/TodoReducer";

type Props = {};

const initialTodoList: TodoItemType[] = [
  { id: 1, todo: "아침" },
  { id: 2, todo: "점심" },
  { id: 3, todo: "롤" },
];

const App2 = (props: Props) => {
  const [todoList, dispatchTodoList] = useReducer(TodoReducer, initialTodoList);
  const [todo, setTodo] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  const addTodo = useCallback((todo: string) => {
    if (todo.length <= 0) {
      inputRef.current?.focus();
      return;
    }
    dispatchTodoList(TodoActionCreator.addTodo(todo));
    setTodo("");
  }, []);

  const deleteTodo = useCallback((id: number) => {
    dispatchTodoList(TodoActionCreator.deleteTodo(id));
  }, []);

  return (
    <div style={{ border: "1px solid gray", padding: "5px", margin: "5px" }}>
      <h2>간단한 TodoList (최적화 적용, useReducer 사용)</h2>
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
    </div>
  );
};

export default App2;

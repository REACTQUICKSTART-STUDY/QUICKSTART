import produce from "immer";
import { useState } from "react";
import App from "./components/App";

export type TodoListItemType = {
  no: number;
  todo: string;
  done: boolean;
};

const AppContatiner = () => {
  const [todoList, setTodoList] = useState<Array<TodoListItemType>>([
    { no: 1, todo: "React 학습 1", done: false },
    { no: 2, todo: "React 학습 2", done: false },
    { no: 3, todo: "React 학습 3", done: true },
    { no: 4, todo: "React 학습 4", done: false },
  ]);

  const addTodo = (todo: string) => {
    let newTodoList = produce(todoList, (draft) => {
      draft.push({ no: new Date().getTime(), todo: todo, done: false });
    });
    setTodoList(newTodoList);
  };

  const deleteTodo = (no: number) => {
    let index = todoList.findIndex((todo) => todo.no === no);
    let newTodoList = produce(todoList, (draft) => {
      draft.splice(index, 1);
    });
    setTodoList(newTodoList);
  };

  const toggleDone = (no: number) => {
    let index = todoList.findIndex((todo) => todo.no === no);
    let newTodoList = produce(todoList, (draft) => {
      draft[index].done = !draft[index].done;
    });
    setTodoList(newTodoList);
  };

  return (
    <App
      todoList={todoList}
      addTodo={addTodo}
      deleteTodo={deleteTodo}
      toggleDone={toggleDone}
    />
  );
};

export default AppContatiner;

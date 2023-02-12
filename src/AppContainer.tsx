import { useState } from "react";
import App from "./App";
import produce from "immer";

export type TodoItemType = {
  id: number;
  todo: string;
  desc: string;
  done: boolean;
};

export type StatesType = {
  todoList: Array<TodoItemType>;
};

export type CallbacksType = {
  addTodo: (todo: string, desc: string) => void;
  deleteTodo: (id: number) => void;
  toggleDone: (id: number) => void;
  updateTodo: (id: number, todo: string, desc: string, done: boolean) => void;
};

const AppContainerj = () => {
  const [todoList, setTodoList] = useState<Array<TodoItemType>>([
    { id: 1, todo: "ES6 학습", desc: "설명 1", done: false },
    { id: 2, todo: "React 학습", desc: "설명 2", done: false },
    { id: 3, todo: "React Context API 학습", desc: "설명 3", done: true },
    { id: 4, todo: "React Router 학습", desc: "설명 4", done: false },
  ]);

  const addTodo = (todo: string, desc: string) => {
    let newtodoList = produce(todoList, (draft) => {
      draft.push({ id: new Date().getTime(), todo, desc, done: false });
    });
    setTodoList(newtodoList);
  };

  const deleteTodo = (id: number) => {
    let index = todoList.findIndex((todo) => todo.id === id);
    let newtodoList = produce(todoList, (draft) => {
      draft.splice(index, 1);
    });
    setTodoList(newtodoList);
  };

  const toggleDone = (id: number) => {
    let index = todoList.findIndex((todo) => todo.id === id);
    let newtodoList = produce(todoList, (draft) => {
      draft[index].done = !draft[index].done;
    });
    setTodoList(newtodoList);
  };

  const updateTodo = (
    id: number,
    todo: string,
    desc: string,
    done: boolean
  ) => {
    let index = todoList.findIndex((todo) => todo.id === id);
    let newtodoList = produce(todoList, (draft) => {
      draft[index] = { ...draft[index], todo, desc, done };
    });
    setTodoList(newtodoList);
  };

  const callbacks: CallbacksType = {
    addTodo,
    deleteTodo,
    updateTodo,
    toggleDone,
  };

  const states: StatesType = { todoList };

  return <App callbacks={callbacks} states={states} />;
};

export default AppContainerj;

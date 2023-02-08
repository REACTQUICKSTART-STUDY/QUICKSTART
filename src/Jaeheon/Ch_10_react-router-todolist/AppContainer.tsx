import { useEffect, useState } from "react";
import App from "./App";
import produce from "immer";
import DateAndTime from "date-and-time";

export type TodoItemType = {
  id: number;
  todo: string;
  desc: string;
  done: boolean;
  date: Date;
};

export type StatesType = { todoList: Array<TodoItemType> };

export type CallbacksType = {
  addTodo: (todo: string, desc: string) => void;
  deleteTodo: (id: number) => void;
  toggleDone: (id: number) => void;
  updateTodo: (id: number, todo: string, desc: string, done: boolean) => void;
  filterTodoList: (filter: string) => TodoItemType[];
  sortTodoList: (todoList: TodoItemType[], sort: string) => TodoItemType[];
};

const AppContainer = () => {
  const [todoList, setTodoList] = useState<Array<TodoItemType>>([]);

  useEffect(() => {
    const localData = localStorage.getItem("todoList");
    if (localData) setTodoList(JSON.parse(localData) || []);
  }, []);

  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(todoList));
  }, [todoList]);

  const addTodo = (todo: string, desc: string) => {
    const newTodoList = produce(todoList, (draft) => {
      draft.push({
        id: new Date().getTime(),
        todo,
        desc,
        done: false,
        date: new Date(),
      });
    });
    setTodoList(newTodoList);
  };

  const deleteTodo = (id: number) => {
    const index = todoList.findIndex((todo) => todo.id === id);
    const newTodoList = produce(todoList, (draft) => {
      draft.splice(index, 1);
    });
    setTodoList(newTodoList);
  };

  const toggleDone = (id: number) => {
    const index = todoList.findIndex((todo) => todo.id === id);
    const newTodoList = produce(todoList, (draft) => {
      draft[index].done = !draft[index].done;
    });
    setTodoList(newTodoList);
  };

  const updateTodo = (
    id: number,
    todo: string,
    desc: string,
    done: boolean
  ) => {
    const index = todoList.findIndex((todo) => todo.id === id);
    const newTodoList = produce(todoList, (draft) => {
      draft[index] = { ...draft[index], todo, desc, done };
    });
    setTodoList(newTodoList);
  };

  const filterTodoList = (filter: string) => {
    switch (filter) {
      case "done":
        return todoList.filter((item) => item.done);
      case "not-done":
        return todoList.filter((item) => !item.done);
      default:
        return [...todoList];
    }
  };

  const sortTodoList = (todoList: TodoItemType[] | [], sort: string) => {
    switch (sort) {
      case "oldest":
        todoList.sort((a, b) => a.id - b.id);
        return todoList;
      case "latest":
        todoList.sort((a, b) => b.id - a.id);
        return todoList;
      default:
        return todoList;
    }
  };

  const callbacks: CallbacksType = {
    addTodo,
    deleteTodo,
    updateTodo,
    toggleDone,
    filterTodoList,
    sortTodoList,
  };
  const states: StatesType = { todoList };

  return <App callbacks={callbacks} states={states} />;
};

export default AppContainer;
// const [todoList, setTodoList] = useState<Array<TodoItemType>>([
//   {
//     id: 1,
//     todo: "아침",
//     desc: "설명1",
//     done: false,
//     date: new Date(),
//   },
//   {
//     id: 2,
//     todo: "점심",
//     desc: "설명2",
//     done: false,
//     date: new Date(),
//   },
//   {
//     id: 3,
//     todo: "저녁",
//     desc: "설명3",
//     done: true,
//     date: new Date(),
//   },
//   {
//     id: 4,
//     todo: "롤",
//     desc: "설명4",
//     done: false,
//     date: new Date(),
//   },
// ]);

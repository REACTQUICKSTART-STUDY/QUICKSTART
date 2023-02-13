import { useEffect, useState } from "react";
import App from "./App";
import produce from "immer";
import {
  addTodoApi,
  deleteTodoApi,
  getTodoApi,
  toggleDoneApi,
  updateTodoApi,
} from "./api/api";

export type TodoItemType = {
  id: number;
  todo: string;
  desc: string;
  done: boolean;
};

export type StatesType = { todoList: Array<TodoItemType>; isLoading: boolean };

export type CallbacksType = {
  fetchTodoList: () => void;
  addTodo: (todo: string, desc: string, callback: () => void) => void;
  deleteTodo: (id: number) => void;
  toggleDone: (id: number) => void;
  updateTodo: (
    id: number,
    todo: string,
    desc: string,
    done: boolean,
    callback: () => void
  ) => void;
  filterTodoList: (filter: string) => TodoItemType[];
  //   sortTodoList: (todoList: TodoItemType[], sort: string) => TodoItemType[];
};

const AppContainer = () => {
  const [todoList, setTodoList] = useState<Array<TodoItemType>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchTodoList = async () => {
    setIsLoading(true);
    const todoListData = await getTodoApi();
    setTodoList(todoListData);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchTodoList();
  }, []);

  const addTodo = async (todo: string, desc: string, callback: () => void) => {
    setIsLoading(true);
    const data = await addTodoApi(todo, desc);
    if (data.status === "success") {
      const newTodoList = produce(todoList, (draft) => {
        draft.push({
          ...data.item,
          done: false,
        });
      });
      setTodoList(newTodoList);
      callback();
    }
    setIsLoading(false);
  };

  const deleteTodo = async (id: number) => {
    setIsLoading(true);
    const data = await deleteTodoApi(id);
    if (data.status === "success") {
      const index = todoList.findIndex((todo) => todo.id === id);
      const newTodoList = produce(todoList, (draft) => {
        draft.splice(index, 1);
      });
      setTodoList(newTodoList);
    }
    setIsLoading(false);
  };

  const toggleDone = async (id: number) => {
    setIsLoading(true);
    const todoItem = todoList.find((todo) => todo.id === id);
    const data = await toggleDoneApi(todoItem as TodoItemType);
    if (data.status === "success") {
      const index = todoList.findIndex((todo) => todo.id === id);
      const newTodoList = produce(todoList, (draft) => {
        draft[index].done = !draft[index].done;
      });
      setTodoList(newTodoList);
    }
    setIsLoading(false);
  };

  const updateTodo = async (
    id: number,
    todo: string,
    desc: string,
    done: boolean,
    callback: () => void
  ) => {
    setIsLoading(true);
    const data = await updateTodoApi(id, todo, desc, done);
    if (data.status === "success") {
      const index = todoList.findIndex((todo) => todo.id === id);
      const newTodoList = produce(todoList, (draft) => {
        draft[index] = { ...draft[index], todo, desc, done };
      });
      setTodoList(newTodoList);
      callback();
    }
    setIsLoading(false);
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

  //   const sortTodoList = (todoList: TodoItemType[] | [], sort: string) => {
  //     switch (sort) {
  //       case "oldest":
  //         todoList.sort((a, b) => a.id - b.id);
  //         return todoList;
  //       case "latest":
  //         todoList.sort((a, b) => b.id - a.id);
  //         return todoList;
  //       default:
  //         return todoList;
  //     }
  //   };

  const callbacks: CallbacksType = {
    fetchTodoList,
    addTodo,
    deleteTodo,
    updateTodo,
    toggleDone,
    filterTodoList,
    // sortTodoList,
  };
  const states: StatesType = { todoList, isLoading };

  return <App callbacks={callbacks} states={states} />;
};

export default AppContainer;

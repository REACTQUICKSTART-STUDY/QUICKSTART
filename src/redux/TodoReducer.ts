import { createReducer } from "@reduxjs/toolkit";
import TodoActionCreator from "./TodoActionCreator";

export type TodoItemType = {
  id: number;
  todo: string;
  desc: string;
  done: boolean;
};

export type TodoStatesType = {
  todoList: Array<TodoItemType>;
};

const initialState: TodoStatesType = {
  todoList: [
    { id: 1, todo: "데이트1", desc: "엄마랑 데이트", done: false },
    { id: 2, todo: "데이트2", desc: "아빠랑 데이트", done: false },
    { id: 3, todo: "데이트3", desc: "흰둥이랑 데이트", done: true },
    { id: 4, todo: "데이트4", desc: "동생이랑 데이트", done: false },
  ],
};

const TodoReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(TodoActionCreator.addTodo, (state, action) => {
      state.todoList.push({
        id: new Date().getTime(),
        todo: action.payload.todo,
        desc: action.payload.desc,
        done: false,
      });
    })

    .addCase(TodoActionCreator.deleteTodo, (state, action) => {
      let index = state.todoList.findIndex(
        (item) => item.id === action.payload.id
      );
      state.todoList.splice(index, 1);
    })

    .addCase(TodoActionCreator.toggleDone, (state, action) => {
      let index = state.todoList.findIndex(
        (item) => item.id === action.payload.id
      );
      state.todoList[index].done = !state.todoList[index].done;
    })

    .addCase(TodoActionCreator.updateTodo, (state, action) => {
      let index = state.todoList.findIndex(
        (item) => item.id === action.payload.id
      );
      state.todoList[index] = { ...action.payload };
    })

    .addDefaultCase((state, action) => state);
});

export default TodoReducer;

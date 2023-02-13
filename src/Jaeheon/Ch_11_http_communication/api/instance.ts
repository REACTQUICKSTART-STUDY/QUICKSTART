import axios from "axios";

export const instance = axios.create({
  baseURL: "/api/todoList_long/jaeheon",
});

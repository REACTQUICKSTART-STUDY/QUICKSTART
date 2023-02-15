import { configureStore } from "@reduxjs/toolkit";
import TodoReducer from "./TodoReducer";

const Appstore = configureStore({ reducer: TodoReducer });
export default Appstore;

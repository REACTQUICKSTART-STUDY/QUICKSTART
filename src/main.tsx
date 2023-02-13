import React from "react";
import ReactDOM from "react-dom/client";
// import App from './App'
// import App from './HyunSoo/App3'
// import AppContainer from './Chapter4/AppContainer'
// import App from "./Chapter51/App";
// import App from "./Chapter7/App2";
// import "./Chapter51/index.css";
import "bootstrap/dist/css/bootstrap.css";
// import { TodoProvider } from "./Chapter8/TodoContext";
// import App from "./Chapter8/App";
// import App from './Chapter9/App'
import AppContainer from './Chapter10/AppContainer'
import './index.css'

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // <React.StrictMode>
  // <TodoProvider>
    <AppContainer />
    // <App />
  // </TodoProvider>
  // </React.StrictMode>,
);

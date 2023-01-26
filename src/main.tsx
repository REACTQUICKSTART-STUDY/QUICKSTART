import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.css";
import App1 from "./Jaeheon/Ch_5_react-class-component/App1";
import App2 from "./Jaeheon/Ch_5_react-class-component/App2";
import AppContainer from "./Jaeheon/Ch_5_react-class-component/AppContainer";
// import './index.css'

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <>
    <App1 />
    <App2 />
    <AppContainer />
  </>
);

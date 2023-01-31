import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.css";
import { BucketProvider } from "./Jaeheon/Ch_8_context-api/contexts/BucketContext";
import App1 from "./Jaeheon/Ch_8_context-api/App1";
// import './index.css'

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <BucketProvider>
    <App1 />
  </BucketProvider>
);

import React from "react";
import ReactDOM from "react-dom/client";

import "@radix-ui/themes/styles.css";

import "./index.css";

import { GlobalApp } from "./containers/GlobalApp";

const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <GlobalApp />
  </React.StrictMode>
);

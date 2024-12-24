import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import "@radix-ui/themes/styles.css";

import "./index.css";

import { store } from "./store";

import { GlobalApp } from "./containers/GlobalApp";

const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <GlobalApp />
    </Provider>
  </React.StrictMode>
);

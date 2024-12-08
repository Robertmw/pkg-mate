import React from "react";
import ReactDOM from "react-dom/client";

import { Box, Theme } from "@radix-ui/themes";

import "@radix-ui/themes/styles.css";

import { AppState } from "./providers/AppState";
import { TabViewsState } from "./providers/TabViewsState";

import { Sidebar } from "./containers/Sidebar";
import { Content } from "./containers/Content";

import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <Theme accentColor="blue" panelBackground="solid" radius="large">
      <AppState>
        <TabViewsState>
          <Box className="flex h-screen">
            <Sidebar />
            <Content />
          </Box>
        </TabViewsState>
      </AppState>
    </Theme>
  </React.StrictMode>
);

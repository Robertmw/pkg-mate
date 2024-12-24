import { configureStore } from "@reduxjs/toolkit";

import { projectReducer } from "./slices/project";

export const store = configureStore({
  reducer: {
    project: projectReducer,
  },
});

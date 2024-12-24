import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import type { EnvFile } from "../../../types/EnvFile";
import type { ProjectSlice } from "./types";

const initialState: ProjectSlice = {
  rootPath: null,
  isLoadingFiles: false,
  files: [],
  openFiles: [],
  activeFile: null,
};

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    setRootPath: (state, action: PayloadAction<string>) => {
      state.rootPath = action.payload;
      state.isLoadingFiles = true;
    },
    setFiles: (state, action: PayloadAction<EnvFile[]>) => {
      state.files = action.payload;
      state.isLoadingFiles = false;
    },
    openFile: (state, action: PayloadAction<string>) => {
      if (state.openFiles.includes(action.payload)) {
        state.activeFile = action.payload;
      } else {
        state.openFiles.push(action.payload);
        state.activeFile = action.payload;
      }
    },
    closeFile: (state, action: PayloadAction<string>) => {
      state.openFiles = state.openFiles.filter(
        (file) => file !== action.payload
      );
      state.activeFile = state.openFiles[state.openFiles.length - 1] || null;
    },
  },
});

export const projectReducer = projectSlice.reducer;

export const { setRootPath, setFiles, openFile, closeFile } =
  projectSlice.actions;

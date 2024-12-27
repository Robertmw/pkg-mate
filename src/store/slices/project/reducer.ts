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
    addVariableInFile: (state, action: PayloadAction<string>) => {
      const fileIndex = state.files.findIndex(
        (file) => file.path === state.activeFile
      );

      if (fileIndex >= 0) {
        state.files[fileIndex].variables.push({
          key: action.payload,
          value: "",
          rawValue: "",
        });
      }
    },
    updateVariableInFile: (
      state,
      action: PayloadAction<{ path: string; key: string; value: string }>
    ) => {
      const file = state.files.find(
        (file) => file.path === action.payload.path
      );

      if (file) {
        file.variables = file.variables.map((variable) => {
          if (variable.key === action.payload.key) {
            return {
              ...variable,
              value: action.payload.value,
            };
          }

          return variable;
        });
      } else {
        throw new Error("No file found");
      }
    },
    deleteVariableInFile: (
      state,
      action: PayloadAction<{ path: string; key: string }>
    ) => {
      const file = state.files.find(
        (file) => file.path === action.payload.path
      );

      if (file) {
        file.variables = file.variables.filter(
          (variable) => variable.key !== action.payload.key
        );
      } else {
        throw new Error("No file found");
      }
    },
  },
});

export const projectReducer = projectSlice.reducer;

export const {
  setRootPath,
  setFiles,
  openFile,
  closeFile,
  addVariableInFile,
  updateVariableInFile,
  deleteVariableInFile,
} = projectSlice.actions;

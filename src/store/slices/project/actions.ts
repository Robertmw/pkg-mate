import { FilesApi } from "../../../utils/FilesApi";
import { StorageApi } from "../../../utils/StorageApi";

import {
  // Selectors
  selectActiveFileData,

  // Actions
  setFiles,
  openFile,
  setRootPath,
  addVariableInFile,
  updateVariableInFile,
  deleteVariableInFile,
  selectFiles,
} from "../project";

import type { AppThunk } from "../../types";

export const getInitialRootAndFiles = (): AppThunk => async (dispatch) => {
  const { path, openFiles, activeFile } = await StorageApi.getItem<{
    path: string;
    openFiles: string[];
    activeFile: string | null;
  }>("projectPath");

  if (path) {
    dispatch(setRootPath({ path, openFiles: openFiles ?? [], activeFile }));
    const files = await FilesApi.getEnvsFilesFromPath(path);

    dispatch(setFiles(files));
  }
};

export const openFileByPath =
  (path: string): AppThunk =>
  async (dispatch) => {
    dispatch(setRootPath({ path, openFiles: [], activeFile: null }));
    const files = await FilesApi.getEnvsFilesFromPath(path);

    dispatch(setFiles(files));
  };

export const addVariableInFileAndSync =
  (path: string, key: string, value?: string): AppThunk =>
  async (dispatch, getState) => {
    const fileData = selectActiveFileData(getState());

    if (!fileData) {
      throw new Error("No file data found");
    }

    await FilesApi.addEnvVariable(path, key, value);
    dispatch(addVariableInFile({ path, key, value }));
  };

export const updateVariableInFileAndSync =
  (path: string, key: string, value: string): AppThunk =>
  async (dispatch, getState) => {
    const fileData = selectActiveFileData(getState());

    if (!fileData) {
      throw new Error("No file data found");
    }

    const variable = fileData.variables.find(
      (variable) => variable.key === key
    );

    if (!variable) {
      throw new Error("No variable found");
    }

    const [_, comment] = variable.rawValue.split("#");
    const updatedValue = comment ? `${value} #${comment}` : value.toString();

    await FilesApi.updateEnvVariable(path, key, updatedValue);

    dispatch(updateVariableInFile({ path, key, value }));
  };

export const copyVariableInOtherFileAndSync = (
  path: string,
  key: string,
  value: string
): AppThunk => {
  return async (dispatch, getState) => {
    const files = selectFiles(getState());
    const fileData = files.find((file) => file.path === path);

    if (!fileData) {
      throw new Error("No file data found");
    }

    await FilesApi.addEnvVariable(path, key, value);

    dispatch(addVariableInFile({ path, key, value }));
    dispatch(openFile(path));
  };
};

export const moveVariableInOtherFileAndSync = (
  path: string,
  key: string,
  value: string
): AppThunk => {
  return async (dispatch, getState) => {
    const files = selectFiles(getState());
    const fileData = files.find((file) => file.path === path);

    const activeFileData = selectActiveFileData(getState());

    if (!fileData || !activeFileData) {
      throw new Error("No file data found");
    }

    await FilesApi.addEnvVariable(path, key, value);

    dispatch(addVariableInFile({ path, key, value }));
    dispatch(deleteVariableInFileAndSync(activeFileData.path, key));
    dispatch(openFile(path));
  };
};

export const deleteVariableInFileAndSync =
  (path: string, key: string): AppThunk =>
  async (dispatch, getState) => {
    const fileData = selectActiveFileData(getState());

    if (!fileData) {
      throw new Error("No file data found");
    }

    const variable = fileData.variables.find(
      (variable) => variable.key === key
    );

    if (!variable) {
      throw new Error("No variable found");
    }

    await FilesApi.deleteEnvVariable(path, key);

    dispatch(deleteVariableInFile({ path, key }));
  };

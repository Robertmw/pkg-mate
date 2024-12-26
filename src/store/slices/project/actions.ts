import { FilesApi } from "../../../utils/FilesApi";

import {
  // Selectors
  selectActiveFileData,

  // Actions
  deleteVariableInFile,
  setFiles,
  setRootPath,
  updateVariableInFile,
} from "../project";

import type { AppThunk } from "../../types";

export const getInitialRootAndFiles = (): AppThunk => async (dispatch) => {
  const rootPath = await FilesApi.getSavedRootPath();

  if (rootPath) {
    dispatch(setRootPath(rootPath));
    const files = await FilesApi.getEnvsFilesFromPath(rootPath);

    dispatch(setFiles(files));
  }
};

export const openFileByPath =
  (path: string): AppThunk =>
  async (dispatch) => {
    dispatch(setRootPath(path));
    const files = await FilesApi.getEnvsFilesFromPath(path);

    dispatch(setFiles(files));
  };

export const addVariableInFileAndSync =
  (path: string, key: string): AppThunk =>
  async (dispatch, getState) => {
    const fileData = selectActiveFileData(getState());

    if (!fileData) {
      throw new Error("No file data found");
    }

    await FilesApi.addEnvVariable(path, key, "");
    dispatch(updateVariableInFile({ path, key, value: "" }));
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

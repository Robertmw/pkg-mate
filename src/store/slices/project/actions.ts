import { FilesApi } from "../../../utils/FilesApi";

import { setFiles, setRootPath } from "../project";

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

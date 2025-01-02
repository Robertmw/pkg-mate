import { createSelector } from "@reduxjs/toolkit";

import type { RootState } from "../../types";

const selectProjectsState = (state: RootState) => state.project;

export const selectOpenFiles = createSelector(
  selectProjectsState,
  (state) => state.openFiles
);
export const selectActiveFile = createSelector(
  selectProjectsState,
  (state) => state.activeFile
);
export const selectFiles = createSelector(
  selectProjectsState,
  (state) => state.files
);
export const selectIsLoadingFiles = createSelector(
  selectProjectsState,
  (state) => state.isLoadingFiles
);

export const selectActiveFileData = createSelector(
  [selectFiles, selectActiveFile],
  (files, activeFile) => {
    if (!activeFile) return null;

    return files.find((file) => file.path === activeFile);
  }
);

export const selectActiveFilesForNavigation = createSelector(
  [selectFiles, selectOpenFiles],
  (files, openFiles) => {
    return files
      .filter((file) => openFiles.includes(file.path))
      .map((file) => ({
        name: file.name,
        path: file.path,
      }));
  }
);

export const selectFilesForNavigation = createSelector(
  [selectFiles],
  (files) => {
    return files.map((file) => ({
      name: file.name,
      path: file.path,
    }));
  }
);

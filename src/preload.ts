// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge, ipcRenderer } from "electron";

import {
  DIALOG_OPEN_FOLDER,
  FILES_DELETE_ENV_VARIABLE,
  FILES_FIND_ENV,
  FILES_NEW_ENV_VARIABLE,
  FILES_READ_ENV,
  FILES_UPDATE_ENV_VARIABLE,
  STORAGE_GET,
  STORAGE_SET,
} from "./constants/handlers";
import { type EnvFile } from "./types/EnvFile";

contextBridge.exposeInMainWorld("electronAPI", {
  openFolder: () => ipcRenderer.invoke(DIALOG_OPEN_FOLDER),

  readEnvFile: (filePath: string): Promise<EnvFile> =>
    ipcRenderer.invoke(FILES_READ_ENV, filePath),
  findEnvFiles: (folderPath: string) =>
    ipcRenderer.invoke(FILES_FIND_ENV, folderPath),
  updateEnvVariable: (filePath: string, key: string, value: string) =>
    ipcRenderer.invoke(FILES_UPDATE_ENV_VARIABLE, filePath, key, value),
  addEnvVariable: (filePath: string, key: string, value: string) =>
    ipcRenderer.invoke(FILES_NEW_ENV_VARIABLE, filePath, key, value),
  removeEnvVariable: (filePath: string, key: string) =>
    ipcRenderer.invoke(FILES_DELETE_ENV_VARIABLE, filePath, key),

  storageGet: (key: string) => ipcRenderer.invoke(STORAGE_GET, key),
  storageSet: (key: string, value: unknown) =>
    ipcRenderer.invoke(STORAGE_SET, key, value),
});

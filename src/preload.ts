// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge, ipcRenderer } from "electron";

import {
  DIALOG_OPEN_FOLDER,
  FILES_FIND_ENV,
  READ_ENV_FILE,
} from "./constants/handlers";
import { type EnvFile } from "./types/EnvFile";

ipcRenderer.on("file-opened", (event, content, filePath) => {
  console.log({ content, filePath });
});

contextBridge.exposeInMainWorld("electronAPI", {
  readEnvFile: (filePath: string): Promise<EnvFile> =>
    ipcRenderer.invoke(READ_ENV_FILE, filePath),
  openFolder: () => ipcRenderer.invoke(DIALOG_OPEN_FOLDER),
  findEnvFiles: (folderPath: string) =>
    ipcRenderer.invoke(FILES_FIND_ENV, folderPath),
});

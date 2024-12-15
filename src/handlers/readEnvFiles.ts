import { type IpcMainInvokeEvent, type BrowserWindow } from "electron";

import { findEnvFilesRecursiveAsync } from "../utils/findEnvFilesRecursiveAsync";

/**
 * @description Handle reading .env files from a folder
 * @param mainWindow
 * @returns
 */
export function handleReadEnvFiles(mainWindow: BrowserWindow) {
  return async (event: IpcMainInvokeEvent, folderPath: string) => {
    try {
      const envFiles = await findEnvFilesRecursiveAsync(folderPath);
      return envFiles;
    } catch (error) {
      console.error("Error finding .env files:", error);
      return [];
    }
  };
}

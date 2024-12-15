import { type IpcMainInvokeEvent, type BrowserWindow } from "electron";
import storage from "electron-json-storage";

/**
 * @description Handle writing a key-value pair to storage
 * @param mainWindow
 * @returns
 */
export function handleWriteStorageKey(mainWindow: BrowserWindow) {
  return async (event: IpcMainInvokeEvent, key: string, value: any) => {
    console.log(
      `[DEBUG] - ipcMain - Saving ${key} to storage with value: ${value}`
    );
    return storage.set(key, value, (error) => {
      if (error) {
        console.error("Error saving data:", error);
      }
    });
  };
}

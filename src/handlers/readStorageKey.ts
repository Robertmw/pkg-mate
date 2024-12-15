import { type IpcMainInvokeEvent, type BrowserWindow } from "electron";
import storage from "electron-json-storage";

/**
 * @description Handle reading a key from storage
 * @param mainWindow
 * @returns
 */
export function handleReadStorageKey(mainWindow: BrowserWindow) {
  return async (event: IpcMainInvokeEvent, key: string) => {
    console.log(`[DEBUG] - ipcMain - Reading ${key} from storage`);
    return storage.getSync(key);
  };
}

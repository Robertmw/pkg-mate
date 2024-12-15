import { dialog, type BrowserWindow } from "electron";

/**
 * @description Open a dialog to select a folder
 * @param mainWindow
 * @returns
 */
export function handleOpenDialog(mainWindow: BrowserWindow) {
  return async () => {
    const result = await dialog.showOpenDialog(mainWindow, {
      properties: ["openDirectory"],
    });
    return result.filePaths[0];
  };
}

import os from "os";
import { app, BrowserWindow, ipcMain } from "electron";

import { installExtension, REDUX_DEVTOOLS } from "electron-devtools-installer";
import storage from "electron-json-storage";

import {
  DIALOG_OPEN_FOLDER,
  FILES_FIND_ENV,
  FILES_READ_ENV,
  FILES_SAVE_ENV,
  STORAGE_GET,
  STORAGE_SET,
} from "./constants/handlers";

import { handleOpenDialog } from "./handlers/openDialog";
import { handleReadEnvFiles } from "./handlers/readEnvFiles";
import { handleReadEnvFile } from "./handlers/readEnvFile";
import { handleWriteEnvFile } from "./handlers/writeEnvFile";
import { handleReadStorageKey } from "./handlers/readStorageKey";
import { handleWriteStorageKey } from "./handlers/writeStorageKey";

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

if (require("electron-squirrel-startup")) {
  app.quit();
}

let mainWindow: Electron.BrowserWindow;

storage.setDataPath(os.tmpdir());

const createWindow = (state?: any): void => {
  const defaultState = { width: 1200, height: 860 };

  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: state?.width ?? defaultState.width,
    height: state?.height ?? defaultState.height,
    webPreferences: {
      nodeIntegration: true,
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  });

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  mainWindow.once("ready-to-show", () => {
    mainWindow.show();
    mainWindow.focus();
  });

  mainWindow.on("close", () => {
    const bounds = mainWindow.getBounds();

    storage.set("windowState", bounds, (error) => {
      if (error) console.error("Error saving window state:", error);
    });
  });

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

app.on("ready", () => {
  storage.get("windowState", (error, state: any) => {
    if (error) {
      console.error("Error loading window state:", error);
    }

    createWindow(state);
  });

  installExtension(REDUX_DEVTOOLS)
    .then((ext) => console.log(`Added Extension:  ${ext.name}`))
    .catch((err) => console.log("An error occurred: ", err));
});
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

ipcMain.handle(DIALOG_OPEN_FOLDER, handleOpenDialog(mainWindow));

ipcMain.handle(FILES_READ_ENV, handleReadEnvFile(mainWindow));
ipcMain.handle(FILES_FIND_ENV, handleReadEnvFiles(mainWindow));
ipcMain.handle(FILES_SAVE_ENV, handleWriteEnvFile(mainWindow));

ipcMain.handle(STORAGE_GET, handleReadStorageKey(mainWindow));
ipcMain.handle(STORAGE_SET, handleWriteStorageKey(mainWindow));

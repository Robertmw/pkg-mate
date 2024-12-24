import fs from "fs";
import { type IpcMainInvokeEvent, type BrowserWindow } from "electron";

import { produce } from "immer";

import { getVariablesFromRawData } from "../utils/getVariablesFromRawData";

/**
 * @description Handle writing a new key-value pair to a .env file
 * @param mainWindow
 * @returns
 */
export function handleWriteRemoveEnvVariable(mainWindow: BrowserWindow) {
  return async (event: IpcMainInvokeEvent, filePath: string, key: string) => {
    const data = fs.readFileSync(filePath, "utf8");
    const variables = getVariablesFromRawData(data);

    const updatedVariables = produce(variables, (draft) => {
      const existingVariable = draft.find((variable) => variable.key === key);

      if (existingVariable) {
        draft.splice(draft.indexOf(existingVariable), 1);
      }
    });

    const output = updatedVariables.reduce((acc, variable) => {
      return `${acc}${variable.key}=${variable.value}\n`;
    }, "");

    fs.writeFile(filePath, output, (err) => {
      if (err) {
        console.error(
          `[DEBUG] - ipcMain - Failed to write to ${filePath}:`,
          err
        );
        return Promise.reject(err);
      }
      console.log(`[DEBUG] - ipcMain - Successfully wrote to ${filePath}`);
      return Promise.resolve();
    });
  };
}

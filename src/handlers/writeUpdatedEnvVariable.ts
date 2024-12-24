import fs from "fs";
import { type IpcMainInvokeEvent, type BrowserWindow } from "electron";

import { produce } from "immer";

import { getVariablesFromRawData } from "../utils/getVariablesFromRawData";

/**
 * @description Handle writing a key-value pair to a .env file
 * @param mainWindow
 * @returns
 */
export function handleWriteUpdatedEnvVariable(mainWindow: BrowserWindow) {
  return async (
    event: IpcMainInvokeEvent,
    filePath: string,
    key: string,
    value: string
  ) => {
    const data = fs.readFileSync(filePath, "utf8");
    const variables = getVariablesFromRawData(data);

    const updatedVariables = produce(variables, (draft) => {
      const existingVariable = draft.find((variable) => variable.key === key);

      if (existingVariable) {
        existingVariable.value = value;
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

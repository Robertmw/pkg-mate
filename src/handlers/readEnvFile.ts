import fs from "fs";
import path from "path";
import { type IpcMainInvokeEvent, type BrowserWindow } from "electron";

import { getVariablesFromRawData } from "../utils/getVariablesFromRawData";

/**
 * @description Handle reading a .env file
 * @param mainWindow
 * @returns
 */
export function handleReadEnvFile(mainWindow: BrowserWindow) {
  return async (event: IpcMainInvokeEvent, filePath: string) => {
    return new Promise((resolve, reject) => {
      fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
          return reject(err);
        }

        return resolve({
          path: filePath,
          name: path.basename(path.dirname(filePath)),
          variables: getVariablesFromRawData(data),
        });
      });
    });
  };
}

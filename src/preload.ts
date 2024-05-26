// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { ipcRenderer } from "electron";

ipcRenderer.on("file-opened", (event, content, filePath) => {
  console.log({ content, filePath });
});

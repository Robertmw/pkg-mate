import { StorageApi } from "./StorageApi";

export const FilesApi = {
  /**
   * @description
   *    This function is used to open the folder dialog and saves the selected folder path.
   *
   * @returns - The selected folder path.
   */
  async openFolder() {
    const path = await window.electronAPI.openFolder();

    if (path) {
      StorageApi.setItem("projectPath", {
        path,
        openFiles: [],
        activeFile: null,
      });
    }

    return path;
  },

  /**
   * @description
   *    This function is used to get the root path from the storage.
   *
   * @returns - The root path from the storage.
   */
  async getSavedRootPath() {
    const { path } = await StorageApi.getItem<{
      path: string;
      openFiles: string[];
    }>("projectPath");

    return path ?? null;
  },

  /**
   * @description
   *    This function is used to get the env files from the path.
   *   It uses the electronAPI to find the env files and read them.
   *
   * @param path - The path to get the env files from.
   * @returns - The env files from the path.
   */
  async getEnvsFilesFromPath(path: string) {
    const envFiles = await window.electronAPI.findEnvFiles(path);

    const readFilesPromises = envFiles.map(window.electronAPI.readEnvFile);
    const files = await Promise.all(readFilesPromises);

    return files;
  },

  async addEnvVariable(filePath: string, key: string, value: string) {
    return window.electronAPI.addEnvVariable(filePath, key, value);
  },

  async updateEnvVariable(filePath: string, key: string, value: string) {
    return window.electronAPI.updateEnvVariable(filePath, key, value);
  },

  async deleteEnvVariable(filePath: string, key: string) {
    return window.electronAPI.removeEnvVariable(filePath, key);
  },
};

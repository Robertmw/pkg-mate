export const FilesApi = {
  /**
   * @description
   *    This function is used to open the folder dialog.
   *
   * @returns - The selected folder path.
   */
  async openFolder() {
    return window.electronAPI.openFolder();
  },

  /**
   * @description
   *    This function is used to get the root path from the storage.
   *
   * @returns - The root path from the storage.
   */
  async getSavedRootPath() {
    const rootPath = await window.electronAPI.storageGet("projectPath");
    return rootPath ?? null;
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
};

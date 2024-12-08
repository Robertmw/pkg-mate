export interface ElectronAPI {
  readEnvFile: (filePath: string) => Promise<EnvFile>;
  openFolder: () => Promise<string>;
  findEnvFiles: (folderPath: string) => Promise<string[]>;
}

declare global {
  interface Window {
    electronAPI: ElectronAPI;
  }
}

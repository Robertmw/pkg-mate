export interface ElectronAPI {
  openFolder: () => Promise<string>;

  readEnvFile: (filePath: string) => Promise<EnvFile>;
  findEnvFiles: (folderPath: string) => Promise<string[]>;
  updateEnvVariable: (
    filePath: string,
    key: string,
    value: string
  ) => Promise<void>;

  storageGet: (key: string) => any;
  storageSet: (key: string, value: any) => void;
}

declare global {
  interface Window {
    electronAPI: ElectronAPI;
  }
}

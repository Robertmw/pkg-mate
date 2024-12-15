import { createContext } from "react";

import { type EnvFile } from "../../types/EnvFile";

type AppStateContextType = {
  envFiles: EnvFile[];
  selectedFiles: string[];
  rootPath: string | null;
  isLoadingFiles: boolean;
  openFolderDialog: () => void;
};

export const AppStateContext = createContext<AppStateContextType | undefined>({
  envFiles: [],
  selectedFiles: [],
  rootPath: null,
  isLoadingFiles: false,
  openFolderDialog: () => new Error("openFolderDialog not implemented"),
});

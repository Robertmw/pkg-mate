import { createContext } from "react";

import { type EnvFile } from "../../types/EnvFile";

type AppStateContextType = {
  envFiles: EnvFile[];
  selectedFiles: string[];
  rootPath: string | null;
  isLoadingFiles: boolean;
  openFolderDialog: () => void;
  onSelectFile: (value: string) => void;
  onDeselectFile: (value: string) => void;
};

export const AppStateContext = createContext<AppStateContextType | undefined>({
  envFiles: [],
  selectedFiles: [],
  rootPath: null,
  isLoadingFiles: false,
  onSelectFile: () => new Error("onSelectFile not implemented"),
  onDeselectFile: () => new Error("onDeselectFile not implemented"),
  openFolderDialog: () => new Error("openFolderDialog not implemented"),
});

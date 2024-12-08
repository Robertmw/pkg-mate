import { ReactNode, useCallback, useMemo, useState } from "react";

import { type EnvFile } from "../../types/EnvFile";

import { AppStateContext } from "./context";

type AppStateProps = {
  children: ReactNode | ReactNode[];
};

export const AppState = ({ children }: AppStateProps) => {
  const [isLoadingFiles, setIsLoadingFiles] = useState(false);
  const [rootPath, setRootPath] = useState<string | null>(null);
  const [envFiles, setEnvFiles] = useState<EnvFile[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);

  const handleOpenFolderDialog = useCallback(async () => {
    const folderPath = await window.electronAPI.openFolder();

    setRootPath(folderPath);
    setIsLoadingFiles(true);

    const envFiles = await window.electronAPI.findEnvFiles(folderPath);

    const readFilesPromises = envFiles.map(window.electronAPI.readEnvFile);
    const files = await Promise.all(readFilesPromises);

    setIsLoadingFiles(false);
    setEnvFiles(files);

    console.log(files);
  }, []);

  const api = useMemo(
    () => ({
      envFiles,
      rootPath,
      isLoadingFiles,
      selectedFiles,
      onSelectFile: (value: string) => {
        setSelectedFiles((prev) => [...prev, value]);
      },
      onDeselectFile: (value: string) => {
        setSelectedFiles((prev) => prev.filter((item) => item !== value));
      },
      openFolderDialog: handleOpenFolderDialog,
    }),
    [envFiles, rootPath, isLoadingFiles, handleOpenFolderDialog]
  );

  return (
    <AppStateContext.Provider value={api}>{children}</AppStateContext.Provider>
  );
};

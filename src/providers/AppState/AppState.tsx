import { ReactNode, useCallback, useEffect, useMemo, useState } from "react";

import { type EnvFile } from "../../types/EnvFile";

import { AppStateContext } from "./context";

type AppStateProps = {
  children: ReactNode | ReactNode[];
  defaultPath?: string;
};

async function getEnvsFromPath(path: string) {
  const envFiles = await window.electronAPI.findEnvFiles(path);

  const readFilesPromises = envFiles.map(window.electronAPI.readEnvFile);
  const files = await Promise.all(readFilesPromises);

  return files;
}

export const AppState = ({ children, defaultPath }: AppStateProps) => {
  const [isLoadingFiles, setIsLoadingFiles] = useState(false);
  const [rootPath, setRootPath] = useState<string | null>(defaultPath);
  const [envFiles, setEnvFiles] = useState<EnvFile[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);

  useEffect(() => {
    if (defaultPath) {
      setIsLoadingFiles(true);
      getEnvsFromPath(defaultPath)
        .then(setEnvFiles)
        .finally(() => setIsLoadingFiles(false));
    }
  }, [defaultPath]);

  const handleOpenFolderDialog = useCallback(async () => {
    const folderPath = await window.electronAPI.openFolder();

    if (folderPath) {
      setRootPath(folderPath);

      window.electronAPI.storageSet("projectPath", folderPath);
      setIsLoadingFiles(true);

      const files = await getEnvsFromPath(folderPath);

      setIsLoadingFiles(false);
      setEnvFiles(files);
    }
  }, []);

  const api = useMemo(
    () => ({
      envFiles,
      rootPath,
      isLoadingFiles,
      selectedFiles,
      openFolderDialog: handleOpenFolderDialog,
    }),
    [envFiles, rootPath, isLoadingFiles, handleOpenFolderDialog]
  );

  return (
    <AppStateContext.Provider value={api}>{children}</AppStateContext.Provider>
  );
};

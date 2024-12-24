import { Flex, Button } from "@radix-ui/themes";

import { FilesApi } from "../../utils/FilesApi";

import {
  useAppDispatch,
  useAppSelector,

  // Selectors
  selectFiles,
  selectIsLoadingFiles,

  // Actions
  openFile,
  openFileByPath,
} from "../../store";

import { ProjectsNavigation } from "./components/ProjectsNavigation";

export const GlobalSidebar = () => {
  const dispatch = useAppDispatch();
  const envFiles = useAppSelector(selectFiles);
  const areFileLoading = useAppSelector(selectIsLoadingFiles);

  const handleSelectProject = (project: string) => {
    dispatch(openFile(project));
  };

  const handleOpenFolderDialog = async () => {
    const folderPath = await FilesApi.openFolder();

    if (folderPath) {
      window.electronAPI.storageSet("projectPath", folderPath);

      dispatch(openFileByPath(folderPath));
    }
  };

  return (
    <Flex direction="column" className="h-full w-60 shrink-0 border-r">
      <Button
        size="3"
        className="w-full rounded-none text-sm"
        variant="soft"
        onClick={handleOpenFolderDialog}
      >
        Select root folder
      </Button>

      <ProjectsNavigation
        areFileLoading={areFileLoading}
        files={envFiles}
        onOpenFile={handleSelectProject}
      />
    </Flex>
  );
};

import { Box } from "@radix-ui/themes";

import { useAppSelector, selectActiveFile } from "../../store";

import { EmptyState } from "../../components/EmptyState";

import { FilesNavigation } from "../FilesNavigation";
import { CurrentEnv } from "../CurrentEnv";

export const GlobalContent = () => {
  const activeFile = useAppSelector(selectActiveFile);

  return (
    <Box className="relative h-screen flex grow flex-col">
      <FilesNavigation />

      {activeFile ? (
        <CurrentEnv />
      ) : (
        <EmptyState
          iconName="FolderRoot"
          message="Select a project from the sidebar"
        />
      )}
    </Box>
  );
};

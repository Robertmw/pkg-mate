import { useWindowSize } from "react-use";

import { Box, ScrollArea } from "@radix-ui/themes";

import { useTabViewsState } from "../../hooks/useTabViewsState";
import { EmptyState } from "../../components/EmptyState";

import { FilesNavigation } from "../FilesNavigation";
import { CurrentEnv } from "../CurrentEnv";

export const GlobalContent = () => {
  const { width } = useWindowSize();
  const { activeView } = useTabViewsState();

  return (
    <Box className="relative h-screen flex grow flex-col">
      <ScrollArea
        className="border-b shrink-0"
        scrollbars="horizontal"
        type="scroll"
        style={{
          height: 40,
          width: width - 240,
        }}
      >
        <FilesNavigation />
      </ScrollArea>

      {activeView ? (
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

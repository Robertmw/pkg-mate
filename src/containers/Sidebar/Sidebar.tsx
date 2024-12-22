import { useWindowSize } from "react-use";
import {
  Box,
  Button,
  Flex,
  Heading,
  ScrollArea,
  Spinner,
  Text,
} from "@radix-ui/themes";

import { useAppState } from "../../hooks/useAppState";
import { ProjectsMenu } from "../../components/ProjectsMenu";

export const Sidebar = () => {
  const { height } = useWindowSize();

  const { envFiles, selectedFiles, isLoadingFiles, openFolderDialog } =
    useAppState();

  return (
    <Box className="flex flex-col h-full w-60 shrink-0 border-r">
      <Button
        size="3"
        className="w-full rounded-none text-sm"
        variant="soft"
        onClick={openFolderDialog}
      >
        Select root folder
      </Button>

      <ScrollArea scrollbars="vertical" style={{ height: height - 40 }}>
        <Box p="4">
          <Flex gap="4" direction="column">
            <Heading size="4" weight="medium">
              Projects
            </Heading>
            {isLoadingFiles ? (
              <Spinner />
            ) : envFiles.length > 0 ? (
              <ProjectsMenu projects={envFiles} activeProject={selectedFiles} />
            ) : (
              <Box>
                <Text size="2">No projects found</Text>
              </Box>
            )}
          </Flex>
        </Box>
      </ScrollArea>
    </Box>
  );
};

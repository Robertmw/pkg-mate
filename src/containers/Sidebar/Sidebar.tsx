import { Box, Button, Flex, Heading, Spinner, Text } from "@radix-ui/themes";

import { useAppState } from "../../hooks/useAppState";
import { ProjectsMenu } from "../../components/ProjectsMenu";

export const Sidebar = () => {
  const { envFiles, selectedFiles, isLoadingFiles, openFolderDialog } =
    useAppState();

  return (
    <Box className="flex flex-col h-full w-80 divide-y border-r">
      <Box>
        <Button
          size="3"
          className="w-full"
          variant="solid"
          onClick={openFolderDialog}
        >
          Select root folder
        </Button>
      </Box>

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
    </Box>
  );
};

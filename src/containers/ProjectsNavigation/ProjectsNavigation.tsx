import { useWindowSize } from "react-use";
import {
  Box,
  Flex,
  Heading,
  ScrollArea,
  Spinner,
  Text,
} from "@radix-ui/themes";

import { useAppState } from "../../hooks/useAppState";
import { ProjectsMenu } from "../../components/ProjectsMenu";

export const ProjectsNavigation = () => {
  const { height } = useWindowSize();

  const { envFiles, selectedFiles, isLoadingFiles } = useAppState();
  return (
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
  );
};

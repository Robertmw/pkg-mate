import { Search } from "lucide-react";

import {
  Box,
  Button,
  Flex,
  Heading,
  Spinner,
  Text,
  TextField,
} from "@radix-ui/themes";

import { useAppState } from "../../hooks/useAppState";
import { ProjectsMenu } from "../../components/ProjectsMenu";

export const Sidebar = () => {
  const { envFiles, selectedFiles, isLoadingFiles, openFolderDialog } =
    useAppState();

  return (
    <Box className="flex flex-col h-full w-80 divide-y border-r">
      <Box p="4">
        <Button className="w-full" variant="surface" onClick={openFolderDialog}>
          Select root folder
        </Button>
      </Box>

      <Box p="4">
        <TextField.Root
          disabled={!isLoadingFiles && envFiles.length === 0}
          placeholder="Search the docs…"
          variant="soft"
        >
          <TextField.Slot>
            <Search className="w-3 h-3" />
          </TextField.Slot>
        </TextField.Root>
      </Box>

      <Box p="4">
        <Flex gap="4" direction="column">
          <Heading size="4">Projects</Heading>
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

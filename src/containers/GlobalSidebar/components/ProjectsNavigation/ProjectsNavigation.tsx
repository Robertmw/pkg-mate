import { useWindowSize } from "react-use";
import {
  Box,
  Flex,
  Heading,
  ScrollArea,
  Spinner,
  Text,
} from "@radix-ui/themes";

import { ProjectsMenu } from "./components/ProjectsMenu";

import type { EnvFile } from "../../../../types/EnvFile";

type Props = {
  files: EnvFile[];
  areFileLoading?: boolean;
  onOpenFile: (file: string) => void;
};

export const ProjectsNavigation = ({
  areFileLoading = false,
  files,
  onOpenFile,
}: Props) => {
  const { height } = useWindowSize();

  return (
    <ScrollArea scrollbars="vertical" style={{ height: height - 40 }}>
      <Box>
        <Flex direction="column">
          <Heading className="p-4 uppercase mt-4" size="1" weight="medium">
            Projects
          </Heading>

          {areFileLoading ? (
            <Spinner />
          ) : files.length > 0 ? (
            <ProjectsMenu projects={files} onOpenFile={onOpenFile} />
          ) : (
            <Box className="mx-4">
              <Text size="2">No projects found</Text>
            </Box>
          )}
        </Flex>
      </Box>
    </ScrollArea>
  );
};

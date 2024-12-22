import { Flex, Button } from "@radix-ui/themes";

import { useAppState } from "../../hooks/useAppState";
import { ProjectsNavigation } from "../ProjectsNavigation";

export const GlobalSidebar = () => {
  const { openFolderDialog } = useAppState();

  return (
    <Flex direction="column" className="h-full w-60 shrink-0 border-r">
      <Button
        size="3"
        className="w-full rounded-none text-sm"
        variant="soft"
        onClick={openFolderDialog}
      >
        Select root folder
      </Button>

      <ProjectsNavigation />
    </Flex>
  );
};

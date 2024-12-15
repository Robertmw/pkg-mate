import { useWindowSize } from "react-use";

import { Box, Heading, ScrollArea } from "@radix-ui/themes";

import { useTabViewsState } from "../../hooks/useTabViewsState";

import { FilesNavigation } from "../FilesNavigation";
import { CurrentEnv } from "../CurrentEnv";

export const Content = () => {
  const { width, height } = useWindowSize();
  const { activeView } = useTabViewsState();

  return (
    <Box className="relative h-screen flex grow flex-col">
      <ScrollArea
        scrollbars="horizontal"
        type="scroll"
        style={{
          height: 40,
          width: width - 320,
        }}
      >
        <FilesNavigation />
      </ScrollArea>
      <ScrollArea scrollbars="vertical" style={{ height: height - 40 }}>
        {activeView ? (
          <CurrentEnv />
        ) : (
          <Box className="flex flex-col gap-2 p-4">
            <Heading size="2">No active file</Heading>
          </Box>
        )}
      </ScrollArea>
    </Box>
  );
};

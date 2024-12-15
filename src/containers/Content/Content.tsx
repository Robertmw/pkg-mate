import { useWindowSize } from "react-use";

import { Box, ScrollArea } from "@radix-ui/themes";

import { FilesNavigation } from "../FilesNavigation";
import { CurrentEnv } from "../CurrentEnv";

export const Content = () => {
  const { width, height } = useWindowSize();
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
        <CurrentEnv />
      </ScrollArea>
    </Box>
  );
};

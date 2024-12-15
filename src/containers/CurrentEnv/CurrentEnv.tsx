import { useEffect, useMemo, useState } from "react";

import { Box, Checkbox, Flex, Grid, Heading, Text } from "@radix-ui/themes";

import { cn } from "../../utils/cn";

import { useAppState } from "../../hooks/useAppState";
import { useTabViewsState } from "../../hooks/useTabViewsState";

export const CurrentEnv = () => {
  const { activeView } = useTabViewsState();
  const { envFiles } = useAppState();

  const [activeVariable, setActiveVariable] = useState<string>("");

  const activeFile = useMemo(
    () => envFiles.find((file) => file.path === activeView),
    [envFiles, activeView]
  );

  useEffect(() => {
    if (activeFile.variables.length > 0) {
      setActiveVariable(activeFile.variables[0].key);
    }
  }, [activeFile.variables]);

  if (!activeFile) {
    return (
      <Box className="flex flex-col gap-2 p-4">
        <Heading size="2">No active file</Heading>
      </Box>
    );
  }

  return (
    <Grid
      columns={{
        initial: "4",
      }}
      className="h-full"
    >
      <Box className={cn("flex flex-col", "col-span-2", "h-full", "border-r")}>
        {activeFile.variables.map((variable) => (
          <Flex
            key={variable.key}
            className={cn(
              "group",
              "p-4",
              "cursor-pointer",
              "hover:bg-blue-50",
              {
                "text-blue-500": activeVariable === variable.key,
              }
            )}
            direction="row"
            onClick={() => setActiveVariable(variable.key)}
          >
            <Flex gap="4" justify="center" align="center">
              <Checkbox
                className={cn("opacity-0", "group-hover:opacity-100")}
              />
              <Text size="2" weight="medium">
                {variable.key}
              </Text>
            </Flex>
          </Flex>
        ))}
      </Box>
      <Box className="col-span-2"></Box>
    </Grid>
  );
};

import { useEffect, useMemo, useState } from "react";
import { useWindowSize } from "react-use";

import {
  Box,
  Button,
  Flex,
  Grid,
  ScrollArea,
  TextField,
} from "@radix-ui/themes";

import { cn } from "../../utils/cn";

import { useAppState } from "../../hooks/useAppState";
import { useTabViewsState } from "../../hooks/useTabViewsState";

import { EnvList } from "../../components/EnvList";
import { EmptyState } from "../../components/EmptyState";
import { ActiveFileValues } from "../../components/ActiveFileValues";

export const CurrentEnv = () => {
  const { height } = useWindowSize();

  const { activeView } = useTabViewsState();
  const { envFiles } = useAppState();

  const [activeVariable, setActiveVariable] = useState<string>("");

  const activeFile = useMemo(
    () => envFiles.find((file) => file.path === activeView),
    [envFiles, activeView]
  );

  useEffect(() => {
    if (activeFile?.variables && activeFile.variables.length > 0) {
      setActiveVariable(activeFile.variables[0].key);
    }
  }, [activeFile?.variables]);

  if (!activeFile) {
    return (
      <EmptyState
        iconName="PackageOpen"
        message="No active file in the selected project"
      />
    );
  }

  return (
    <Grid
      columns={{
        initial: "4",
      }}
      className="h-full"
    >
      <ScrollArea
        className={cn("col-span-2", "h-full", "border-r")}
        scrollbars="vertical"
        style={{ height: height - 40 }}
      >
        <Box className="p-4">
          <TextField.Root size="3" placeholder="Add new variable">
            <TextField.Slot side="right" px="1">
              <Button>Add</Button>
            </TextField.Slot>
          </TextField.Root>
        </Box>
        <EnvList
          activeFile={activeFile}
          activeVariable={activeVariable}
          setActiveVariable={setActiveVariable}
        />
      </ScrollArea>
      <Box className="col-span-2">
        {activeVariable && (
          <ActiveFileValues
            activeFilePath={activeFile.path}
            variable={activeFile.variables.find(
              (variable) => variable.key === activeVariable
            )}
          />
        )}
      </Box>
    </Grid>
  );
};

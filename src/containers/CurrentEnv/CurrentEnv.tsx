import { useEffect, useState } from "react";
import { useWindowSize } from "react-use";

import { Box, Flex, ScrollArea } from "@radix-ui/themes";

import { cn } from "../../utils/cn";

import { useAppSelector, selectActiveFileData } from "../../store";

import { EnvList } from "../../components/EnvList";
import { EmptyState } from "../../components/EmptyState";
import { ActiveFileValues } from "../../components/ActiveFileValues";

import { AddNewVariable } from "./components/AddNewVariable";

export const CurrentEnv = () => {
  const { height } = useWindowSize();

  const activeFileData = useAppSelector(selectActiveFileData);

  const [activeVariable, setActiveVariable] = useState<string>("");

  useEffect(() => {
    if (activeFileData?.variables && activeFileData.variables.length > 0) {
      setActiveVariable(activeFileData.variables[0].key);
    }
  }, [activeFileData?.variables]);

  if (!activeFileData) {
    return (
      <EmptyState
        iconName="PackageOpen"
        message="No active file in the selected project"
      />
    );
  }

  return (
    <Flex className="h-full">
      <ScrollArea
        className={cn("w-96", "shrink-0", "bg-zinc-50")}
        scrollbars="vertical"
        style={{ height: height - 40 }}
      >
        <AddNewVariable />
        <EnvList
          activeFile={activeFileData}
          activeVariable={activeVariable}
          setActiveVariable={setActiveVariable}
        />
      </ScrollArea>

      <Box className="grow">
        {activeVariable && (
          <ActiveFileValues
            key={`${activeFileData.path}-${activeVariable}`}
            activeFilePath={activeFileData.path}
            variable={activeFileData.variables.find(
              (variable) => variable.key === activeVariable
            )}
          />
        )}
      </Box>
    </Flex>
  );
};

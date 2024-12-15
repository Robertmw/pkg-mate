import { useMemo } from "react";

import { Box } from "@radix-ui/themes";

import { useAppState } from "../../hooks/useAppState";
import { useTabViewsState } from "../../hooks/useTabViewsState";

import { ActiveFileValues } from "../../components/ActiveFileValues";

export const CurrentEnv = () => {
  const { activeView } = useTabViewsState();
  const { envFiles } = useAppState();

  const activeFile = useMemo(
    () => envFiles.find((file) => file.path === activeView),
    [envFiles, activeView]
  );

  return (
    <Box className="flex flex-col gap-2 p-4">
      {activeFile && (
        <ActiveFileValues
          activeFilePath={activeFile.path}
          variables={activeFile.variables}
        />
      )}
    </Box>
  );
};

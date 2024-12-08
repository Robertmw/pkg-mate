import { useMemo } from "react";

import { Box } from "@radix-ui/themes";

import { AccordionRoot } from "../../components/Accordion";
import { VariableValue } from "../../components/VariableValue";

import { useTabViewsState } from "../../hooks/useTabViewsState";
import { useAppState } from "../../hooks/useAppState";

export const CurrentEnv = () => {
  const { activeView } = useTabViewsState();
  const { envFiles } = useAppState();

  const activeFile = useMemo(
    () => envFiles.find((file) => file.path === activeView),
    [envFiles, activeView]
  );

  return (
    <Box className="flex flex-col gap-2">
      {activeFile && (
        <AccordionRoot type="multiple">
          {activeFile.variables.map((variable) => (
            <VariableValue key={variable.key} data={variable} />
          ))}
        </AccordionRoot>
      )}
    </Box>
  );
};

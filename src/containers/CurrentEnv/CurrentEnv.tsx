import { useEffect, useMemo, useState } from "react";
import { useWindowSize } from "react-use";

import { Box, Flex, ScrollArea } from "@radix-ui/themes";

import { cn } from "../../utils/cn";

import {
  useAppSelector,
  useAppDispatch,

  // Selectors
  selectActiveFileData,

  // Actions
  updateVariableInFileAndSync,
  addVariableInFileAndSync,
  deleteVariableInFileAndSync,
  selectFilesForNavigation,
  copyVariableInOtherFileAndSync,
  moveVariableInOtherFileAndSync,
} from "../../store";

import { EmptyState } from "../../components/EmptyState";

import { EnvList } from "./components/EnvList";
import { AddNewVariable } from "./components/AddNewVariable";
import { ActiveFileValues } from "./components/ActiveFileValues";

import type { MenuItem } from "../../types/ContextMenu";
import type { VariableEntry } from "../../types/VariableEntry";

const menu: MenuItem[] = [
  {
    type: "item",
    key: "duplicate",
    label: "Duplicate",
  },
  {
    type: "separator",
  },
  {
    type: "sub",
    key: "copyInProject",
    label: "Copy in project...",
    items: [],
  },
  {
    type: "sub",
    key: "moveToProject",
    label: "Move to project...",
    items: [],
  },
  {
    type: "separator",
  },
  {
    type: "item",
    key: "delete",
    label: "Delete",
    color: "red",
  },
];

export const CurrentEnv = () => {
  const dispatch = useAppDispatch();
  const { height } = useWindowSize();

  const activeFileData = useAppSelector(selectActiveFileData);
  const files = useAppSelector(selectFilesForNavigation);

  const [activeVariable, setActiveVariable] = useState<string>("");

  useEffect(() => {
    if (activeFileData?.variables && activeFileData.variables.length > 0) {
      setActiveVariable(activeFileData.variables[0].key);
    }
  }, [activeFileData?.variables]);

  const contextMenu = useMemo<MenuItem[]>(() => {
    return menu.map((item) => {
      if (item.type === "sub") {
        return {
          ...item,
          items: files
            .filter((file) => file.path !== activeFileData.path)
            .map((file) => ({
              type: "item",
              key: `${item.key}:${file.path}`,
              label: file.name,
            })),
        };
      }

      return item;
    });
  }, [activeFileData, files]);

  const handleAddVariable = (key: string, value?: string) => {
    dispatch(addVariableInFileAndSync(activeFileData.path, key, value));

    setActiveVariable(key);
  };

  const handleSaveVariable = (key: string, value: string) => {
    dispatch(updateVariableInFileAndSync(activeFileData.path, key, value));
  };

  const handleDeleteVariable = (key: string) => {
    if (activeFileData?.variables && activeFileData.variables.length > 0) {
      const currentVariableIndex = activeFileData.variables.findIndex(
        (variable) => variable.key === key
      );

      const previousVariable =
        activeFileData.variables[currentVariableIndex - 1];
      const nextVariable = activeFileData.variables[currentVariableIndex + 1];

      if (activeVariable === key) {
        if (previousVariable) {
          setActiveVariable(previousVariable.key);
        } else if (nextVariable) {
          setActiveVariable(nextVariable.key);
        } else {
          setActiveVariable("");
        }
      }
    } else {
      setActiveVariable("");
    }

    dispatch(deleteVariableInFileAndSync(activeFileData.path, key));
  };

  const handleContextMenuAction = (
    action: MenuItem,
    variable: VariableEntry
  ) => {
    if (action.type === "separator") {
      return;
    }

    if (action.key === "duplicate") {
      return handleAddVariable(`${variable.key}_COPY`, variable.value);
    }

    if (action.key === "delete") {
      return handleDeleteVariable(variable.key);
    }

    if (action.key.startsWith("copyInProject")) {
      const [_, filePath] = action.key.split(":");
      return dispatch(
        copyVariableInOtherFileAndSync(filePath, variable.key, variable.value)
      );
    }

    if (action.key.startsWith("moveToProject")) {
      const [_, filePath] = action.key.split(":");
      dispatch(
        moveVariableInOtherFileAndSync(filePath, variable.key, variable.value)
      );
    }
  };

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
        <AddNewVariable onClickAdd={handleAddVariable} />
        <EnvList
          activeFile={activeFileData}
          activeVariable={activeVariable}
          contextMenu={contextMenu}
          onSelectItem={setActiveVariable}
          onClickContextItem={handleContextMenuAction}
        />
      </ScrollArea>

      <Box className="grow">
        {activeVariable && (
          <ActiveFileValues
            key={`${activeFileData.path}-${activeVariable}`}
            variable={activeFileData.variables.find(
              (variable) => variable.key === activeVariable
            )}
            onSave={handleSaveVariable}
            onDelete={handleDeleteVariable}
          />
        )}
      </Box>
    </Flex>
  );
};

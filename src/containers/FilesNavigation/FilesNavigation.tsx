import { useMemo } from "react";
import { X } from "lucide-react";

import { Tabs, Text, IconButton, Flex } from "@radix-ui/themes";

import { useTabViewsState } from "../../hooks/useTabViewsState";
import { useAppState } from "../../hooks/useAppState";

export const FilesNavigation = () => {
  const { openViews, setActiveView, removeView } = useTabViewsState();
  const { envFiles } = useAppState();

  const views = useMemo(
    () => envFiles.filter((file) => openViews.includes(file.path)),
    [envFiles, openViews]
  );

  return (
    <Tabs.List className="w-full shrink-0">
      {views.map((view) => (
        <Tabs.Trigger
          key={view.path}
          value={view.path}
          onClick={() => setActiveView(view.path)}
        >
          <Flex gap="3" justify="center" align="center">
            <Text>{view.name}</Text>
            <IconButton
              size="1"
              variant="ghost"
              onClickCapture={() => removeView(view.path)}
            >
              <X className="w-3 h-3" />
            </IconButton>
          </Flex>
        </Tabs.Trigger>
      ))}
    </Tabs.List>
  );
};

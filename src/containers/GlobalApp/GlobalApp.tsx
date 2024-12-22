import { useEffect, useState } from "react";

import { Box, Theme } from "@radix-ui/themes";

import { AppState } from "../../providers/AppState";
import { TabViewsState } from "../../providers/TabViewsState";

import { GlobalSidebar } from "../GlobalSidebar";
import { GlobalContent } from "../GlobalContent";

export const GlobalApp = () => {
  const [defaultPath, setDefaultPath] = useState<string | null>();

  useEffect(() => {
    window.electronAPI.storageGet("projectPath").then((path: string) => {
      if (path) {
        setDefaultPath(path);
      }
    });
  }, []);

  return (
    <Theme accentColor="blue" panelBackground="solid" radius="medium">
      <AppState key={defaultPath} defaultPath={defaultPath}>
        <TabViewsState>
          <Box className="flex h-screen">
            <GlobalSidebar />
            <GlobalContent />
          </Box>
        </TabViewsState>
      </AppState>
    </Theme>
  );
};

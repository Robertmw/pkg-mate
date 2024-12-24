import { useEffect } from "react";

import { Box, Theme } from "@radix-ui/themes";

import { useAppDispatch, getInitialRootAndFiles } from "../../store";

import { GlobalSidebar } from "../GlobalSidebar";
import { GlobalContent } from "../GlobalContent";

export const GlobalApp = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getInitialRootAndFiles());
  }, []);

  return (
    <Theme accentColor="blue" panelBackground="solid" radius="medium">
      <Box className="flex h-screen">
        <GlobalSidebar />
        <GlobalContent />
      </Box>
    </Theme>
  );
};

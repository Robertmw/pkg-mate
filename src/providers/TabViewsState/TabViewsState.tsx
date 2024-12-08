import { ReactNode, useCallback, useMemo, useState } from "react";

import { Tabs } from "@radix-ui/themes";

import { TabViewsStateContext } from "./context";

type Props = {
  children: ReactNode;
};

export const TabViewsState = ({ children }: Props) => {
  const [activeView, setActiveView] = useState<string | null>(null);
  const [openViews, setOpenViews] = useState<string[]>([]);

  const handleAddView = useCallback(
    (value: string) => {
      setOpenViews((prev) => [...prev, value]);
      setActiveView(value);
    },
    [setOpenViews, setActiveView]
  );
  const handleRemoveView = useCallback(
    (value: string) => {
      setActiveView((prev) => {
        if (prev === value) {
          const index = openViews.indexOf(value);
          const nextView = openViews[index + 1] || openViews[index - 1];
          return nextView || null;
        }
      });
      setOpenViews((prev) => prev.filter((view) => view !== value));
    },
    [openViews, setOpenViews]
  );
  const handleSetActiveView = useCallback(
    (value: string) => {
      setActiveView(value);
    },
    [setActiveView]
  );

  const api = useMemo(
    () => ({
      addView: handleAddView,
      removeView: handleRemoveView,
      setActiveView: handleSetActiveView,
      activeView,
      openViews,
    }),
    [
      activeView,
      handleAddView,
      handleRemoveView,
      handleSetActiveView,
      openViews,
    ]
  );

  return (
    <TabViewsStateContext.Provider value={api}>
      <Tabs.Root className="w-full" value={activeView}>
        {children}
      </Tabs.Root>
    </TabViewsStateContext.Provider>
  );
};

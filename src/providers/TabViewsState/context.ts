import { createContext } from "react";

type TabViewsStateContextType = {
  openViews: string[];
  activeView: string | null;
  addView: (value: string) => void;
  removeView: (value: string) => void;
  setActiveView: (value: string) => void;
};

export const TabViewsStateContext = createContext<TabViewsStateContextType>({
  openViews: [],
  activeView: null,
  addView: () => new Error("addView not implemented"),
  removeView: () => new Error("removeView not implemented"),
  setActiveView: () => new Error("setActiveView not implemented"),
});

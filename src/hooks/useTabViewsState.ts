import { useContext } from "react";
import { TabViewsStateContext } from "../providers/TabViewsState";

export function useTabViewsState() {
  return useContext(TabViewsStateContext);
}

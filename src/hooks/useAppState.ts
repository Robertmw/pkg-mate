import { useContext } from "react";

import { AppStateContext } from "../providers/AppState/context";

export function useAppState() {
  return useContext(AppStateContext);
}

import { type VariableEntry } from "../types/VariableEntry";

import { isEmptySpaceOrComment } from "./isEmptySpaceOrComment";

export function getVariablesFromRawData(data: string): VariableEntry[] {
  return data
    .split("\n")
    .filter((line) => !isEmptySpaceOrComment(line))
    .map((line) => {
      // Split the line into key and value
      const [key, rawValue] = line.split("=");
      // Remove the comment from the value
      const [value] = rawValue.split("#");

      return { key: key.trim(), value: value.trim(), rawValue };
    });
}

import { VariableEntry } from "./VariableEntry";

export type EnvFile = {
  path: string;
  name: string;
  variables: VariableEntry[];
};

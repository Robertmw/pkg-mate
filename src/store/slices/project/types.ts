import type { EnvFile } from "../../../types/EnvFile";

export interface ProjectSlice {
  rootPath: string | null;
  isLoadingFiles: boolean;
  files: EnvFile[];
  openFiles: string[];
  activeFile: string | null;
}

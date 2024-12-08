import { searchDirectoryForEnv } from "./searchDirectoryForEnv";

export async function findEnvFilesRecursiveAsync(
  folderPath: string
): Promise<string[]> {
  const envFiles: string[] = [];

  await searchDirectoryForEnv(folderPath, envFiles);

  return envFiles;
}

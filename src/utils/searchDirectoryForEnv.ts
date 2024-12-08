import fs from "fs";
import path from "path";

export async function searchDirectoryForEnv(
  currentPath: string,
  envFiles: string[]
) {
  // Skip the node_modules folder
  if (currentPath.includes("node_modules")) {
    return;
  }

  try {
    const entries = fs.readdirSync(currentPath, {
      withFileTypes: true,
    });

    // Create an array of promises for parallel processing of files and directories
    const promises = entries.map(async (entry) => {
      const fullPath = path.join(currentPath, entry.name);

      if (entry.isDirectory()) {
        // Recursively search directories
        return searchDirectoryForEnv(fullPath, envFiles); // Call searchDirectory recursively
      } else if (entry.isFile() && entry.name.endsWith(".env")) {
        // If it's an .env file, add it to the list
        envFiles.push(fullPath);
      }
    });

    // Await all the promises concurrently
    await Promise.all(promises);
  } catch (err) {
    console.error(`Error reading directory: ${currentPath}`, err);
  }
}

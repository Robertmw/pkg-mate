export function isEmptySpaceOrComment(line: string) {
  return line.trim() === "" || line.startsWith("#");
}

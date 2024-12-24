import { useWindowSize } from "react-use";

import { Tabs, ScrollArea } from "@radix-ui/themes";

import {
  useAppSelector,
  useAppDispatch,
  // Selectors
  selectActiveFilesForNavigation,
  selectActiveFile,

  // Actions
  openFile,
  closeFile,
} from "../../store";

import { FileTabItem } from "./components/FileTabItem";

export const FilesNavigation = () => {
  const { width } = useWindowSize();
  const dispatch = useAppDispatch();

  const openFiles = useAppSelector(selectActiveFilesForNavigation);
  const activeFile = useAppSelector(selectActiveFile);

  const handleSelectFile = (path: string) => {
    dispatch(openFile(path));
  };

  const handleCloseFile = (path: string) => {
    dispatch(closeFile(path));
  };

  return (
    <ScrollArea
      className="border-b shrink-0"
      scrollbars="horizontal"
      type="scroll"
      style={{
        height: 40,
        width: width - 240,
      }}
    >
      <Tabs.Root className="w-full" value={activeFile}>
        <Tabs.List className="w-full shrink-0">
          {openFiles.map((file) => (
            <FileTabItem
              key={file.path}
              fileName={file.name}
              filePath={file.path}
              onSelect={handleSelectFile}
              onClose={handleCloseFile}
            />
          ))}
        </Tabs.List>
      </Tabs.Root>
    </ScrollArea>
  );
};

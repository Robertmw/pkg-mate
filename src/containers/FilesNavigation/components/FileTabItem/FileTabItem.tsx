import { X } from "lucide-react";

import { Tabs, Text, IconButton, Flex } from "@radix-ui/themes";

type Props = {
  fileName: string;
  filePath: string;
  onSelect: (path: string) => void;
  onClose: (path: string) => void;
};

export const FileTabItem = ({
  fileName,
  filePath,
  onSelect,
  onClose,
}: Props) => {
  return (
    <Tabs.Trigger value={filePath} onClick={() => onSelect(filePath)}>
      <Flex gap="3" justify="center" align="center">
        <Text>{fileName}</Text>
        <IconButton
          size="1"
          variant="ghost"
          onClickCapture={() => onClose(filePath)}
        >
          <X className="w-3 h-3" />
        </IconButton>
      </Flex>
    </Tabs.Trigger>
  );
};

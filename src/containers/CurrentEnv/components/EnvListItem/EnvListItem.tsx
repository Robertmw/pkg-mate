import {
  Box,
  Checkbox,
  DropdownMenu,
  Flex,
  IconButton,
  Text,
} from "@radix-ui/themes";
import { EllipsisVertical } from "lucide-react";

import { cn } from "../../../../utils/cn";

import type { VariableEntry } from "../../../../types/VariableEntry";

type Props = {
  isActive?: boolean;
  variable: VariableEntry;
  renderContextMenu: (variable: VariableEntry) => React.ReactNode;
  onClick: (name: string) => void;
};

export const EnvListItem = ({
  isActive = false,
  variable,
  renderContextMenu,
  onClick,
}: Props) => {
  return (
    <Flex
      className={cn(
        "group",
        "p-4",
        "cursor-pointer overflow-x-hidden",
        "hover:bg-blue-50",
        {
          "text-blue-500": isActive,
        }
      )}
      direction="row"
      onClick={() => onClick(variable.key)}
    >
      <Flex gap="4" justify="center" align="center" className="w-full">
        <Checkbox className={cn("opacity-0", "group-hover:opacity-100")} />
        <Box className="max-w-64 text-ellipsis overflow-hidden">
          <Text as="p" size="2" weight="medium">
            {variable.key}
          </Text>
        </Box>
        <DropdownMenu.Root>
          <DropdownMenu.Trigger className="ml-auto">
            <IconButton color="gray" highContrast variant="ghost">
              <EllipsisVertical className="w-4 h-4" />
            </IconButton>
          </DropdownMenu.Trigger>
          {renderContextMenu(variable)}
        </DropdownMenu.Root>
      </Flex>
    </Flex>
  );
};

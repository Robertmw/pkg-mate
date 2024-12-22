import { Box, Checkbox, Flex, Text } from "@radix-ui/themes";

import { cn } from "../../utils/cn";

import type { VariableEntry } from "../../types/VariableEntry";

type Props = {
  isActive?: boolean;
  variable: VariableEntry;
  onClick: (name: string) => void;
};

export const EnvListItem = ({ isActive = false, variable, onClick }: Props) => {
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
      <Flex gap="4" justify="center" align="center">
        <Checkbox className={cn("opacity-0", "group-hover:opacity-100")} />
        <Box className="text-ellipsis overflow-hidden">
          <Text as="p" size="2" weight="medium">
            {variable.key}
          </Text>
        </Box>
      </Flex>
    </Flex>
  );
};

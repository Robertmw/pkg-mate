import { Flex, Heading } from "@radix-ui/themes";

import { icons } from "lucide-react";

type Props = {
  iconName: keyof typeof icons;
  message: string;
};

export const EmptyState = ({ iconName, message }: Props) => {
  // eslint-disable-next-line import/namespace
  const Icon = icons[iconName];

  return (
    <Flex
      className="p-4 text-zinc-500"
      direction="column"
      align="center"
      justify="center"
      gap="2"
    >
      <Icon className="w-10 h-10" />
      <Heading size="5">{message}</Heading>
    </Flex>
  );
};

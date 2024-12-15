import { useMemo } from "react";

import { Box, Button, Flex } from "@radix-ui/themes";

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../components/Accordion";

import { ListContent } from "./components/ListContent";
import { TextFieldContent } from "./components/TextFieldContent";

import type { VariableEntry } from "../../types/VariableEntry";

type Props = {
  data: VariableEntry;
  onDelete: (key: string) => void;
  onSave: (key: string) => void;
};

export const VariableValue = ({ data, onDelete, onSave }: Props) => {
  const isList = data.value.includes(",");

  const content = useMemo(() => {
    if (isList) {
      return <ListContent data={data} />;
    }
    return <TextFieldContent data={data} />;
  }, [isList]);

  return (
    <AccordionItem value={data.key}>
      <AccordionTrigger className="flex text-sm font-medium leading-6 text-gray-900">
        {data.key}
      </AccordionTrigger>
      <AccordionContent>
        {content}
        <Box py="4">
          <Flex gap="4" justify="end">
            <Button
              color="red"
              variant="soft"
              onClick={() => onDelete(data.key)}
            >
              Delete
            </Button>
            <Button
              color="green"
              variant="solid"
              onClick={() => onSave(data.key)}
            >
              Save
            </Button>
          </Flex>
        </Box>
      </AccordionContent>
    </AccordionItem>
  );
};

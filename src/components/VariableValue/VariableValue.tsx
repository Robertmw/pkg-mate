import { Box, Button, Flex, TextField } from "@radix-ui/themes";

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../components/Accordion";

import { type VariableEntry } from "../../types/VariableEntry";

type Props = {
  data: VariableEntry;
};

export const VariableValue = ({ data }: Props) => {
  const isList = data.value.includes(",");

  let content = (
    <TextField.Root
      autoFocus
      className="w-full"
      defaultValue={data.value}
      id={data.key}
      name={data.key}
      size="2"
    />
  );

  if (isList) {
    content = (
      <ul className="flex flex-col w-full gap-1">
        {data.value.split(",").map((item, index) => (
          <li key={index}>
            <TextField.Root
              className="w-full"
              defaultValue={item}
              id={`${data.key}_${index}`}
              name={`${data.key}_${index}`}
              size="2"
            />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <AccordionItem value={data.key}>
      <AccordionTrigger className="flex text-sm font-medium leading-6 text-gray-900">
        {data.key}
      </AccordionTrigger>
      <AccordionContent>
        {content}
        <Box py="4">
          <Flex gap="4" justify="end">
            <Button color="red" variant="soft">
              Delete
            </Button>
            <Button color="green" variant="solid">
              Save
            </Button>
          </Flex>
        </Box>
      </AccordionContent>
    </AccordionItem>
  );
};

import { Box, Button, TextField } from "@radix-ui/themes";

export const AddNewVariable = () => {
  return (
    <Box className="p-4">
      <TextField.Root
        size="3"
        placeholder="Add new variable"
        className="text-sm"
      >
        <TextField.Slot side="right" px="1">
          <Button>Add</Button>
        </TextField.Slot>
      </TextField.Root>
    </Box>
  );
};

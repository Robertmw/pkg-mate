import { useRef } from "react";

import { Box, Button, TextField } from "@radix-ui/themes";

type Props = {
  onClickAdd: (value: string) => void;
};

export const AddNewVariable = ({ onClickAdd }: Props) => {
  const ref = useRef<HTMLInputElement>(null);

  const handleClickAdd = () => {
    if (ref.current) {
      onClickAdd(ref.current.value);
      ref.current.value = "";
    }
  };

  return (
    <Box className="p-4">
      <TextField.Root
        className="text-sm"
        placeholder="Add new variable"
        ref={ref}
        size="3"
      >
        <TextField.Slot side="right" px="1">
          <Button onClick={handleClickAdd}>Add</Button>
        </TextField.Slot>
      </TextField.Root>
    </Box>
  );
};

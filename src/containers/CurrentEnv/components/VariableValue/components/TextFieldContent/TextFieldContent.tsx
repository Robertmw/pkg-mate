import { useController } from "react-hook-form";

import { TextField } from "@radix-ui/themes";

import type { VariableEntry } from "../../../../../../types/VariableEntry";

type Props = {
  data: VariableEntry;
};

export const TextFieldContent = ({ data }: Props) => {
  const { field } = useController({
    name: data.key,
    rules: { required: true },
  });

  return (
    <TextField.Root
      {...field}
      autoFocus
      className="w-full text-sm"
      id={data.key}
      size="3"
    />
  );
};

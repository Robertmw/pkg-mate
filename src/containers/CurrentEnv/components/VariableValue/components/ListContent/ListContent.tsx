import { TextField } from "@radix-ui/themes";

import type { VariableEntry } from "../../../../../../types/VariableEntry";

type Props = {
  data: VariableEntry;
};

export const ListContent = ({ data }: Props) => {
  return (
    <ul className="flex flex-col w-full gap-1">
      {data.value.split(",").map((item, index) => (
        <li key={index}>
          <TextField.Root
            className="w-full"
            defaultValue={item}
            id={`${data.key}_${index}`}
            name={`${data.key}_${index}`}
            size="3"
          />
        </li>
      ))}
    </ul>
  );
};

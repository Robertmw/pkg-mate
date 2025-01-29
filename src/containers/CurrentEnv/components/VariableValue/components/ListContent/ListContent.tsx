import { useCallback, useMemo } from "react";
import { produce } from "immer";
import { Box, Button, Flex, IconButton, TextField } from "@radix-ui/themes";
import { useFormContext } from "react-hook-form";

import { Plus, TrashIcon } from "lucide-react";

import {
  useAppDispatch,
  useAppSelector,
  selectActiveFile,
  updateVariableInFile,
} from "../../../../../../store";

import type { VariableEntry } from "../../../../../../types/VariableEntry";

type Props = {
  data: VariableEntry;
};

export const ListContent = ({ data }: Props) => {
  const { setValue } = useFormContext();
  const dispatch = useAppDispatch();
  const path = useAppSelector(selectActiveFile);

  const values = useMemo<string[]>(() => data.value.split(","), []);

  const handleDeleteFromValue = useCallback(
    (fragment: string) => {
      const nextValue = produce(values, (draft) => {
        const index = draft.findIndex((value) => value === fragment);
        draft.splice(index, 1);
      });

      setValue(data.key, nextValue.join(","));
      // dispatch(
      //   updateVariableInFile({
      //     path,
      //     key: data.key,
      //     value: nextValue.join(","),
      //   })
      // );
    },
    [values]
  );
  const handleAddToValue = useCallback(() => {
    const nextValue = produce(values, (draft) => {
      draft.push("");
    });

    setValue(data.key, nextValue.join(","));
    // dispatch(
    //   updateVariableInFile({
    //     path,
    //     key: data.key,
    //     value: nextValue.join(","),
    //   })
    // );
  }, []);

  return (
    <ul className="flex flex-col w-full gap-1">
      {values.map((fragment, index) => (
        <li key={index} className="flex gap-4 items-center">
          <TextField.Root
            className="w-full"
            defaultValue={fragment}
            id={`${data.key}_${index}`}
            name={`${data.key}_${index}`}
            size="3"
          />
          <IconButton
            size="2"
            variant="ghost"
            color="red"
            onClick={() => handleDeleteFromValue(fragment)}
          >
            <TrashIcon className="w-3 h-3" />
          </IconButton>
        </li>
      ))}
      <Box className="mt-2 ml-2">
        <Button variant="ghost" onClick={handleAddToValue}>
          <Flex gap="2" align="center" justify="center">
            <Plus className="w-3 h-3" />
            <span>Add new value</span>
          </Flex>
        </Button>
      </Box>
    </ul>
  );
};

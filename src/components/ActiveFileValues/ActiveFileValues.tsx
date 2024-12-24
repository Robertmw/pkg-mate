import { useForm, FormProvider } from "react-hook-form";
import { Flex } from "@radix-ui/themes";

import { FilesApi } from "../../utils/FilesApi";

import { VariableValue } from "../VariableValue";

import type { VariableEntry } from "../../types/VariableEntry";

type Props = {
  variable: VariableEntry;
  onSave: (key: string, value: string) => void;
};

export const ActiveFileValues = ({ variable, onSave }: Props) => {
  const defaultValues = variable?.key ? { [variable.key]: variable.value } : {};
  const methods = useForm({
    defaultValues,
  });

  const handleSaveVariable = (key: string) => {
    const values = methods.getValues();
    const formValue = values[key];

    if (formValue) {
      onSave(key, formValue);
    }
  };

  const handleDeleteVariable = (key: string) => {
    console.log("Delete", key);
  };

  if (!variable) {
    return null;
  }

  return (
    <Flex className="p-4" direction="column">
      <FormProvider {...methods}>
        <VariableValue
          key={variable.key}
          data={variable}
          onDelete={handleDeleteVariable}
          onSave={handleSaveVariable}
        />
      </FormProvider>
    </Flex>
  );
};

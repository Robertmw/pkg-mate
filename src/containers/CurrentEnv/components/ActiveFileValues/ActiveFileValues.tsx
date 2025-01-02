import { useForm, FormProvider } from "react-hook-form";
import { Flex } from "@radix-ui/themes";

import { VariableValue } from "../../components/VariableValue";

import type { VariableEntry } from "../../../../types/VariableEntry";

type Props = {
  variable: VariableEntry;
  onSave: (key: string, value: string) => void;
  onDelete: (key: string) => void;
};

export const ActiveFileValues = ({ variable, onSave, onDelete }: Props) => {
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

  if (!variable) {
    return null;
  }

  return (
    <Flex className="p-4" direction="column">
      <FormProvider {...methods}>
        <VariableValue
          key={variable.key}
          data={variable}
          onDelete={onDelete}
          onSave={handleSaveVariable}
        />
      </FormProvider>
    </Flex>
  );
};

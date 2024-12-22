import { useForm, FormProvider } from "react-hook-form";
import { Flex } from "@radix-ui/themes";

import { type VariableEntry } from "../../types/VariableEntry";

import { VariableValue } from "../VariableValue";

type Props = {
  activeFilePath: string;
  variable: VariableEntry;
};

export const ActiveFileValues = ({ activeFilePath, variable }: Props) => {
  const defaultValues = variable?.key ? { [variable.key]: variable.value } : {};
  const methods = useForm({
    defaultValues,
  });

  const handleSaveVariable = (key: string) => {
    const values = methods.getValues();
    const formValue = values[key];

    if (formValue) {
      const [_, comment] = variable.rawValue.split("#");
      const value = comment ? `${formValue} #${comment}` : formValue.toString();

      window.electronAPI.updateEnvVariable(activeFilePath, key, value);
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

import { useForm, FormProvider } from "react-hook-form";

import { type VariableEntry } from "../../types/VariableEntry";

import { AccordionRoot } from "../Accordion";
import { VariableValue } from "../VariableValue";

type Props = {
  activeFilePath: string;
  variables: VariableEntry[];
};

export const ActiveFileValues = ({ activeFilePath, variables }: Props) => {
  const methods = useForm({
    defaultValues: variables.reduce((acc, variable) => {
      acc[variable.key] = variable.value;
      return acc;
    }, {} as Record<string, string | string[]>),
  });

  const handleSaveVariable = (key: string) => {
    const values = methods.getValues();
    const formValue = values[key];

    const variable = variables.find((variable) => variable.key === key);

    if (formValue && variable) {
      const [_, comment] = variable.rawValue.split("#");
      const value = comment ? `${formValue} #${comment}` : formValue.toString();

      window.electronAPI.updateEnvVariable(activeFilePath, key, value);
    }
  };

  const handleDeleteVariable = (key: string) => {
    console.log("Delete", key);
  };

  return (
    <FormProvider {...methods}>
      <AccordionRoot type="multiple">
        {variables.map((variable) => (
          <VariableValue
            key={variable.key}
            data={variable}
            onDelete={handleDeleteVariable}
            onSave={handleSaveVariable}
          />
        ))}
      </AccordionRoot>
    </FormProvider>
  );
};

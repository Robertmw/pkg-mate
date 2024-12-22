import { EnvListItem } from "../EnvListItem";

import type { EnvFile } from "../../types/EnvFile";

type Props = {
  activeFile: EnvFile;
  activeVariable: string;
  setActiveVariable: (name: string) => void;
};

export const EnvList = ({
  activeFile,
  activeVariable,
  setActiveVariable,
}: Props) => {
  return (
    <>
      {activeFile.variables.map((variable) => (
        <EnvListItem
          key={variable.key}
          isActive={activeVariable === variable.key}
          variable={variable}
          onClick={setActiveVariable}
        />
      ))}
    </>
  );
};

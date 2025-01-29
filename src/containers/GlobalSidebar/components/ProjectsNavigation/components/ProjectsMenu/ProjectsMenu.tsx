import { Button } from "@radix-ui/themes";

import { cn } from "../../../../../../utils/cn";

import type { EnvFile } from "../../../../../../types/EnvFile";

type Props = {
  projects: EnvFile[];
  onOpenFile: (file: string) => void;
};

export const ProjectsMenu = ({ projects, onOpenFile }: Props) => {
  return (
    <ul className="flex flex-col gap-4 mt-1">
      {projects.map((file) => (
        <li key={file.path}>
          <Button
            variant="ghost"
            className={cn("w-full", "justify-start text-left")}
            size="3"
            onClick={() => onOpenFile(file.path)}
          >
            <span className="px-4">{file.name}</span>
          </Button>
        </li>
      ))}
    </ul>
  );
};

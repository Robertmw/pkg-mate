import { Button } from "@radix-ui/themes";

import { cn } from "../../../../../../utils/cn";

import type { EnvFile } from "../../../../../../types/EnvFile";

type Props = {
  projects: EnvFile[];
  onOpenFile: (file: string) => void;
};

export const ProjectsMenu = ({ projects, onOpenFile }: Props) => {
  return (
    <ul className="flex flex-col gap-4">
      {projects.map((file) => (
        <li key={file.path}>
          <Button
            variant="ghost"
            className={cn(
              "w-full",
              "justify-start truncate whitespace-nowrap text-ellipsis"
            )}
            size="3"
            onClick={() => onOpenFile(file.path)}
          >
            {file.name}
          </Button>
        </li>
      ))}
    </ul>
  );
};
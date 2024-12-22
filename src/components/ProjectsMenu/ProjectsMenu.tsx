import { Button } from "@radix-ui/themes";

import { useTabViewsState } from "../../hooks/useTabViewsState";

import { type EnvFile } from "../../types/EnvFile";

type Props = {
  projects: EnvFile[];
  activeProject: string[];
};

export const ProjectsMenu = ({ projects }: Props) => {
  const { addView } = useTabViewsState();
  return (
    <ul className="flex flex-col gap-4">
      {projects.map((file) => (
        <li key={file.path}>
          <Button
            variant="ghost"
            className="w-full justify-start truncate whitespace-nowrap text-ellipsis"
            size="3"
            onClick={() => addView(file.path)}
          >
            {file.name}
          </Button>
        </li>
      ))}
    </ul>
  );
};

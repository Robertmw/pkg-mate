import { DropdownMenu } from "@radix-ui/themes";

import { EnvListItem } from "../../components/EnvListItem";

import type { EnvFile } from "../../../../types/EnvFile";
import type { VariableEntry } from "../../../../types/VariableEntry";
import type { MenuItem } from "../../../../types/ContextMenu";

type Props = {
  activeFile: EnvFile;
  activeVariable: string;
  contextMenu: MenuItem[];
  onSelectItem: (name: string) => void;
  onClickContextItem: (action: MenuItem, variable: VariableEntry) => void;
};

export const EnvList = ({
  activeFile,
  activeVariable,
  contextMenu,
  onSelectItem,
  onClickContextItem,
}: Props) => {
  const handleSelectContextItem = (
    ev: React.MouseEvent<HTMLDivElement>,
    action: MenuItem,
    variable: VariableEntry
  ) => {
    ev.stopPropagation();
    onClickContextItem(action, variable);
  };

  const renderItemFactory =
    (variable: VariableEntry) => (item: MenuItem, index: number) => {
      if (item.type === "separator") {
        return <DropdownMenu.Separator key={`${item}-${index}`} />;
      }

      if (item.type === "item") {
        return (
          <DropdownMenu.Item
            key={item.key}
            color={item.color}
            onClick={(ev) => handleSelectContextItem(ev, item, variable)}
          >
            {item.label}
          </DropdownMenu.Item>
        );
      }

      return (
        <DropdownMenu.Sub key={item.key}>
          <DropdownMenu.SubTrigger>{item.label}</DropdownMenu.SubTrigger>
          <DropdownMenu.SubContent>
            {item.items?.map(renderItemFactory(variable))}
          </DropdownMenu.SubContent>
        </DropdownMenu.Sub>
      );
    };

  const renderContextMenu = (variable: VariableEntry) => {
    return (
      <DropdownMenu.Content>
        {contextMenu.map(renderItemFactory(variable))}
      </DropdownMenu.Content>
    );
  };
  return (
    <>
      {activeFile.variables.map((variable) => (
        <EnvListItem
          key={variable.key}
          isActive={activeVariable === variable.key}
          variable={variable}
          renderContextMenu={renderContextMenu}
          onClick={onSelectItem}
        />
      ))}
    </>
  );
};

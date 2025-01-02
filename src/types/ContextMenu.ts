type Separator = {
  type: "separator";
};
type Item = {
  type: "item";
  key: string;
  label: string;
  color?: "red" | "green";
};
type Subitem = {
  type: "sub";
  key: string;
  label: string;
  items: MenuItem[];
};

export type MenuItem = Separator | Item | Subitem;

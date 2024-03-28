import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";
import { Button } from "@/components/shadcn/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/shadcn/ui/dropdown-menu";
import React from "react";
import { TableColumns } from "../GenericDataTable";
import { ListFilter } from "lucide-react";

type Checked = DropdownMenuCheckboxItemProps["checked"];

interface SelectTebleColumnsProps<T extends Record<string, any>> {
  activeColumns: TableColumns<T>;
  setAcitveColumns: React.Dispatch<React.SetStateAction<TableColumns<T>>>;
}

export function SelectTebleColumns<T extends Record<string, any>>({
  activeColumns,
  setAcitveColumns,
}: SelectTebleColumnsProps<T>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <ListFilter />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Appearance</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {Object.entries(activeColumns).map(([key, value]) => (
          <DropdownMenuCheckboxItem
            key={key}
            checked={!value?.fieldHidden}
            onCheckedChange={(checked) => {
              setAcitveColumns((prev) => ({
                ...prev,
                [key]: { ...value, fieldHidden: !checked },
              }));
            }}
          >
            {key}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

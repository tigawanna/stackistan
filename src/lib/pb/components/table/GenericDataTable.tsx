import { useState } from "react";
import { FieldType } from "./types";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Checkbox } from "@/components/shadcn/ui/checkbox";

type TableColumns<T extends Record<string, any>> = {
  [K in keyof T]?: {
    fieldKey: keyof T;
    fieldLabel?: string;
    fieldType?: FieldType;
  };
};
interface GenericDataTableProps<T extends Record<string, any>> {
  list: T[];
  columns: TableColumns<T>;
}

export function GenericDataTable<T extends Record<string, any>>({
  list,
  columns,
}: GenericDataTableProps<T>) {
  const [tableRows, setTableRows] = useState(list);
  const [fliterBy, setFilterBy] = useState<keyof T | null>(null);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  function sortBy(key: keyof T, direction: "asc" | "desc") {
    setTableRows((prev) => {
      return [...prev].sort((a, b) => {
        if (a[key] < b[key]) {
          return direction === "asc" ? -1 : 1;
        }
        if (a[key] > b[key]) {
          return direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    });
  }
  function selectRow(id: string) {
    if (selectedRows.includes(id)) {
      setSelectedRows((prev) => {
        if (prev) {
          return prev.filter((i) => i !== id);
        }
        return prev;
      });
    } else {
      setSelectedRows((prev) => {
        if (!prev) {
          return prev;
        }
        return [...prev, id];
      });
    }
  }
  function selectAllRows(checked: boolean) {
    console.log({ checked });
    if (checked) {
      setSelectedRows(list.map((i) => i.id));
    } else {
      setSelectedRows([]);
    }
  }
  return (
    <div className="w-full h-full  p-5">
      <table className="w-full table bg-base-300/40 ">
        <thead className="w-full bg-base-300 sticky top-0 rounded-lg">
          <tr className="w-full text-lg">
            <th className="">
              <Checkbox
                checked={selectedRows.length === list.length}
                onCheckedChange={selectAllRows}
              />
            </th>

            {Object.entries(columns).map(([key, value]) => {
              return (
                <th className="p-1" key={key}>
                  <span className="flex flex-col justify-center items-center  cursor-pointer">
                    {key}{" "}
                    <span className="flex text-primary">
                      <ChevronUp
                        className="hover:text-secondary "
                        onClick={() => sortBy(key as keyof T, "asc")}
                      />
                      <ChevronDown
                        className=" hover:text-secondary"
                        onClick={() => sortBy(key as keyof T, "desc")}
                      />
                    </span>
                  </span>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {(!tableRows || tableRows.length < 1) && (
            <tr>
              <td colSpan={Object.keys(columns).length}>
                <p className="text-center">No data available</p>
              </td>
            </tr>
          )}
          {tableRows?.map((item) => {
            const checked = selectedRows.includes(item.id);
            return (
              <tr key={item.id} className={checked ? "bg-primary/10" : ""}>
                <td>
                  <Checkbox
                    checked={checked}
                    onCheckedChange={() => selectRow(item.id)}
                  />
                </td>
                {Object.entries(columns).map(([key, value]) => {
                  if (value?.fieldKey) {
                    return <td key={item.id + key}>{item[value?.fieldKey]}</td>;
                  }
                })}
              </tr>
            );
          })}
          <tr className="h-6"></tr>
        </tbody>
      </table>
    </div>
  );
}

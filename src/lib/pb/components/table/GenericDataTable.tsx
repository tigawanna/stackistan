import { useState } from "react";
import { FieldType } from "./types";

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
  return (
    <div className="w-full h-full  p-5">
      <table className="w-fit table bg-base-300/40 ">
        <thead className="w-full bg-base-300 sticky top-0">
          <tr className="w-full text-lg">
            {Object.entries(columns).map(([key, value]) => {
              return <th key={key}>{key}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {list.map((item) => (
            <tr key={item.id}>
              {Object.entries(columns).map(([key, value]) => {
                if (value?.fieldKey) {
                  return <td key={item.id+key}>{item[value?.fieldKey]}</td>;
                }
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

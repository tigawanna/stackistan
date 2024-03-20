import { TheTextInput } from "@/components/form/inputs/TheTextInput";
import { Button } from "@/components/shadcn/ui/button";
import { useState } from "react";

interface ArrayFormFieldRowInputsProps<T extends Record<string, any>> {
  array_idx: number;
  items_list: T[];

  setArrayValues: (value: T[]) => void;
  arrayRow: T;
  setArrayRow: React.Dispatch<React.SetStateAction<T>>;
  setRowIndex: React.Dispatch<React.SetStateAction<number>>;
}

export function ArrayFormFieldRowInputs<T extends Record<string, any>>({
  arrayRow,
  setArrayRow,
  items_list,
  array_idx,
  setRowIndex,
  setArrayValues,
}: ArrayFormFieldRowInputsProps<T>) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <ul className="w-full flex flex-wrap items-center justify-center gap-2">
        {Object.entries(arrayRow).map(([k, v], index) => {
          return (
            <div className="w-fit" key={index}>
              <TheTextInput
                key={k}
                field_key={k}
                field_name={k}
                val={v}
                onChange={(e) => {
                  setArrayRow((prev) => {
                    return { ...prev, [k]: e.target.value };
                  });
                }}
              />
            </div>
          );
        })}
      </ul>
      <div className="w-full">
        {array_idx >= 0 ? (
          <div>
            <Button
              type="button"
              onClick={() => {
                setArrayValues(items_list.splice(array_idx, 1, arrayRow));
                setRowIndex(-69);
                setArrayRow((prev) => {
                  return Object.entries(prev).reduce((acc: any, [k, v]) => {
                    acc[k] = "";
                    return acc;
                  }, {});
                });
              }}
            >
              Update
            </Button>
            <Button
              type="button"
              onClick={() => {
                setArrayValues(items_list.splice(array_idx, 1));
                setRowIndex(-69);

                setArrayRow((prev) => {
                  return Object.entries(prev).reduce((acc: any, [k, v]) => {
                    acc[k] = "";
                    return acc;
                  }, {});
                });
              }}
            >
              Remove
            </Button>
          </div>
        ) : (
          <Button
            type="button"
            onClick={() => {
              setArrayValues([...items_list, arrayRow]);
            }}
          >
            Add
          </Button>
        )}
      </div>
    </div>
  );
}

import { Edit } from "lucide-react";
import { ArrayFormFieldRowInputs } from "./ArrayFormFieldRow";
import { useState } from "react";

interface ArrayFormFieldsProps<T extends Record<string, any>> {
  items_shape: T;
  items?: {
    list: T[];
  };
  setArrayValues: (value: T[]) => void;
}

export function ArrayFormFields<T extends Record<string, any>>({
  items,
  items_shape,
  setArrayValues,
}: ArrayFormFieldsProps<T>) {
  const items_array = items?.list ?? [];
  const [arrayRow, setArrayRow] = useState(items_shape);
  const [rowIndex, setRowIndex] = useState<number>(-69);
  console.log({ rowIndex });
  return (
    <div className="flex flex-col items-center justify-center gap-2 px-4">
      {/*  lest header */}
      <ul className="w-full flex  gap-3">
        {Object.entries(items_shape).map(([key, value], idx) => (
          <li
            className="flex w-full  gap-1 bg-base-100 p-1"
            key={key + value + idx}
          >
            <span className="text-lg font-bold capitalize">{key}</span>
          </li>
        ))}
      </ul>
      {/* items list */}
      <ul className="w-full flex flex-col gap-1">
        {items?.list?.map((v, index) => {
          return (
            <li className="flex w-full  gap-1 relative" key={index}>
              <span className="p-2">{index + 1}</span>
              {Object.entries(v).map(([key, value], idx) => (
                <div
                  className="w-full bg-base-300 flex gap-2 p-2 rounded-sm "
                  key={key + value + idx + index}
                >
                  <span>{value}</span>
                </div>
              ))}

              <Edit
                className="size-5 absolute right-2 top-[45%] cursor-pointer z-30"
                onClick={() => {
                  setArrayRow(v);
                  setRowIndex((prev) => index);
                }}
              />
            </li>
          );
        })}
      </ul>
      {/* row form */}
      <ArrayFormFieldRowInputs
        array_idx={rowIndex}
        items_list={items_array}
        arrayRow={arrayRow}
        setArrayRow={setArrayRow}
        setRowIndex={setRowIndex}
        setArrayValues={setArrayValues}
      />
    </div>
  );
}

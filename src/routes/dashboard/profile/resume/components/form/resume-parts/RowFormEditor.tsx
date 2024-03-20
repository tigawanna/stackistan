import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/shadcn/ui/dialog";
import { Input } from "@/components/shadcn/ui/input";
import { Label } from "@/components/shadcn/ui/label";
import { Button } from "@/components/shadcn/ui/button";
import React from "react";
import { Check, Trash } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn/ui/select";

// interface RowFormEditorInputOptions<T extends Record<string, any>> {
//   select: {
//     fields?: { label: string; value: T[keyof T] }[];
//   };
// }

interface RowFormEditorInputOptions<T extends Record<string, any>> {
  select: {
    fields?: {
      label: string;
      value: T extends { [key in keyof T]: infer V } // Infer value type for `T`'s keys
        ? V extends string
          ? V // Set value type to enum if it matches
          : unknown // Otherwise, keep it unknown
        : unknown; // Fallback if `T` doesn't have inferable keys
    }[];
  };
}

type InputOptions<T extends Record<string, any>> = {
  [K in keyof T]?: RowFormEditorInputOptions<T>;
};

interface RowFormEditorProps<T extends Record<string, any>> {
  icon: React.ReactNode;
  input: T;
  setInput: React.Dispatch<React.SetStateAction<T>>;
  addNewRow?: () => void;
  updateRow?: () => void;
  deleteRow?: () => void;
  newRow?: boolean;
  inputOptions?: InputOptions<T>;
}

export function RowFormEditor<T extends Record<string, any>>({
  icon,
  input,
  setInput,
  inputOptions,
  addNewRow,
  deleteRow,
  updateRow,
  newRow = false,
}: RowFormEditorProps<T>) {
  return (
    <Dialog>
      <DialogTrigger asChild>{icon}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Row</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-4 divide">
          {Object.entries(input).map(([k, v], index) => {
            if (inputOptions?.[k]?.select) {
              return (
                <Select key={index} value={v} onValueChange={(v) => setInput((prev) => ({ ...prev, [k]: v }))}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder={"Select " + k} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>{k}</SelectLabel>
                      {inputOptions?.[k]?.select?.fields?.map((f) => {
                        return (
                          <SelectItem key={f.value} value={f.value}>
                            {f.label}
                          </SelectItem>
                        );
                      })}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              );
            }
            return (
              <div className="flex flex-col gap-2">
                <Label htmlFor={k} className="text-left">
                  {k}
                </Label>
                <Input
                  id={k}
                  value={v}
                  className="col-span-3"
                  onChange={(e) =>
                    setInput((prev) => ({ ...prev, [k]: e.target.value }))
                  }
                />
              </div>
            );
          })}
        </div>
        <DialogFooter className="w-full flex justify-end">
          {newRow ? (
            <Button
              type="button"
              variant={"outline"}
              onClick={() => addNewRow?.()}
            >
              Add
            </Button>
          ) : (
            <div className="w-full flex gap-2">
              <Button
                variant={"outline"}
                type="button"
                onClick={() => updateRow?.()}
              >
                update <Check className="size-5 text-success" />
              </Button>
              <Button
                variant={"outline"}
                type="button"
                onClick={() => deleteRow?.()}
              >
                delete
                <Trash className="size-5 text-error" />
              </Button>
            </div>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

import {
  Dialog,
  DialogContent,
  DialogDescription,
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

interface RowFormEditorProps<T extends Record<string, any>> {
  icon: React.ReactNode;
  input: T;
  setInput: React.Dispatch<React.SetStateAction<T>>;
  addNewRow: () => void;
  updateRow: () => void;
  deleteRow: () => void;
  newRow?: boolean;
}

export function RowFormEditor<T extends Record<string, any>>({
  icon,
  input,
  setInput,
  addNewRow,
  deleteRow,
  updateRow,
  newRow = false,
}: RowFormEditorProps<T>) {
  console.log({ input });
  return (
    <Dialog>
      <DialogTrigger asChild>{icon}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {Object.entries(input).map(([k, v], index) => {
            return (
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor={k} className="text-right">
                  {k}
                </Label>
                <Input
                  id={k}
                  value={v}
                  className="col-span-3"
                  onChange={(e) =>
                    setInput((prev) => ({ ...prev, [k]: e.target.value }))}
                />
              </div>
            );
          })}
        </div>
        <DialogFooter className="w-full flex justify-end">
          {newRow
            ? (
              <Button type="button" onClick={() => addNewRow()}>
                Add
              </Button>
            )
            : (
              <div className="w-full flex gap-2">
                <Button
                  variant={"outline"}
                  type="button"
                  onClick={() => updateRow()}
                >
                  update <Check className="size-5 text-success" />
                </Button>
                <Button
                  variant={"outline"}
                  type="button"
                  onClick={() => deleteRow()}
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

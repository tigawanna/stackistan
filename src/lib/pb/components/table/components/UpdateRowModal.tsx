import { Button } from "@/components/shadcn/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/shadcn/ui/dialog";
import { Loader, Trash } from "lucide-react";
import { CollectionName } from "@/lib/pb/client";
import {
  GenericUpdateDataForm,
  InputFieldType,
} from "@/lib/pb/components/form/UpdateGenericDataForm";
import { Schema } from "@/lib/pb/database";

interface UpdateRowModalProps<T extends Schema[CollectionName]["update"]> {
  rowId: string;
  rowFields: InputFieldType<T>;
  queryKey: string[];
  row: T;
  collectionName: CollectionName;
}

export function UpdateRowModal<T extends Schema[CollectionName]["update"]>({
  row,
  rowFields,
  rowId,
  collectionName,
  queryKey,
}: UpdateRowModalProps<T>) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Trash />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[80%] md:max-w-[60%] lg:max-w-[50%]">
        <DialogHeader>
          <DialogTitle>Update Row</DialogTitle>
          <DialogDescription>Click submit to update the row</DialogDescription>
        </DialogHeader>
        <div className="">
          <GenericUpdateDataForm
            row={row}
            rowId={rowId}
            queryKey={queryKey}
            rowFields={rowFields}
            collectionName={collectionName}
          />
        </div>

        <DialogFooter className="sm:justify-start"></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

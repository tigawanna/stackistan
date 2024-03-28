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
import { Edit, Loader, Trash } from "lucide-react";
import { CollectionName } from "@/lib/pb/client";
import { GenericUpdateDataForm} from "@/lib/pb/components/form/UpdateGenericDataForm";
import { Schema } from "@/lib/pb/database";
import { InputFieldType } from "@/lib/pb/components/generic-component-types";
import { RecordModel } from "pocketbase";

interface UpdateRowModalProps<T extends RecordModel> {
  rowId: string;
  rowFields: InputFieldType<T>;
  queryKey: string[];
  row: T;
  collectionName: CollectionName;
}

export function UpdateRowModal<T extends RecordModel>({
  row,
  rowFields,
  rowId,
  collectionName,
  queryKey,
}: UpdateRowModalProps<T>) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Edit className="" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[80%] w-full h-[90%] overflow-auto">
        <DialogHeader>
          <DialogTitle>Update Row</DialogTitle>
          <DialogDescription>Click submit to update the row</DialogDescription>
        </DialogHeader>
        <div className="w-full h-full ">
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

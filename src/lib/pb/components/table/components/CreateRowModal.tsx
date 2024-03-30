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
import { Plus } from "lucide-react";
import { CollectionName } from "@/lib/pb/client";
import { InputFieldType } from "@/lib/pb/components/generic-component-types";
import { RecordModel } from "pocketbase";
import { GenericCreateDataForm } from "@/lib/pb/components/form/CreateGenericDataForm";

interface CreateRowModalProps<T extends RecordModel> {
  rowFields: InputFieldType<T>;
  queryKey: string[];
  collectionName: CollectionName;
}

export function CreateRowModal<T extends RecordModel>({
  rowFields,

  collectionName,
  queryKey,
}: CreateRowModalProps<T>) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <span className="cursor-pointer flex gap-1 bg-base-300 btn btn-outline btn-sm ">
          <Plus className="" />
          New
        </span>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[80%] w-full h-[90%] overflow-auto">
        <DialogHeader>
          <DialogTitle>Create New</DialogTitle>
          {/* <DialogDescription>Click submit to update the row</DialogDescription> */}
        </DialogHeader>
        <div className="w-full h-full ">
          <GenericCreateDataForm
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

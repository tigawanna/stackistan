import { sonnerToast } from "@/components/shadcn/misc/sonner-taost";
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
import { CollectionName } from "@/lib/pb/client";
import { usePocketbase } from "@/lib/pb/hooks/use-pb";
import { SpinnerButton } from "@/lib/tanstack/components/SaveButton";
import { useMutation } from "@tanstack/react-query";
import { Loader, Trash } from "lucide-react";

interface DeleteRowsModalProps {
  collectionName: CollectionName;
  ids: string[];
}

export function DeleteRowsModal({ collectionName, ids }: DeleteRowsModalProps) {
  const { pb } = usePocketbase();
  const mutation = useMutation({
    mutationFn: () => {
      const promises = ids.map((id) => pb.from(collectionName).delete(id));
      return Promise.all(promises);
    },
    meta: {
      invalidates: [collectionName],
    },
    onSuccess() {
      sonnerToast({
        type: "success",
        title: "Rows deleted",
      });
    },
    onError(error, variables, context) {
      sonnerToast({
        type: "error",
        title: "Something went wrong while deleting rows",
        options: {
          description: error.message,
        },
      });
    },
  });
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Trash />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[80%] md:max-w-[60%] lg:max-w-[50%]">
        <DialogHeader>
          <DialogTitle>Delete Rows</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete the selected rows?
          </DialogDescription>
        </DialogHeader>

        <div className="flex gap-4 py-4 w-full ">
          <DialogClose asChild>
            <Button type="button" variant="outline" className="w-full">
              Cancel
            </Button>
          </DialogClose>

          <SpinnerButton
            type="button"
            variant="destructive"
            mutation={mutation}
            onClick={() => mutation.mutate()}
      
          />
        </div>

        <DialogFooter className="sm:justify-start"></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

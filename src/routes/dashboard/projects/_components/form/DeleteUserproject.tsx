import { usePocketbase } from "@/lib/pb/hooks/use-pb";
import { pbTryCatchWrapper } from "@/lib/pb/utils";
import { useMutation } from "@tanstack/react-query";
import { X, Loader, Edit, Trash } from "lucide-react";
import { Button } from "@/components/shadcn/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/shadcn/ui/dialog";
import { useState } from "react";
import { CollectionName } from "@/lib/pb/client";
import { sonnerToast } from "@/components/shadcn/misc/sonner-taost";
import { SpinnerButton } from "@/components/shadcn/ui/spinner-button";
interface DeleteUserprojectProps {
  id: string;
  setOpenDropdown: React.Dispatch<React.SetStateAction<boolean>>;
}

export function DeleteUserproject({
  id,
  setOpenDropdown,
}: DeleteUserprojectProps) {
  const collectionName: CollectionName = "stackistan_user_projects";
  const [open, setOpen] = useState(false);
  const { pb, viewer } = usePocketbase();
  const mutation = useMutation({
    mutationFn: () => {
      return pbTryCatchWrapper(pb.from(collectionName).delete(id));
    },
    meta: {
      invalidates: [collectionName],
    },
    onSuccess: (data) => {
      if (data) {
        if (data.data) {
          sonnerToast({
            type: "success",
            title: "Project updated",
          });

          setOpen(false);
        }
        if (data.error) {
          sonnerToast({
            type: "error",
            title: "Something went wrong while updating project",
            options: {
              description: data.error.message,
            },
          });
        }
      }
    },
    onError: (error) => {
      sonnerToast({
        type: "error",
        title: "Something went wrong while updating project",
        options: {
          description: error.message,
        },
      });
    },
  });
  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        setOpen(open);
        setOpenDropdown(open);
      }}
    >
      <DialogTrigger asChild>
        <div className="flex gap-2">
          <Trash className="text-error fill-error" /> Delete
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[80%] w-fit px-4 pb-1 h-fit overflow-auto">
        <DialogHeader>
          <DialogTitle>Delete Project</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this project?{" "}
          </DialogDescription>
        </DialogHeader>
        <div className="w-full h-full flex justify-center items-center gap-6">

          <SpinnerButton
            type="button"
            variant="destructive"
            label="Delete"
            mutation={mutation}
            onClick={() => {
              mutation.mutate();
            }}
          />
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              setOpen(false);
            }}
          >
            Cancel
          </Button>
          <div className="flex justify-center items-center   gap-3"></div>
        </div>

        <DialogFooter className="sm:justify-start"></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

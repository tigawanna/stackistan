import { sonnerToast } from "@/components/shadcn/misc/sonner-taost";
import { Button } from "@/components/shadcn/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/shadcn/ui/dialog";
import { Edit } from "lucide-react";

interface TestDialogProps {

}

export function TestDialog({}:TestDialogProps){
return (
  <Dialog modal={false}>
    <DialogTrigger asChild>
      <span className="cursor-pointer flex gap-1 bg-base-300 btn btn-outline btn-sm ">
        <Edit className="" />
      </span>
    </DialogTrigger>
    <DialogContent
      className="sm:max-w-[80%] w-full h-[90%] overflow-auto"
      onInteractOutside={(e) => {
                  e.preventDefault();
        const { originalEvent } = e.detail;
        if (
          originalEvent.target instanceof Element &&
          originalEvent.target.closest(".group.toaster")
        ) {
          e.preventDefault();
        }
      }}
    >
      <DialogHeader>
        <DialogTitle>Update Entry</DialogTitle>
        <DialogDescription>
          submit an update propasal for approval
        </DialogDescription>
      </DialogHeader>
      <div className="w-full h-full flex items-center justify-center">
        <Button
          onClick={() => {
            sonnerToast({
              title: "test",
              options: {
                className: "z-50 ",
                description: "test description",
              },
            });
          }}
        >
          test dialog
        </Button>
      </div>

      <DialogFooter className="sm:justify-start"></DialogFooter>
    </DialogContent>
  </Dialog>
);
}

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/shadcn/ui/dialog";
import { GenericDataCardsListSuspenseFallback } from "@/lib/pb/components/card-list/GenericDataCardsListSuspenseFallback";
import { useState, Suspense } from "react";
import { FaGithub } from "react-icons/fa";
import { OneGithubRepo, GithubRepos } from "./GithubRepos";


interface ImportFromGithubModalProps {
  selectedRepo: OneGithubRepo;
  setSelectedRepo: (item: OneGithubRepo) => void;
}
export function ImportFromGithubModal({
  selectedRepo,
  setSelectedRepo,
}: ImportFromGithubModalProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <span className="cursor-pointer flex gap-1 bg-base-300 btn btn-outline btn-sm w-fit">
          <FaGithub className="" /> import from github
        </span>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[80%] w-full h-[90%] overflow-auto">
        <DialogHeader>
          <DialogTitle>Add new Project</DialogTitle>
          {/* <DialogDescription>Select</DialogDescription> */}
        </DialogHeader>
        <div className="w-full h-full ">
          <Suspense
            fallback={
              <GenericDataCardsListSuspenseFallback cardClassName="max-h-28" />
            }
          >
            <div className="flex flex-col gap-4">
              <GithubRepos
                selectedRepo={selectedRepo}
                setSelectedRepo={setSelectedRepo}
                setOpen={setOpen}
              />
            </div>
          </Suspense>
        </div>

        <DialogFooter className="sm:justify-start"></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

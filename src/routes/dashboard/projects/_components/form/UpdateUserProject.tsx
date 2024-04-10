import { useFormHook } from "@/components/form/useForm";
import { sonnerToast } from "@/components/shadcn/misc/sonner-taost";
import { CollectionName } from "@/lib/pb/client";
import { PbTheTextAreaInput } from "@/lib/pb/components/form/input-parts/PBTheTextAreaInput";
import { PbTheTextInput } from "@/lib/pb/components/form/input-parts/PBTheTextInput";
import { PBPickRelationsModal } from "@/lib/pb/components/form/input-parts/PBrelationPicker";
import {
  StackistanTechnologiesResponse,
  StackistanUserProjectsUpdate,
} from "@/lib/pb/database";
import { usePocketbase } from "@/lib/pb/hooks/use-pb";
import { pbTryCatchWrapper } from "@/lib/pb/utils";
import { useMutation } from "@tanstack/react-query";
import { X, Loader, Edit } from "lucide-react";
import { Button } from "@/components/shadcn/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/shadcn/ui/dialog";
import { useState } from "react";
import { SpinnerButton } from "@/lib/tanstack/components/SpinnerButton";

interface UpdateUserProjectFormProps {
  id: string;
  item: StackistanUserProjectsUpdate;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function UpdateUserProjectForm({
  id,
  item,
  setOpen,
}: UpdateUserProjectFormProps) {
  const collectionName: CollectionName = "stackistan_user_projects";
  const { pb, viewer } = usePocketbase();
  const mutation = useMutation({
    mutationFn: (item: StackistanUserProjectsUpdate) => {
      return pbTryCatchWrapper(pb.from(collectionName).update(id, item));
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
  const { input, handleChange, setInput } =
    useFormHook<StackistanUserProjectsUpdate>({
      initialValues: {
        name: item.name ?? "",
        description: item.description ?? "",
        link: item.link ?? "",
        image_url: item.image_url,
        tech_stack: item.tech_stack ?? [],
        user: viewer?.id!,
      },
    });
  const pb_error = mutation.data?.error;
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <form
        className="w-full flex flex-col items-center gap-5"
        onSubmit={(e) => {
          e.preventDefault();
          mutation.mutate(input);
        }}
      >
        <div className="w-full h-full flex flex-col items-center justify-center">
          {/* {input.name} */}
          <div className="w-full flex flex-col gap-2 my-2">
            <PbTheTextInput
              field_key={"name"}
              field_name={"Name"}
              val={input.name}
              onChange={(e) => handleChange(e)}
              pb_error={pb_error}
            />
          </div>
          {/* {input.description} */}
          <div className="w-full flex flex-col gap-2 my-2">
            <PbTheTextAreaInput
              field_key={"description"}
              field_name={"Description"}
              value={input.description}
              onChange={(e) => handleChange(e)}
              pb_error={pb_error}
            />
          </div>
          {/* {input.link} */}
          <div className="w-full flex flex-col gap-2 my-2">
            <PbTheTextInput
              field_key={"link"}
              field_name={"Link"}
              type="url"
              val={input.link}
              onChange={(e) => handleChange(e)}
              pb_error={pb_error}
            />
          </div>
          {/* {input.image_link} */}
          <div className="w-full flex flex-col gap-2 my-2">
            <PbTheTextInput
              field_key={"image_url"}
              field_name={"Image Link"}
              type="url"
              val={input.image_url}
              onChange={(e) => handleChange(e)}
              pb_error={pb_error}
            />
          </div>

          {/* {input..dependancies} */}
          <div className="w-full h-[95%]  flex flex-col gap-2">
            <div className="font-semibold">Dependancies</div>
            <div className="w-full h-[95%]  flex flex-col gap-4">
              <ul className="w-full p-2 flex flex-wrap gap-2 overflow-clip ">
                {Array.isArray(input?.tech_stack) &&
                  input.tech_stack?.map((id) => (
                    <li key={id} className="badge p-1 cursor-pointer">
                      {id}
                      <X
                        className=""
                        onClick={() => {
                          setInput((prev) => ({
                            ...prev,
                            tech_stack: Array.isArray(prev.tech_stack)
                              ? prev.tech_stack?.filter((d) => d !== id)
                              : prev.tech_stack,
                          }));
                        }}
                      />
                    </li>
                  ))}
              </ul>
              <PBPickRelationsModal<StackistanTechnologiesResponse>
                dialogTrigger={
                  <span className="btn btn-outline">Pick techstack</span>
                }
                selectedRows={
                  Array.isArray(input.tech_stack) ? input.tech_stack : []
                }
                setSelectedRows={(deps) => {
                  if (Array.isArray(deps)) {
                    setInput((prev) => ({ ...prev, tech_stack: deps }));
                  }
                }}
                collectionName="stackistan_technologies"
                columns={{
                  name: {
                    name: "name",
                  },
                }}
                fieldLabel="tech_stack"
                searchParamKey="deps"
                filterBy="name"
              />
            </div>
          </div>
        </div>

        <SpinnerButton type="submit" variant={"outline"} mutation={mutation} />
      </form>
    </div>
  );
}

interface UpdateUserProjectFormModalProps {
  id: string;
  item: StackistanUserProjectsUpdate;
  setOpenDropdown: React.Dispatch<React.SetStateAction<boolean>>;
}
export function UpdateUserProjectFormModal({
  id,
  item,
  setOpenDropdown,
}: UpdateUserProjectFormModalProps) {
  const [open, setOpen] = useState(false);
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
          <Edit className="text-primary" /> Edit
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[80%] w-full h-[90%] overflow-auto">
        <DialogHeader>
          <DialogTitle>Update Project</DialogTitle>
          {/* <DialogDescription>Add a project </DialogDescription> */}
        </DialogHeader>
        <div className="w-full h-full ">
          <UpdateUserProjectForm id={id} item={item} setOpen={setOpen} />
        </div>

        <DialogFooter className="sm:justify-start"></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

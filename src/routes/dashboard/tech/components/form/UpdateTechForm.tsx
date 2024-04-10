import { useFormHook } from "@/components/form/useForm";
import { sonnerToast } from "@/components/shadcn/misc/sonner-taost";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/shadcn/ui/dialog";
import { Button } from "@/components/shadcn/ui/button";
import { PBFieldWrapper } from "@/lib/pb/components/form/input-parts/PBFieldWrapper";
import { PbTheTextAreaInput } from "@/lib/pb/components/form/input-parts/PBTheTextAreaInput";
import { PbTheTextInput } from "@/lib/pb/components/form/input-parts/PBTheTextInput";
import { PBPickRelationsModal } from "@/lib/pb/components/form/input-parts/PBrelationPicker";
import { PBTheImagePicker } from "@/lib/pb/components/form/input-parts/PbTheImagePicker";
import {
  StackistanTechnologiesResponse,
  StackistanTechnologiesUpdate,
} from "@/lib/pb/database";
import { usePocketbase } from "@/lib/pb/hooks/use-pb";
import { pbTryCatchWrapper } from "@/lib/pb/utils";
import { useMutation } from "@tanstack/react-query";
import { Edit, Plus, X,Loader } from "lucide-react";
import { useState } from "react";
import { SpinnerButton } from "@/lib/tanstack/components/SpinnerButton";
interface UpdateTechFormProps {
  id: string;
  item: StackistanTechnologiesResponse;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function TechnologyForm({
  id,
  item,
  setOpen,
}: UpdateTechFormProps & {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { pb } = usePocketbase();
  const mutation = useMutation({
    mutationFn: (item: StackistanTechnologiesUpdate) => {
      return pbTryCatchWrapper(
        pb.from("stackistan_technologies").update(id, item),
      );
    },
    meta: {
      invalidates: ["stackistan_technologies"],
    },
    onSuccess: (data) => {
      if (data) {
        if (data.data) {
          sonnerToast({
            type: "success",
            title: "Entry updated",
          });

          setOpen(false);
        }
        if (data.error) {
          sonnerToast({
            type: "error",
            title: "Something went wrong while updating entry",
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
        title: "Something went wrong while updating entry",
        options: {
          description: error.message,
        },
      });
    },
  });
  const { input, handleChange, setInput } =
    useFormHook<StackistanTechnologiesUpdate>({
      initialValues: {
        name: item.name,
        description: item.description,
        link: item.link,
        verified: "no",

        dependancies: item.dependancies ?? [],
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
          {/* {input.logo} */}
          <div className="w-full flex flex-col gap-2 my-2">
            <PBFieldWrapper field_key={"logo"} pb_error={pb_error}>
              <PBTheImagePicker
                field_name={"Logo"}
                collection_id_or_name="stackistan_technologies"
                record_id={id}
                file_name={item.logo}
                inputProps={{
                  //  only allow .svg
                  accept: ".svg",
                }}
                setFileImage={(e) => setInput((prev) => ({ ...prev, logo: e }))}
              />
            </PBFieldWrapper>
          </div>
          {/* {input.verified} */}
          {/* {input..dependancies} */}
          <div className="w-full h-[95%]  flex flex-col gap-2">
            <div className="font-semibold">Dependancies</div>
            <div className="w-full h-[95%]  flex flex-col gap-4">
              <ul className="w-full p-2 flex flex-wrap gap-3 overflow-clip ">
                {Array.isArray(input?.dependancies) &&
                  input.dependancies?.map((id) => (
                    <li key={id} className="badge p-1 cursor-pointer">
                      {id}
                      <X
                        className=""
                        onClick={() => {
                          setInput((prev) => ({
                            ...prev,
                            dependancies: Array.isArray(prev.dependancies)
                              ? prev.dependancies?.filter((d) => d !== id)
                              : prev.dependancies,
                          }));
                        }}
                      />
                    </li>
                  ))}
              </ul>
              <PBPickRelationsModal<StackistanTechnologiesResponse>
                dialogTrigger={
                  <div className="flex gap-2 btn btn-wode- btn-sm">
                    <span>pick dependacies</span>
                    <Plus />
                  </div>
                }
                selectedRows={
                  Array.isArray(input.dependancies) ? input.dependancies : []
                }
                setSelectedRows={(deps) => {
                  if (Array.isArray(deps)) {
                    setInput((prev) => ({ ...prev, dependancies: deps }));
                  }
                }}
                collectionName="stackistan_technologies"
                columns={{
                  name: {
                    name: "name",
                  },
                }}
                fieldLabel="dependancies"
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

interface UpdateTechFormModalProps {
  id: string;
  item: StackistanTechnologiesResponse;
}

export function UpdateTechFormModal({ id, item }: UpdateTechFormModalProps) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Edit className="size-5" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[80%] w-full h-[90%] overflow-auto">
        <DialogHeader>
          <DialogTitle>Update Entry</DialogTitle>
          <DialogDescription>
            submit an update propasal for approval
          </DialogDescription>
        </DialogHeader>
        <div className="w-full h-full ">
          <TechnologyForm id={id} item={item} setOpen={setOpen} />
        </div>

        <DialogFooter className="sm:justify-start"></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

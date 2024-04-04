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
  StackistanTechnologiesCreate,
} from "@/lib/pb/database";
import { usePocketbase } from "@/lib/pb/hooks/use-pb";
import { pbTryCatchWrapper } from "@/lib/pb/utils";
import { useMutation } from "@tanstack/react-query";
import { Edit, Plus, X } from "lucide-react";
import { useState } from "react";

interface AddNewTechFormProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function TechnologyForm({ setOpen }: AddNewTechFormProps) {
  const { pb } = usePocketbase();
  const mutation = useMutation({
    mutationFn: (item: StackistanTechnologiesCreate) => {
      return pbTryCatchWrapper(pb.from("stackistan_technologies").create(item));
    },
    meta: {
      invalidates: ["stackistan_technologies"],
    },
    onSuccess: (data) => {
      if (data) {
        if (data.data) {
          sonnerToast({
            type: "success",
            title: "New technology added",
          });

          setOpen(false);
        }
        if (data.error) {
          sonnerToast({
            type: "error",
            title: "Something went wrong while creating new technology",
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
        title: "Something went wrong while creating new technology",
        options: {
          description: error.message,
        },
      });
    },
  });
  const { input, handleChange, setInput } =
    useFormHook<StackistanTechnologiesCreate>({
      initialValues: {
        name: "",
        description: "",
        link: "",
        verified: "no",
        logo: null,
        dependancies: [],
      },
    });
  const pb_error = mutation.data?.error;

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <form
        className="w-full flex flex-col items-center gap-5"
        onSubmit={(e) => {
          e.preventDefault();
          console.log({ input });
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
                record_id={""}
                file_name={""}
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
              <ul className="w-full p-2 flex flex-wrap gap-2 overflow-clip ">
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
        <Button className="min-w-[80%] md:min-w-[50%]" variant={"outline"}>
          Save
        </Button>
      </form>
    </div>
  );
}

interface AddNewTechFormModalProps {}
export function AddNewTechFormModal({}: AddNewTechFormModalProps) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <span className="cursor-pointer flex gap-1 bg-base-300 btn btn-outline btn-sm ">
          <Plus className="" /> new
        </span>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[80%] w-full h-[90%] overflow-auto">
        <DialogHeader>
          <DialogTitle>Add new Technology</DialogTitle>
          <DialogDescription>
            submit a propasal for approval
          </DialogDescription>
        </DialogHeader>
        <div className="w-full h-full ">
          <TechnologyForm setOpen={setOpen} />
        </div>

        <DialogFooter className="sm:justify-start"></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

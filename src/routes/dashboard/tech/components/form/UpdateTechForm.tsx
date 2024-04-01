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
import { Edit } from "lucide-react";

interface UpdateTechFormProps {
  id: string;
  item: StackistanTechnologiesResponse;
}

export function UpdateTechForm({ id, item }: UpdateTechFormProps) {
  const { pb } = usePocketbase();
  const mutation = useMutation({
    mutationFn: (item: StackistanTechnologiesUpdate) => {
      return pbTryCatchWrapper(
        pb.from("stackistan_technologies").update(id, item),
      );
    },
    onSuccess: (data) => {
      if (data) {
        if (data.data) {
          sonnerToast({
            type: "success",
            title: "Entry updated",
          });
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
        logo: null,
        dependancies: item.dependancies??[]
      },
    });
  const pb_error = mutation.data?.error;
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <form
        className="w-full flex flex-col items-center"
        onSubmit={(e) => {
          e.preventDefault();
          mutation.mutate(input);
        }}
      >
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
        <div className="w-full h-[95%]  ">
          <div className="font-semibold">Dependancies</div>
          <PBPickRelationsModal<StackistanTechnologiesResponse>
            //@ts-expect-error
            selectedRows={input.dependancies??[]}
            setSelectedRows={(deps) =>
              //@ts-expect-error
              setInput((prev) => {
                return { ...prev, dependancies: deps };
              })
            }
            title="Dependancies"
            collectionName="stackistan_technologies"
            columns={{
              name: {
                name: "name",
              },
            }}
            fieldLabel="dependancies"
            searchParamKey="tc"
            filterBy="name"
          />
        </div>
      </form>
    </div>
  );
}

export function UpdateTechFormModal({ id, item }: UpdateTechFormProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <span className="cursor-pointer flex gap-1 bg-base-300 btn btn-outline btn-sm ">
          <Edit className="" />
        </span>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[80%] w-full h-[90%] overflow-auto">
        <DialogHeader>
          <DialogTitle>Update Entry</DialogTitle>
          <DialogDescription>
            submit an update propasal for approval
          </DialogDescription>
        </DialogHeader>
        <div className="w-full h-full ">
          <UpdateTechForm id={id} item={item} />
        </div>

        <DialogFooter className="sm:justify-start"></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

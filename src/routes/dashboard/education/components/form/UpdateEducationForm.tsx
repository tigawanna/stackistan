import { useFormHook } from "@/components/form/useForm";
import { Button } from "@/components/shadcn/ui/button";
import { CollectionName } from "@/lib/pb/client";
import { PbTheTextAreaInput } from "@/lib/pb/components/form/input-parts/PBTheTextAreaInput";
import { PbTheTextInput } from "@/lib/pb/components/form/input-parts/PBTheTextInput";
import {
  StackistanUserEducationCreate,
  StackistanUserEducationUpdate,
} from "@/lib/pb/database";
import { usePocketbase } from "@/lib/pb/hooks/use-pb";
import { pbTryCatchWrapper } from "@/lib/pb/utils";
import { useMutation } from "@tanstack/react-query";
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
import { PBFormSelect } from "@/lib/pb/components/form/input-parts/PBFormSelect";
import { Edit, Loader, Plus } from "lucide-react";
import { useState } from "react";
import dayjs from "dayjs";
interface UpdateEducationFormProps {
  id: string;
  item: StackistanUserEducationUpdate;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function UpdateEducationForm({
  id,
  item,
  setOpen,
}: UpdateEducationFormProps) {
  const collection_name: CollectionName = "stackistan_user_education";
  const { pb, viewer } = usePocketbase();
  const mutation = useMutation({
    mutationFn: (item: StackistanUserEducationUpdate) => {
      return pbTryCatchWrapper(pb.from(collection_name).update(id, item));
    },
    meta: {
      invalidates: [collection_name],
    },
    onSuccess: (data) => {
      if (data) {
        if (data.data) {
          sonnerToast({
            type: "success",
            title: "Added new education record",
          });

          setOpen(false);
        }
        if (data.error) {
          sonnerToast({
            type: "error",
            title: "Something went wrong while creating new education entry",
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
        title: "Something went wrong while creating new education entry",
        options: {
          description: error.message,
        },
      });
    },
  });
  const { handleChange, input, setInput } =
    useFormHook<StackistanUserEducationUpdate>({
      initialValues: {
        field_of_study: item?.field_of_study ?? "",
        from: dayjs(item.from ?? new Date()).format("YYYY-MM-DD"),
        to: dayjs(item.to ?? new Date()).format("YYYY-MM-DD"),
        qualification: item?.qualification ?? "",
        school: item?.school ?? "",
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
          console.log({ input });
          mutation.mutate(input);
        }}
      >
        <div className="w-full h-full flex flex-col items-center justify-center">
          {/* {input.school} */}
          <div className="w-full flex flex-col gap-2 my-2">
            <PbTheTextInput
              field_key={"school"}
              field_name={"School"}
              val={input.school}
              onChange={(e) => handleChange(e)}
              pb_error={pb_error}
            />
          </div>
          {/* {input.qualification} */}
          <div className="w-full flex flex-col gap-2 my-2">
            {/* "" | "Certificate" | "Diploma" | "Bachelors" | "Masters" | "PhD" | */}

            <PBFormSelect<StackistanUserEducationCreate, "qualification">
              input={input}
              setInput={setInput}
              fieldKey="qualification"
              fieldLabel="Qualification"
              fieldOptions={{
                type: "select",
                fields: [
                  { label: "Cretificate", value: "Certificate" },
                  { label: "Diploma", value: "Diploma" },
                  { label: "Bachelors", value: "Bachelors" },
                  { label: "Masters", value: "Masters" },
                  { label: "PhD", value: "PhD" },
                ],
              }}
              fieldError={pb_error}
            />
          </div>
          {/* {input.link} */}
          <div className="w-full flex flex-col gap-2 my-2">
            <PbTheTextInput
              field_key={"field_of_study"}
              field_name={"Field of study"}
              val={input.field_of_study}
              onChange={(e) => handleChange(e)}
              pb_error={pb_error}
            />
          </div>
          {/* {input.time} */}
          <div className="w-full flex justify-between items-center gap-2 my-2">
            {/* {input.from} */}
            <PbTheTextInput
              field_key={"from"}
              field_name={"From"}
              type="date"
              val={input.from}
              onChange={(e) => handleChange(e)}
              pb_error={pb_error}
            />
            {/* {input.to} */}
            <PbTheTextInput
              field_key={"to"}
              field_name={"To"}
              type="date"
              val={input.to}
              onChange={(e) => handleChange(e)}
              pb_error={pb_error}
            />
          </div>
        </div>
        <Button className="min-w-[80%] md:min-w-[50%]" variant={"outline"}>
          Save {mutation.isPending && <Loader className="animate-spin" />}
        </Button>
      </form>
    </div>
  );
}

interface UpdateEducationModalProps {
  id: string;
  item: StackistanUserEducationUpdate;
}
export function UpdateEducationModal({ id, item }: UpdateEducationModalProps) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Edit className="text-primary" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[80%] w-full h-[90%] overflow-auto">
        <DialogHeader>
          <DialogTitle>Update education</DialogTitle>
          <DialogDescription>Add relevant education</DialogDescription>
        </DialogHeader>
        <div className="w-full h-full ">
          <UpdateEducationForm id={id} item={item} setOpen={setOpen} />
        </div>

        <DialogFooter className="sm:justify-start"></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

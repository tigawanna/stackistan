import { useFormHook } from "@/components/form/useForm";
import { CollectionName } from "@/lib/pb/client";
import { PbTheTextInput } from "@/lib/pb/components/form/input-parts/PBTheTextInput";
import { StackistanUserEducationCreate } from "@/lib/pb/database";
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
import { Plus, Loader } from "lucide-react";
import { useState } from "react";
import dayjs from "dayjs";
import { SpinnerButton } from "@/lib/tanstack/components/SpinnerButton";

interface CreateEducationFormProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function CreateEducationForm({ setOpen }: CreateEducationFormProps) {
  const collection_name: CollectionName = "stackistan_user_education";
  const { pb, viewer } = usePocketbase();
  const mutation = useMutation({
    mutationFn: (item: StackistanUserEducationCreate) => {
      return pbTryCatchWrapper(pb.from(collection_name).create(item));
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
    useFormHook<StackistanUserEducationCreate>({
      initialValues: {
        field_of_study: "",
        from: dayjs(new Date()).format("YYYY-MM-DD"),
        to: dayjs(new Date()).format("YYYY-MM-DD"),
        qualification: "",
        school: "",
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

          {/* {input.logo} */}
        </div>


        <SpinnerButton
          type="submit"
          mutation={mutation}

        />
      </form>
    </div>
  );
}

interface AddEducationModalProps {}
export function AddEducationModal({}: AddEducationModalProps) {
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
          <DialogTitle>Add education</DialogTitle>
          <DialogDescription>Add relevant education</DialogDescription>
        </DialogHeader>
        <div className="w-full h-full ">
          <CreateEducationForm setOpen={setOpen} />
        </div>

        <DialogFooter className="sm:justify-start"></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

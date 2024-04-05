import { useFormHook } from "@/components/form/useForm";
import { Button } from "@/components/shadcn/ui/button";
import { CollectionName } from "@/lib/pb/client";
import { PbTheTextAreaInput } from "@/lib/pb/components/form/input-parts/PBTheTextAreaInput";
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
        from: "",
        to: "",
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
            <PbTheTextAreaInput
              field_key={"qualification"}
              field_name={"Qualification"}
              value={input.qualification}
              onChange={(e) => handleChange(e)}
              pb_error={pb_error}
            />
            {/* {input.qualification} */}
            {/* "" | "Certificate" | "Diploma" | "Bachelors" | "Masters" | "PhD" | */}
      
            <PBFormSelect
              input={input}
              setInput={setInput}
              fieldKey="qualification"
              fieldLabel="Qualification"
              fieldOptions={{
                type: "select",
                fields: [
                  { label: "High School", value: "" },
                  { label: "Diploma", value: "Diploma" },
                  { label: "Bachelor", value: "Bachelor" },
                  { label: "Master", value: "Master" },
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
          {/* {input.logo} */}
        </div>
        <Button className="min-w-[80%] md:min-w-[50%]" variant={"outline"}>
          Save
        </Button>
      </form>
    </div>
  );
}

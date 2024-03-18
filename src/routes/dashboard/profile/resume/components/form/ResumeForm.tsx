import { useFormHook } from "@/components/form/useForm";
import { PBFieldWrapper } from "@/lib/pb/components/form/PBFieldWrapper";
import { StackistanResumeProfileCreate } from "@/lib/pb/database";
import { useViewer } from "@/lib/pb/hooks/useViewer";
import { SelectResumeProfileType } from "./SelectResumeProfileType";
import ClientSuspenseWrapper from "@/components/wrappers/ClientSuspenseWrapper";
import { ClientSuspense } from "rakkasjs";

interface ResumeFormProps {}

export function ResumeForm({}: ResumeFormProps) {
  const {
    data: { user },
  } = useViewer();
  const { input, setInput, handleChange, error, setError, validateInputs } =
    useFormHook<StackistanResumeProfileCreate>({
      initialValues: {
        user: user?.record.id!,
        type: "general",
        projects: {
          list: [],
        },
        skills: {
          list: [],
        },
        activities: {
          list: [],
        },
        education: {
          list: [],
        },
        experience: "",
        other: {
          list: [],
        },
      },
    });
  return (
    <div className="w-full h-full flex flex-col items-center justify-center pl-3">
      {/*  intro */}
      <div className="w-full flex-col px-2 pt-10">
        <h1 className="text-3xl fonr bold">Create resume profile</h1>
        <p className="text-sm brightness-75 md:max-w-[70%]">
          Create your resume profile to use in future job applications , the
          default is a general one but feel free to creaate specilized one like
          one for backead frontend developer if you are fullstack
        </p>
      </div>
      <form className="h-full w-full flex flex-col justify-center items-center">
        {/* select resume profile type */}
        <ClientSuspense fallback={<div className="h-8 bg-base-300 skeleton"></div>}>
        <ClientSuspenseWrapper>
        <PBFieldWrapper field_key={"type"}>
          <SelectResumeProfileType />
        </PBFieldWrapper>
          
        </ClientSuspenseWrapper>
          
        </ClientSuspense>
      </form>
    </div>
  );
}

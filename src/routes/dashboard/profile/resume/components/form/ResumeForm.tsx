import { useFormHook } from "@/components/form/useForm";
import { PBFieldWrapper } from "@/lib/pb/components/form/input-parts/PBFieldWrapper";
import { StackistanResumeProfileCreate } from "@/lib/pb/database";
import { useViewer } from "@/lib/pb/hooks/useViewer";
import { SelectResumeProfileType } from "./SelectResumeProfileType";
import ClientSuspenseWrapper from "@/components/wrappers/ClientSuspenseWrapper";
import { ClientSuspense, usePageContext } from "rakkasjs";
import { useMutation } from "@tanstack/react-query";
import { pbTryCatchWrapper } from "@/lib/pb/utils";
import { ResumeProfileProjects } from "./resume-parts/ResumeProfileProjects";
import { ResumeProfileSkills } from "./resume-parts/ResumeProfileSkills";
import { ResumeProfileActivities } from "./resume-parts/ResumeProfileActivities";
import { ResumeProfileOthers } from "./resume-parts/ResumeProfileOthers";
import { ResumeProfileEducation } from "./resume-parts/ResumeProfileEducation";
import { Button } from "@/components/shadcn/ui/button";
import { Loader } from "lucide-react";

interface ResumeFormProps {}

export function ResumeForm({}: ResumeFormProps) {
  const {
    locals: { pb },
  } = usePageContext();
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

  const mutation = useMutation({
    mutationFn: ({ inp }: { inp: StackistanResumeProfileCreate }) => {
      return pbTryCatchWrapper(
        pb.from("stackistan_resume_profile").create(inp),
      );
    },
  });
  const pb_error = mutation?.data?.error;
  return (
    <div className="w-full h-fit flex flex-col items-center justify-center gap-6 pl-3 overflow-auto pb-4">
      {/*  intro */}
      <div className="w-full h-fit flex-col px-2 pt-10">
        <h1 className="text-3xl fonr bold">Create resume profile</h1>
        <p className="text-sm brightness-75 md:max-w-[70%]">
          Create your resume profile to use in future job applications , the
          default is a general one but feel free to creaate specilized one like
          one for backead frontend developer if you are fullstack
        </p>
      </div>
      <form className="h-fit w-full flex flex-col justify-center items-center  gap-5 ">
        {/* select resume profile type */}
        <ClientSuspense
          fallback={<div className="h-8 bg-base-300 skeleton"></div>}
        >
          <ClientSuspenseWrapper>
            <PBFieldWrapper field_key={"type"} pb_error={pb_error}>
              <SelectResumeProfileType
                resume_type={input.type}
                setResumeType={(type) =>
                  setInput((prev) => {
                    return {
                      ...prev,
                      type,
                    };
                  })
                }
              />
            </PBFieldWrapper>
          </ClientSuspenseWrapper>
        </ClientSuspense>

        {/* projects */}
        <ClientSuspense
          fallback={<div className="h-8 bg-base-300 skeleton"></div>}
        >
          <ClientSuspenseWrapper>
            <ResumeProfileProjects
              items={input.projects}
              setItem={(projects) =>
                setInput((prev) => ({ ...prev, projects }))
              }
            />
          </ClientSuspenseWrapper>
        </ClientSuspense>

        {/* skills */}
        <ClientSuspense
          fallback={<div className="h-8 bg-base-300 skeleton"></div>}
        >
          <ClientSuspenseWrapper>
            <ResumeProfileSkills
              items={input.skills}
              setItems={(skills) => setInput((prev) => ({ ...prev, skills }))}
            />
          </ClientSuspenseWrapper>
        </ClientSuspense>

        {/* education */}
        <ClientSuspense
          fallback={<div className="h-8 bg-base-300 skeleton"></div>}
        >
          <ClientSuspenseWrapper>
            <ResumeProfileEducation
              items={input.education}
              setItems={(education) =>
                setInput((prev) => ({ ...prev, education }))
              }
            />
          </ClientSuspenseWrapper>
        </ClientSuspense>

        {/* activities */}
        <ClientSuspense
          fallback={<div className="h-8 bg-base-300 skeleton"></div>}
        >
          <ClientSuspenseWrapper>
            <ResumeProfileActivities
              items={input.activities}
              setItems={(activities) =>
                setInput((prev) => ({ ...prev, activities }))
              }
            />
          </ClientSuspenseWrapper>
        </ClientSuspense>
        {/* others */}
        <ClientSuspense
          fallback={<div className="h-8 bg-base-300 skeleton"></div>}
        >
          <ClientSuspenseWrapper>
            <ResumeProfileOthers
              items={input.other}
              setItems={(other) => setInput((prev) => ({ ...prev, other }))}
            />
          </ClientSuspenseWrapper>
        </ClientSuspense>
        <div className="w-full flex justify-center">
          <Button type="button" variant={"outline"} className="flex gap-2 min-w-[70&] md:min-w-[40%]">
            Submit {mutation.isPending && <Loader className="size-5 animate-spin" />}
          </Button>
        </div>
      </form>
    </div>
  );
}

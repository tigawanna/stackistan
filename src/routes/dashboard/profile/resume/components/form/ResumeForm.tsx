import { useFormHook } from "@/components/form/useForm";
import { PBFieldWrapper } from "@/lib/pb/components/form/PBFieldWrapper";
import { StackistanResumeProfileCreate } from "@/lib/pb/database";
import { useViewer } from "@/lib/pb/hooks/useViewer";
import { SelectResumeProfileType } from "./SelectResumeProfileType";
import ClientSuspenseWrapper from "@/components/wrappers/ClientSuspenseWrapper";
import { ClientSuspense, usePageContext } from "rakkasjs";
import { useMutation } from "@tanstack/react-query";
import { pbTryCatchWrapper } from "@/lib/pb/utils";
import { ArrayFormFields } from "./ArrayFormFields";
import { StackistanResumeProfileEducation } from "@/lib/pb/custom-db-types";
import { ResumeProfileProjects } from "./resume-parts/ResumeProfileProjects";

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
          list: [
            { name: "name 1", description: "description 1", link: "link 1" },
          ],
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
    <div className="w-full h-full flex flex-col items-center justify-center pl-3">
      {/*  intro */}
      <div className="w-full h-fit flex-col px-2 pt-10">
        <h1 className="text-3xl fonr bold">Create resume profile</h1>
        <p className="text-sm brightness-75 md:max-w-[70%]">
          Create your resume profile to use in future job applications , the
          default is a general one but feel free to creaate specilized one like
          one for backead frontend developer if you are fullstack
        </p>
      </div>
      <form className="h-full w-full flex flex-col justify-center items-center overflow-auto ">
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
        <ResumeProfileProjects
          projects={input.projects}
          setProjects={(projects) =>
            setInput((prev) => ({ ...prev, projects }))
          }
        />
        {/* projects */}
        {/* <div className="w-full">
          <span className="text-2xl font-bold">Projects</span>
          <ArrayFormFields
            items_shape={{
              name: "",
              description: "",
              link: "",
            }}
            items={input.projects}
            setArrayValues={(value) => {
              setInput((prev) => {
                return {
                  ...prev,
                  projects: { list: value },
                };
              });
            }}
          />
        </div> */}
        {/* skills */}
        {/* <div className="w-full">
          <span className="text-2xl font-bold">Skills</span>
          <ArrayFormFields
            items_shape={{
              name: "",
              level: 0,
            }}
            items={input.skills}
            setArrayValues={(value) => {
              setInput((prev) => {
                return {
                  ...prev,
                  skills: { list: value },
                };
              });
            }}
          />
        </div> */}
        activities
        <div className="w-full">
          <span className="text-2xl font-bold">Activities</span>
          <ArrayFormFields
            items_shape={{
              name: "",
              description: "",
              link: "",
            }}
            items={input.activities}
            setArrayValues={(value) => {
              setInput((prev) => {
                return {
                  ...prev,
                  activities: { list: value },
                };
              });
            }}
          />
        </div>
        {/* education */}
        {/* <div className="w-full">
          <span className="text-2xl font-bold">Education</span>
          <ArrayFormFields<StackistanResumeProfileEducation>
            items_shape={{
              school: "",
              fieldOfStudy: "",
              qualification: "Certificate",
              from: "",
              to: "",
            }}
            items={input.education}
            setArrayValues={(value) => {
              setInput((prev) => {
                return {
                  ...prev,
                  education: { list: value },
                };
              });
            }}
          />
        </div> */}
      </form>
    </div>
  );
}

import { StackistanResumeProfileCreate } from "@/lib/pb/database";
import { Edit } from "lucide-react";
import { useState } from "react";
import { RowFormEditor } from "./RowFormEditor";

type StackistanResumeProfileProjects =
  StackistanResumeProfileCreate["projects"];
type StackistanResumeProfileProjectRow =
  NonNullable<StackistanResumeProfileProjects>["list"][number];
interface ResumeProfileProjectsProps {
  projects: StackistanResumeProfileProjects;
  setProjects: (projects: StackistanResumeProfileProjects) => void;
}

export function ResumeProfileProjects({
  projects,
  setProjects,
}: ResumeProfileProjectsProps) {
  function addNewProject(
    project: NonNullable<StackistanResumeProfileProjects>["list"][number],
  ) {
    setProjects({
      ...projects,
      list: [...(projects?.list ?? []), project],
    });
  }
  function updateProject(
    idx: number,
    project: StackistanResumeProfileProjectRow,
  ) {
    const old_list = [...(projects?.list ?? [])];
    const new_list = old_list.map((p, i) => {
      if (i === idx) {
        return project;
      }
      return p;
    });

    setProjects({ list: new_list });
  }
  function deleteProject(idx: number) {
    const old_list = [...(projects?.list ?? [])];
    const new_list = old_list.filter((_, i) => i !== idx);
    setProjects({
      list: new_list,
    });
  }
  console.log({ projects });
  const [arrayRow, setArrayRow] = useState<StackistanResumeProfileProjectRow>({
    description: "",
    link: "",
    name: "",
  });
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <h1 className="text-1xl font-bold">Projects</h1>
      <div className="overflow-x-auto w-full px-2 ">
        <table className="w-full table bg-base-300/40">
          <thead className="w-full bg-base-100">
            <tr className="w-full text-lg">
              <th>Name</th>
              <th>Description</th>
              <th>Link</th>
            </tr>
          </thead>

          <tbody className="w-full">
            {projects?.list?.map((project, index) => {
              return (
                <tr key={index + project.name} className="w-full relative">
                  <td>{project?.name}</td>
                  <td>{project?.description}</td>
                  <td>{project?.link}</td>
                  <td className="absolute right-2  cursor-pointer z-30">
                    {" "}
                    <RowFormEditor
                      input={arrayRow}
                      setInput={setArrayRow}
                      addNewRow={() => addNewProject(arrayRow)}
                      updateRow={() => updateProject(index, arrayRow)}
                      deleteRow={() => deleteProject(index)}
                      icon={
                        <Edit
                          className="size-5"
                          onClick={() => {
                            setArrayRow(project);
                          }}
                        />
                      }
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

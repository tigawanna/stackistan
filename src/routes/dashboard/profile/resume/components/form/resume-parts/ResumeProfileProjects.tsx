import { StackistanResumeProfileCreate } from "@/lib/pb/database";
import { Edit, Plus } from "lucide-react";
import { useState } from "react";
import { RowFormEditor } from "./RowFormEditor";

type StackistanResumeProfileItem =
  StackistanResumeProfileCreate["projects"];
type StackistanResumeProfileItemRow =
  NonNullable<StackistanResumeProfileItem>["list"][number];
interface ResumeProfileProjectsProps {
  items: StackistanResumeProfileItem;
  setItem: (items: StackistanResumeProfileItem) => void;
}

export function ResumeProfileProjects({
  items,
  setItem,
}: ResumeProfileProjectsProps) {
  function addNewProject(
    project: NonNullable<StackistanResumeProfileItem>["list"][number],
  ) {
    const old_list = [...(items?.list ?? [])];
    const new_list = [...old_list, project];
    console.log({ old_list, new_list });
    setItem({
      list: new_list,
    });
  }
  function updateProject(
    idx: number,
    project: StackistanResumeProfileItemRow,
  ) {
    const old_list = [...(items?.list ?? [])];
    const new_list = old_list.map((p, i) => {
      if (i === idx) {
        return project;
      }
      return p;
    });

    setItem({ list: new_list });
  }
  function deleteProject(idx: number) {
    const old_list = [...(items?.list ?? [])];
    const new_list = old_list.filter((_, i) => i !== idx);
    setItem({
      list: new_list,
    });
  }

  const [arrayRow, setArrayRow] = useState<StackistanResumeProfileItemRow>({
    name: "",
    description: "",
    link: "",
  });

  return (
    <div className="w-full h-full flex flex-col items-center justify-center ">
      <div className="w-full  flex flex-col   gap-1 p-2 ">
        <div className="w-full  flex gap-4 p-1">
        <h1 className="text-2xl font-bold">Projects</h1>
        <RowFormEditor
          newRow={true}
          input={arrayRow}
          setInput={setArrayRow}
          addNewRow={() => addNewProject(arrayRow)}
          icon={<Plus className="size-8" />}
        />
      </div>
      <p className="text-sm brightness-75">
        Add projects that you have worked on , include the link to the project if possible
      </p>
      </div>
      <div className="overflow-x-auto w-full px-2 ">
        <table className="w-full table bg-base-300/40 ">
          <thead className="w-full bg-base-300">
            <tr className="w-full text-lg">
              <th>Name</th>
              <th>Description</th>
              <th>Link</th>
            </tr>
          </thead>

          <tbody className="w-full">
            {items?.list?.map((one_item, index) => {
              return (
                <tr key={index + one_item.name} className="w-full relative">
                  {Object.entries(one_item).map(([k, v]) => {
                    return <td key={k + index}>{v}</td>;
                  })}

                  <td className="absolute right-2  cursor-pointer z-30">
                    {" "}
                    <RowFormEditor
                      input={arrayRow}
                      setInput={setArrayRow}
                      updateRow={() => updateProject(index, arrayRow)}
                      deleteRow={() => deleteProject(index)}
                      icon={
                        <Edit
                          className="size-5"
                          onClick={() => {
                            setArrayRow(one_item);
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

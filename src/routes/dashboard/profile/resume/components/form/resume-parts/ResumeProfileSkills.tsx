import { StackistanResumeProfileCreate } from "@/lib/pb/old-database";
import { Edit, Plus } from "lucide-react";
import { useState } from "react";
import { RowFormEditor } from "./RowFormEditor";

type StackistanResumeProfileItem = StackistanResumeProfileCreate["skills"];
type StackistanResumeProfileItemRow =
  NonNullable<StackistanResumeProfileItem>["list"][number];
interface ResumeProfileSkillsProps {
  items: StackistanResumeProfileItem;
  setItems: (items: StackistanResumeProfileItem) => void;
}

export function ResumeProfileSkills({
  items,
  setItems,
}: ResumeProfileSkillsProps) {
  function addNewProject(
    one_item: NonNullable<StackistanResumeProfileItem>["list"][number],
  ) {
    const old_list = [...(items?.list ?? [])];
    const new_list = [...old_list, one_item];
    console.log({ old_list, new_list });
    setItems({
      list: new_list,
    });
  }
  function updateProject(
    idx: number,
    one_item: StackistanResumeProfileItemRow,
  ) {
    const old_list = [...(items?.list ?? [])];
    const new_list = old_list.map((p, i) => {
      if (i === idx) {
        return one_item;
      }
      return p;
    });

    setItems({ list: new_list });
  }
  function deleteProject(idx: number) {
    const old_list = [...(items?.list ?? [])];
    const new_list = old_list.filter((_, i) => i !== idx);
    setItems({
      list: new_list,
    });
  }

  const [arrayRow, setArrayRow] = useState<StackistanResumeProfileItemRow>({
    level: "10%",
    name: "",
  });
  const skills_select_options: {
    label: string;
    value: StackistanResumeProfileItemRow["level"];
  }[] = [
    { label: "10%", value: "10%" },
    { label: "20%", value: "20%" },
    { label: "30%", value: "30%" },
    { label: "40%", value: "40%" },
    { label: "50%", value: "50%" },
    { label: "60%", value: "60%" },
    { label: "70%", value: "70%" },
    { label: "80%", value: "80%" },
    { label: "90%", value: "90%" },
    { label: "100%", value: "100%" },
  ];
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="w-full  flex flex-col   gap-1 p-2 ">
        <div className="w-full  flex gap-4 p-1">
          <h1 className="text-2xl font-bold">Skills</h1>
          <RowFormEditor<StackistanResumeProfileItemRow>
            newRow={true}
            input={arrayRow}
            setInput={setArrayRow}
            addNewRow={() => addNewProject(arrayRow)}
            icon={<Plus className="size-8" />}
            inputOptions={{
              level: {
                select: {
                  fields: skills_select_options,
                },
              },
            }}
          />
        </div>
        <p className="text-sm brightness-75">
          Add specific skills like HTML, CSS, Docker, Linux...
        </p>
      </div>
      <div className="overflow-x-auto w-full px-2 ">
        <table className="w-full table bg-base-300/40 ">
          <thead className="w-full bg-base-300">
            <tr className="w-full text-lg">
              <th>name</th>
              <th>level</th>
            </tr>
          </thead>

          <tbody className="w-full">
            {items?.list?.map((one_item, index) => {
              return (
                <tr key={index + one_item.level} className="w-full relative">
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

import { StackistanResumeProfileCreate } from "@/lib/pb/database";
import { Edit, Plus } from "lucide-react";
import { useState } from "react";
import { RowFormEditor } from "./RowFormEditor";

type StackistanResumeProfileItem = StackistanResumeProfileCreate["other"];
type StackistanResumeProfileItemRow =
  NonNullable<StackistanResumeProfileItem>["list"][number];
interface ResumeProfileOthersProps {
  items: StackistanResumeProfileItem;
  setItems: (items: StackistanResumeProfileItem) => void;
}

export function ResumeProfileOthers({
  items,
  setItems,
}: ResumeProfileOthersProps) {
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
    name: "",
    description: "",
    link: "",
  });

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="w-full  flex  gap-4 p-1">
        <h1 className="text-2xl font-bold">Other</h1>
        <RowFormEditor<StackistanResumeProfileItemRow>
          newRow={true}
          input={arrayRow}
          setInput={setArrayRow}
          addNewRow={() => addNewProject(arrayRow)}
          icon={<Plus className="size-8" />}

        />
      </div>
      <div className="overflow-x-auto w-full px-2 ">
        <table className="w-full table bg-base-300/40 ">
          <thead className="w-full bg-base-300">
            <tr className="w-full text-lg">
              <th>name</th>
              <th>description</th>
              <th>link</th>
            </tr>
          </thead>

          <tbody className="w-full">
            {items?.list?.map((one_item, index) => {
              return (
                <tr key={index} className="w-full relative">
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

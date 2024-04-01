import { PBListCollection } from "@/lib/pb/components/form/input-parts/PBListCollection";
import { PBPickRelationsModal, PBrelationPicker } from "@/lib/pb/components/form/input-parts/PBrelationPicker";
import { StackistanTechnologiesResponse } from "@/lib/pb/database";
import { PageProps } from "rakkasjs";
import { useState } from "react";

export default function TestPage({}: PageProps) {
  const [input, setInput] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  return (
    <div className="flex h-full   w-full flex-col  ">
      <div className="w-full h-[95%]  ">
        <PBPickRelationsModal<StackistanTechnologiesResponse>
          selectedRows={selectedRows}
          setSelectedRows={setSelectedRows}
          collectionName="stackistan_technologies"
          columns={{
            name: {
              name: "name",
            },
          }}
          fieldLabel="dependancies"
          searchParamKey="tc"
          filterBy="name"
        />
      </div>
    </div>
  );
}

import { GenericFormEditor } from "@/lib/pb/components/form/generic-inputs/GenericFormEditor";
import { GenericFormFilePicker } from "@/lib/pb/components/form/generic-inputs/GenericFormFilePicker";
import { GenericFormJSONEditor } from "@/lib/pb/components/form/generic-inputs/GenericFormJSONEditor";
import { StackistanUsersCreate } from "Database";
import { PageProps } from "rakkasjs";
import { useEffect, useRef, useState } from "react";
import { codeToHtml } from "shiki";

export default function TestPage({}: PageProps) {
  const [input, setInput] = useState<StackistanUsersCreate>({
    avatar:"small_me_rJOoyYxfMq.jpg",
    id:"knnhcf37jsy0ud5"
  });

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <div className="w-[80%] ">

        <GenericFormFilePicker
          input={input}
          setInput={setInput}
          fieldLabel="avatar"
          collaction_id_or_name="stackistan_users"
          fieldKey="avatar"
        />
      </div>
    </div>
  );
}

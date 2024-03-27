import { ClientSuspense, PageProps } from "rakkasjs";
import CherryMarkdownEditor from "@/components/editor/cherry-markdown/CherryMarkdownEditor";
import { GenericFormEditor } from "@/lib/pb/components/form/generic-inputs/GenericFormEditor";
import { useState } from "react";
import { GenericTable } from "@/components/data-table/parts/generic-table";
import { GenericDataTable } from "@/lib/pb/components/table/GenericDataTable";
import { Technologies } from "./components/Technologies";





export default function TestPage({}: PageProps) {
  const [input,setInput] = useState({
    name: "",
    email: "",
    message: "",
  })

  return (
    <div className="flex h-full   w-full flex-col  ">
      <div className="w-full h-[90%] ">
        {/* <GenericTable collction_name="stackistan_technologies" /> */}
    <Technologies/>
      </div>
      {/* <GenericFormEditor fieldKey="message" input={input} setInput={setInput} /> */}
      {/* <PlateEditorReact /> */}
      {/* <TinyMCEEditor/> */}
    </div>
  );
}

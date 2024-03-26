import { ClientSuspense, PageProps } from "rakkasjs";
import CherryMarkdownEditor from "@/components/editor/cherry-markdown/CherryMarkdownEditor";
import { GenericFormEditor } from "@/lib/pb/components/form/generic-inputs/GenericFormEditor";
import { useState } from "react";





export default function TestPage({}: PageProps) {
  const [input,setInput] = useState({
    name: "",
    email: "",
    message: "",
  })
  console.log(input)
  return (
    <div className="flex h-full mt-9  w-full flex-col items-center justify-center">   
      <GenericFormEditor fieldKey="message" input={input} setInput={setInput} />
      {/* <PlateEditorReact /> */}
      {/* <TinyMCEEditor/> */}
    </div>
  );
}

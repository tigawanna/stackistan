import { ClientSuspense, PageProps } from "rakkasjs";

import { useState } from "react";

import { Technologies } from "./components/Technologies";
import { ListPagination } from "@/components/pagination/ReactresponsivePagination";

export default function TestPage({}: PageProps) {
  const [input, setInput] = useState({
    name: "",
    email: "",
    message: "",
  });

  return (
    <div className="flex h-full   w-full flex-col  ">
      <div className="w-full h-[95%] ">
        {/* <GenericTable collction_name="stackistan_technologies" /> */}
        <Technologies />
      </div>

      {/* <GenericFormEditor fieldKey="message" input={input} setInput={setInput} /> */}
      {/* <PlateEditorReact /> */}
      {/* <TinyMCEEditor/> */}
    </div>
  );
}

import { PageProps } from "rakkasjs";
import { useState } from "react";


export default function TestPage({}: PageProps) {
  const [input, setInput] = useState({
    name: "",
    email: "",
    message: "",
  });

  return (
    <div className="flex h-full   w-full flex-col  ">
      <div className="w-full h-[95%] text-3xl font-bold ">
          Test page 
      </div>
    </div>
  );
}

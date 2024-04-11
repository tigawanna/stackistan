import { PageProps } from "rakkasjs";
import { useState } from "react";
import { GithubRepos, OneGithubRepo } from "../projects/_components/github/GithubRepos";


export default function TestPage({}: PageProps) {
    const [selectedRow, setSelectedRows] = useState<OneGithubRepo>(
      {
        name: "",
        description: "",
        image_url: "",
        link: "",
      },
    );
    console.log("===== selected rows ====== ",selectedRow)
  return (
    <div className="flex h-full   w-full flex-col  ">
      <GithubRepos setOpen={()=>{}} selectedRepo={selectedRow}  setSelectedRepo={setSelectedRows} />

    </div>
  );
}

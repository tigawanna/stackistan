import { PageProps } from "rakkasjs";
import { useState } from "react";
import { GithubRepos, OneGithubRepo } from "../projects/_components/github/GithubRepos";


export default function TestPage({}: PageProps) {
    const [selectedRows, setSelectedRows] = useState<OneGithubRepo[]>([
      {
        name: "",
        description: "",
        image_url: "",
        link: "",
      },
    ]);
    console.log("===== selected rows ====== ",selectedRows)
  return (
    <div className="flex h-full   w-full flex-col  ">
      <GithubRepos selectedRows={selectedRows} setSelectedRows={setSelectedRows} />
    </div>
  );
}

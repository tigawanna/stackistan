import { TheTextInput } from "@/components/form/inputs/TheTextInput";
import { GithubIcon, Loader } from "lucide-react";
import { Suspense, useState } from "react";
import { SearchGithubprojects } from "./SearchGithubprojects";
import { TheDaisyUIFormModal } from "@/components/modal/TheDaisyUiFormModal";
import { StackistanResumeProfileCreate } from "@/lib/pb/database";
import { StackistanUsersResponse } from "Database";

type StackistanResumeProfileItem = StackistanResumeProfileCreate["projects"];

interface AddFromGithubProps {
  profile: StackistanUsersResponse;
  modal_id: string;
  items: StackistanResumeProfileItem;
  setItem: (items: StackistanResumeProfileItem) => void;
}

export function AddFromGithub({
  modal_id,
  profile,
  items,
  setItem,
}: AddFromGithubProps) {
  const [keyword, setKeyword] = useState("");
  const [github_username, setGithubUsername] = useState(
    profile?.github_username,
  );
  function handleChange(e: any) {
    setKeyword(e.target.value);
  }
  function handleGithubUsernameChange(e: any) {
    setGithubUsername(e.target.value);
  }
  return (
    <TheDaisyUIFormModal
      id={modal_id}
      close_on_bg_click={true}
      label={
        <span className="btn btn-outline flex gap-2 ">
          <h3> add from github</h3>
          <GithubIcon className="h-6 w-6" />
        </span>
      }
    >
      <div>
        <div className=" relative flex w-full items-center justify-center">
          {!(github_username || github_username === "") ? (
            <TheTextInput
              value={github_username}
              field_key={"github"}
              field_name="Github Username"
              onChange={handleChange}
            />
          ) : (
            <TheTextInput
              value={keyword}
              field_key={"keyword"}
              field_name="Search"
              onChange={handleChange}
            />
          )}
        </div>
        <Suspense fallback={<div className="w-full min h-[40vh]"><Loader className="w-10 h-10 animate-spin"/></div>}>
          {(github_username || github_username === "") && (
            <SearchGithubprojects
              project={items}
              setProject={setItem}
              github_username={github_username ?? ""}
              modal_id={modal_id}
              keyword={keyword}
            />
          )}
        </Suspense>
      </div>
    </TheDaisyUIFormModal>
  );
}

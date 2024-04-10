import { SearchBox } from "@/components/search/SearchBox";
import { GenericDataCardsListSuspenseFallback } from "@/lib/pb/components/card-list/GenericDataCardsListSuspenseFallback";
import { useDebouncedSearchWithhParams } from "@/utils/hooks/search";
import { Suspense, useState } from "react";
import { FaGithub } from "react-icons/fa";
import { GithubReposList } from "./GithubReposList";
import { useViewer } from "@/lib/pb/hooks/useViewer";
import { GithubViewerInput } from "./GithubViewerInput";

export interface OneGithubRepo {
  name: string;
  description: string;
  link: string;
  image_url: string;
}

interface GithubReposProps {
  selectedRepo: OneGithubRepo;
  setSelectedRepo: (item: OneGithubRepo) => void;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function GithubRepos({
  selectedRepo,
  setSelectedRepo,
  setOpen,
}: GithubReposProps) {
  //   const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const searchParamKey = "repo";
  const { isDebouncing, debouncedValue, setKeyword, keyword } =
    useDebouncedSearchWithhParams({ default_search_query: "" });

  const { data } = useViewer();
  const [githubUsername, setGithubUsername] = useState(
    data?.github_username ?? "",
  );
  return (
    <div className="w-full h-full flex flex-col gap-3   ">
      <div className="px-3 flex flex-col md:flex-row md:justify-end justify-between gap-4 pr-5">
        <div className="w-full md:w-[60%]  lg:w-[40%] flex  items-center justify-center gap-0.5 px-2">
          <FaGithub className="size-7" />
          <div className="w-fit">
            <GithubViewerInput
              githubUsername={githubUsername}
              setGithubUsername={setGithubUsername}
            />
          </div>

          <SearchBox
            inputProps={{
              placeholder: "Search through projects",
            }}
            debouncedValue={debouncedValue}
            isDebouncing={isDebouncing}
            setKeyword={setKeyword}
            keyword={keyword}
          />
        </div>
      </div>
      <div className="w-full h-[99vh] overflow-auto">
        <Suspense
          fallback={
            <GenericDataCardsListSuspenseFallback cardClassName="max-h-28" />
          }
        >
          <GithubReposList
            githubUsername={githubUsername}
            debouncedValue={debouncedValue}
            selectedRepo={selectedRepo}
            setSelectedRepo={setSelectedRepo}
            setOpen={setOpen}
          />
        </Suspense>
      </div>
    </div>
  );
}

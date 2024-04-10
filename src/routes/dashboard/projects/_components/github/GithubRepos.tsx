import { SearchBox } from "@/components/search/SearchBox";
import { GenericDataCardsListSuspenseFallback } from "@/lib/pb/components/card-list/GenericDataCardsListSuspenseFallback";
import { useDebouncedSearchWithhParams } from "@/utils/hooks/search";
import { useCustomSearchParams } from "@/utils/hooks/useCustomSearchParams";
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
  selectedRows: OneGithubRepo[];
  setSelectedRows: React.Dispatch<React.SetStateAction<OneGithubRepo[]>>;
}

export function GithubRepos({
  selectedRows,
  setSelectedRows,
}: GithubReposProps) {
  //   const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const searchParamKey = "repo";
  const { isDebouncing, debouncedValue, setKeyword, keyword } =
    useDebouncedSearchWithhParams({ default_search_query: "" });
  const { searchParam } = useCustomSearchParams({
    key: searchParamKey,
    defaultValue: "1",
  });
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
        <Suspense fallback={<GenericDataCardsListSuspenseFallback />}>
          <GithubReposList
            githubUsername={githubUsername}
            debouncedValue={debouncedValue}
            searchParam={searchParam}
            selectedRows={selectedRows}
            setSelectedRows={setSelectedRows}
          />
        </Suspense>
      </div>
    </div>
  );
}

import { SearchBox } from "@/components/search/SearchBox";
import { GenericDataCardsListSuspenseFallback } from "@/lib/pb/components/card-list/GenericDataCardsListSuspenseFallback";
import { useDebouncedSearchWithhParams } from "@/utils/hooks/search";
import { useCustomSearchParams } from "@/utils/hooks/useCustomSearchParams";
import { Suspense } from "react";
import { TechnologyList } from "./TechnologyList";

interface TechnologiesProps {}

export function Technologies({}: TechnologiesProps) {
  const searchParamKey = "tc";
  const { isDebouncing, debouncedValue, setKeyword, keyword } =
  useDebouncedSearchWithhParams({ default_search_query: "" });
  const { searchParam } = useCustomSearchParams({
    key: searchParamKey,
    defaultValue: "1",
  });


  return (
    <div className="w-full h-full flex flex-col gap-2   ">
      <div className="px-3 flex flex-col md:flex-row justify-between gap-3 pr-5">
        <div className="w-full">
          <h1 className="text-2xl bg-base-200 ">Technologies</h1>
        </div>
        <SearchBox
          inputProps={{
            placeholder: "Search through technologies",
          }}
          debouncedValue={debouncedValue}
          isDebouncing={isDebouncing}
          setKeyword={setKeyword}
          keyword={keyword}
        />
      </div>
      <div className="w-full h-[99vh] overflow-auto">
        <Suspense
          fallback={<GenericDataCardsListSuspenseFallback />}>
            <TechnologyList searchParamKey={searchParamKey} debouncedValue={debouncedValue} searchParam={searchParam}/>
        </Suspense>
      </div>
    </div>
  );
}

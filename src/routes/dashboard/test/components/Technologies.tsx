import { SearchBox } from "@/components/search/SearchBox";
import { CollectionName } from "@/lib/pb/client";
import { GenericDataTable } from "@/lib/pb/components/table/GenericDataTable";
import { usePocketbase } from "@/lib/pb/hooks/use-pb";
import { useDebouncedSearchWithhParams } from "@/utils/hooks/search";
import { useCustomSearchParams } from "@/utils/hooks/useCustomSearchParams";
import { RecordListOptions } from "pocketbase";
import {} from "typed-pocketbase";
interface TechnologiesProps {}

export function Technologies({}: TechnologiesProps) {
  const searchParamKey = "tc";
  const collectionName: CollectionName = "stackistan_technologies";
  const { pb } = usePocketbase();
  const { isDebouncing, debouncedValue, setKeyword, keyword } =
    useDebouncedSearchWithhParams({ default_search_query: "" });
  const { search_param } = useCustomSearchParams({
    key: searchParamKey,
    default_value: "1",
  });
  const page = debouncedValue.length > 0 ? 1 : search_param;

  const pbQueryOptions: RecordListOptions = {
    // @ts-expect-error
    sort: pb.from(collectionName).createSort("+created") ?? "",
    // @ts-expect-error
    filter: pb.from(collectionName).createFilter(`name ~ "${keyword}"`) ?? "",
  };
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
        <GenericDataTable
          searchParamKey={searchParamKey}
          key={page + debouncedValue}
          page={+page}
          debouncedValue={debouncedValue}
          collectionName={collectionName}
          pbQueryOptions={pbQueryOptions}
          columns={{
            name: { fieldKey: "name", fieldLabel: "Name", fieldType: "text" },
            description: {
              fieldKey: "description",
              fieldLabel: "Description",
              fieldType: "text",
            },
            created: {
              fieldKey: "created",
              fieldLabel: "Created",
              fieldType: "date",
            },
          }}
        />
      </div>
    </div>
  );
}

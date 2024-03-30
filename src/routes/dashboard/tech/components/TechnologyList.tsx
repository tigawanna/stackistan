import { SearchBox } from "@/components/search/SearchBox";
import { CollectionName } from "@/lib/pb/client";
import { GenericDataCardsList } from "@/lib/pb/components/card-list/GenericDataCardsList";
import { GenericDataTable } from "@/lib/pb/components/table/GenericDataTable";
import { DataTableSkeleton } from "@/lib/pb/components/table/components/data-table-skeleton";
import { usePocketbase } from "@/lib/pb/hooks/use-pb";
import { useDebouncedSearchWithhParams } from "@/utils/hooks/search";
import { useCustomSearchParams } from "@/utils/hooks/useCustomSearchParams";
import { RecordListOptions } from "pocketbase";
import { Suspense } from "react";
import { TechnologyCard } from "./TechnologyCard";
import { StackistanTechnologiesResponse } from "Database";

interface TechnologyCardListProps {}

export function TechnologyCardList({}: TechnologyCardListProps) {
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
        <Suspense
          fallback={<DataTableSkeleton columnCount={3} rowCount={12} />}
        >
          <GenericDataCardsList<StackistanTechnologiesResponse>
            card={(record) => <TechnologyCard tech={record} />}
            searchParamKey={searchParamKey}
            key={page + debouncedValue}
            page={+page}
            debouncedValue={debouncedValue}
            collectionName={collectionName}
            pbQueryOptions={pbQueryOptions}
            columns={{
              name: {
                fieldKey: "name",
                fieldLabel: "Name",
                fieldType: "text",
                fieldOptions: {
                  type: "text",
                },
              },
              description: {
                fieldKey: "description",
                fieldLabel: "Description",
                fieldType: "editor",
                fieldUpdatable: true,
                fieldOptions: {
                  type: "text",
                },
              },
              created: {
                fieldKey: "created",
                fieldLabel: "Created",
                fieldType: "date",
                omitFromForms: true,
                fieldOptions: {
                  type: "date",
                },
              },
            }}
          />
        </Suspense>
      </div>
    </div>
  );
}

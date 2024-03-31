import { SearchBox } from "@/components/search/SearchBox";
import { CollectionName } from "@/lib/pb/client";
import { GenericDataCardsList } from "@/lib/pb/components/card-list/GenericDataCardsList";
import { GenericDataTable } from "@/lib/pb/components/table/GenericDataTable";
import { DataTableSkeleton } from "@/lib/pb/components/table/components/data-table-skeleton";
import { usePocketbase } from "@/lib/pb/hooks/use-pb";
import { useDebouncedSearchWithhParams } from "@/utils/hooks/search";
import { useCustomSearchParams } from "@/utils/hooks/useCustomSearchParams";
import { RecordListOptions } from "pocketbase";
import { Suspense, useState } from "react";
import { TechnologyCard } from "./TechnologyCard";
import { StackistanTechnologiesResponse } from "Database";
import { GenericDataCardsListSuspenseFallback } from "@/lib/pb/components/card-list/GenericDataCardsListSuspenseFallback";

interface TechnologyCardListProps {}

export function TechnologyCardList({}: TechnologyCardListProps) {
  const searchParamKey = "tc";
  const collectionName: CollectionName = "stackistan_technologies";
    const [selectedRows, setSelectedRows] = useState<string[]>(
       [],
    );
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
    sort: pb.from(collectionName).createSort("+name") ?? "",
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
      {/* <GenericDataCardsListSuspenseFallback /> */}
      <div className="w-full h-[99vh] overflow-auto">
        <Suspense fallback={<GenericDataCardsListSuspenseFallback />}>
          <GenericDataCardsList<StackistanTechnologiesResponse>
            card={(record, checked, selectItem) => (
              <TechnologyCard
                tech={record}
                checked={checked}
                selectItem={selectItem}
              />
            )}
            searchParamKey={searchParamKey}
            selectedRows={selectedRows}
            setSelectedRows={setSelectedRows}
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

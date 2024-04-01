import { ClientResponseError, RecordListOptions } from "pocketbase";
import { PBFieldWrapper } from "../input-parts/PBFieldWrapper";
import { CollectionName } from "@/lib/pb/client";
import { Suspense } from "react";
import { GenericDataTable, TableColumns } from "../../table/GenericDataTable";
import { DataTableSkeleton } from "../../table/components/data-table-skeleton";
import { usePocketbase } from "@/lib/pb/hooks/use-pb";
import { useDebouncedSearchWithhParams } from "@/utils/hooks/search";
import { useCustomSearchParams } from "@/utils/hooks/useCustomSearchParams";
import { SearchBox } from "@/components/search/SearchBox";

interface GenericFormRelationPickerProps<T extends Record<string, any>> {
  input: T;
  fieldKey: keyof T;
  fieldLabel?: string;
  setInput: React.Dispatch<React.SetStateAction<T>>;
  fieldError?: ClientResponseError | null | undefined;
  collectionName: CollectionName;
  filterBy: keyof T;
  columns: TableColumns<T>;
}

export function GenericFormRelationPicker<T extends Record<string, any>>({
  fieldKey,
  input,
  setInput,
  fieldError,
  fieldLabel,
  filterBy,
  collectionName,
  columns
}: GenericFormRelationPickerProps<T>) {
    const searchParamKey = "tc";
  
    const { pb } = usePocketbase();
    const { debouncedValue, keyword,isDebouncing,setKeyword } = useDebouncedSearchWithhParams({ default_search_query: "" });
    const { searchParam } = useCustomSearchParams({
      key: searchParamKey,
      defaultValue: "1",
    });
    const page = debouncedValue.length > 0 ? 1 : searchParam;

    const pbQueryOptions: RecordListOptions = {
      // @ts-expect-error
      sort: pb.from(collectionName).createSort("+created") ?? "",
      // @ts-expect-error
      filter: pb.from(collectionName).createFilter(`${filterBy} ~ "${keyword}"`) ?? "",
    };
  return (
    <PBFieldWrapper field_key={fieldKey} pb_error={fieldError}>
      <div className="h-full w-full min-h-[40vh] rounded-lg p-1">
        <div className="px-3 flex flex-col md:flex-row justify-between gap-3 pr-5">
          <div className="w-full">
            <h1 className="text-2xl bg-base-200 ">{fieldLabel}</h1>
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
        <Suspense
          fallback={<DataTableSkeleton columnCount={3} rowCount={12} />}
        >
          <GenericDataTable
            searchParamKey={searchParamKey}
            key={page + debouncedValue}
            page={+page}
            debouncedValue={debouncedValue}
            collectionName={collectionName}
            pbQueryOptions={pbQueryOptions}
            initiallySelectedRows={input[fieldKey] ? [input[fieldKey]] : []}
            getSelectedRows={(selected) => {
              setInput((prev) => ({ ...prev, [fieldKey]: selected }));
            }}
            relationsPickerMode
            // @ts-expect-error
            columns={columns}
          />
        </Suspense>
      </div>
    </PBFieldWrapper>
  );
}

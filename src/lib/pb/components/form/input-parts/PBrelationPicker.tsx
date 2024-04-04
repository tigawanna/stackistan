import { PBListCollection, PBListCollectioncolumn } from "./PBListCollection";
import { useDebouncedSearchWithhParams } from "@/utils/hooks/search";
import { useCustomSearchParams } from "@/utils/hooks/useCustomSearchParams";
import { SearchBox } from "@/components/search/SearchBox";
import { RecordModel } from "pocketbase";
import { CollectionName } from "@/lib/pb/client";
import { Suspense, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/shadcn/ui/dialog";
import { Check, GitFork } from "lucide-react";

interface PBrelationPickerProps<T extends RecordModel> {
  fieldLabel: string;
  filterBy: keyof T;
  columns: Partial<PBListCollectioncolumn<T>>;
  collectionName: CollectionName;
  searchParamKey: string;
  selectedRows?: string[];
  setSelectedRows: (selectedRows: string[]) => void;
}

export function PBrelationPicker<T extends RecordModel>({
  collectionName,
  columns,
  searchParamKey,
  filterBy,
  selectedRows = [],
  setSelectedRows,
  fieldLabel,
}: PBrelationPickerProps<T>) {
  const { isDebouncing, debouncedValue, setKeyword, keyword } =
    useDebouncedSearchWithhParams({ default_search_query: "" });
  const { searchParam } = useCustomSearchParams({
    key: searchParamKey,
    defaultValue: "1",
  });

  // console.log({ selectedRows });
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-2">
      <div className="w-full px-3 flex flex-col md:flex-row justify-between gap-3 pr-5">
        <div className="w-full">
          <h1 className="text-2xl bg-base-200 ">{fieldLabel}</h1>
        </div>

        <SearchBox
          inputProps={{
            placeholder: "type to search",
          }}
          debouncedValue={debouncedValue}
          isDebouncing={isDebouncing}
          setKeyword={setKeyword}
          keyword={keyword}
        />
      </div>
      <div className="w-full h-[95%]">
        <ul className="w-full p-2 flex flex-wrap gap-2 overflow-clip max-h-[25%]">
          <li>{selectedRows?.length} selected</li>
          {selectedRows?.slice?.(0, 5)?.map((id) => (
            <li key={id} className="border bg-base-300/70 rounded-3xl  px-1">
              {id}
            </li>
          ))}
          {selectedRows?.length > 5 && <li>......</li>}
        </ul>

        <Suspense
          fallback={
            <div className="w-full h-full flex flex-col gap-2">
              {Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={i}
                  className="h-8 w-[95%]   bg-base-300/40 skeleton gap-2 rounded-lg"
                ></div>
              ))}
            </div>
          }
        >
          <PBListCollection<T>
            selectedRows={selectedRows}
            collectionName={collectionName}
            columns={columns}
            debouncedValue={debouncedValue}
            searchParam={searchParam}
            searchParamKey={searchParamKey}
            filterBy={filterBy}
            setSelectedRows={(rows)=>setSelectedRows(rows)}
          />
        </Suspense>
      </div>
    </div>
  );
}

export function PBPickRelationsModal<T extends RecordModel>({
  collectionName,
  columns,
  searchParamKey,
  filterBy,
  selectedRows,
  setSelectedRows,
  fieldLabel,
}: PBrelationPickerProps<T>) {
    const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <span className="cursor-pointer flex gap-1  btn btn-outline  p-2">
          <GitFork className="" /> Pick relations
        </span>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[80%] w-full h-full overflow-auto ">
        <DialogHeader>
          <DialogTitle>Update Entry</DialogTitle>
          <DialogDescription>
            submit an update propasal for approval
          </DialogDescription>
        </DialogHeader>
        <div className="w-full  h-[95%] overflow-y-scroll">
          <PBrelationPicker
            collectionName={collectionName}
            columns={columns}
            searchParamKey={searchParamKey}
            filterBy={filterBy}
            fieldLabel={fieldLabel}
            setSelectedRows={setSelectedRows}
            selectedRows={selectedRows}
          />
        </div>
        <DialogClose className="flex gap-3 btn btn-wide btn-sm ">
          Done
          <Check className="h-5 w-5" />
        </DialogClose>

        {/* <DialogFooter className="sm:justify-start">
      </DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
}

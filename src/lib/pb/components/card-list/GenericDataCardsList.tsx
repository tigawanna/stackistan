import { useEffect, useState } from "react";
import { Check, ChevronDown, ChevronUp, Option } from "lucide-react";
import { Checkbox } from "@/components/shadcn/ui/checkbox";
import { useSuspenseQuery } from "@tanstack/react-query";
import { usePocketbase } from "@/lib/pb/hooks/use-pb";
import { pbTryCatchWrapper } from "@/lib/pb/utils";
import { CollectionName } from "@/lib/pb/client";
import { ListPagination } from "@/components/pagination/ReactresponsivePagination";
import { RecordListOptions, RecordModel } from "pocketbase";
import { CollectionColumnOptions } from "../generic-component-types";
import { Button } from "@/components/shadcn/ui/button";
import { CreateRowModal } from "@/lib/pb/components/table/components/CreateRowModal";
import { DeleteRowsModal } from "@/lib/pb/components/table/components/DeleteRowsModal";
import { SelectValue } from "@radix-ui/react-select";


export type TableColumns<T extends Record<string, any>> = {
  [K in keyof T]?: CollectionColumnOptions<T>;
};
interface GenericDataCardsListProps<T extends Record<string, any>> {
  page: number;
  perPage?: number;
  searchParamKey: string;
  debouncedValue: string;
  collectionName: CollectionName;
  columns: TableColumns<T>;
  card: (item: T) => JSX.Element;
  pbQueryOptions?: RecordListOptions | undefined;
  relationsPickerMode?: boolean;
  initiallySelectedRows?: string[];
  getSelectedRows?: (selectedRows: string[]) => void;
}

export function GenericDataCardsList<T extends Record<string, any>>({
  page,
  perPage = 12,
  debouncedValue,
  collectionName,
  columns,
  card,
  searchParamKey,
  pbQueryOptions,
  relationsPickerMode,
  initiallySelectedRows,
  getSelectedRows,
}: GenericDataCardsListProps<T>) {
  const { pb } = usePocketbase();
  const queryKey = [collectionName, String(page), debouncedValue];
  const query = useSuspenseQuery({
    queryKey,
    queryFn: () =>
      pbTryCatchWrapper(
        pb?.collection(collectionName).getList(+page, perPage, pbQueryOptions),
      ),
  });
  const data = query.data?.data?.items ?? [];
  // const [tableRows, setTableRows] = useState(data);
  const [selectedRows, setSelectedRows] = useState<string[]>(
    initiallySelectedRows ?? [],
  );
  const [activeColumns, setAcitveColumns] = useState<TableColumns<T>>(columns);
  function selectRow(id: string) {
    if (selectedRows.includes(id)) {
      setSelectedRows((prev) => {
        if (prev) {
          return prev.filter((i) => i !== id);
        }
        return prev;
      });
    } else {
      setSelectedRows((prev) => {
        if (!prev) {
          return prev;
        }
        return [...prev, id];
      });
    }
  }
  function selectAllRows(checked: boolean) {
    if (checked) {
      setSelectedRows(data.map((i) => i.id));
    } else {
      setSelectedRows([]);
    }
  }
  useEffect(() => {
    getSelectedRows?.(selectedRows);
  }, [selectedRows]);

  return (
    <div className="w-full h-full  p-5 flex flex-col gap-3">
      <div className="w-full flex justify-between gap-5 items-center">
        <div className="w-full flex gap-2 items-center ">
          <div className="w-full flex justify-between gap-2">
            <th className="flex gap-3">
              <span className="ml-2 flex gap-2">
                <Checkbox
                  checked={selectedRows.length === data.length}
                  onCheckedChange={selectAllRows}
                />
                Select All
              </span>
              {selectedRows.length > 0 && <span>{selectedRows.length}</span>}
            </th>
            {!relationsPickerMode && selectedRows.length > 0 && (
              <DeleteRowsModal
                collectionName={collectionName}
                ids={selectedRows}
              />
            )}

            {relationsPickerMode && (
              <Button className="flex" type="button">
                <Check
                  className=""
                  onClick={() => getSelectedRows?.(selectedRows)}
                />
                <span> Pick</span>
              </Button>
            )}
          </div>
          <CreateRowModal
            // @ts-expect-error
            rowFields={activeColumns}
            collectionName={collectionName}
            queryKey={queryKey}
          />
        </div>
      </div>

      <ul className="w-full flex flex-wrap justify-center gap-2">
        {data &&
          data.map((item) => {
            const checked = selectedRows.includes(item.id);
            return (
              <li
                key={item.id}
                className={
                  checked
                    ? "brightness-75 relative w-[95%] md:w-[40%] lg:w-[30%]"
                    : "relative w-[95%] md:w-[40%] lg:w-[30%]"
                }
              >
                <Checkbox
                  className="absolute top-2 right-2 z-40"
                  checked={checked}
                  onCheckedChange={() => selectRow(item.id)}
                />
                {/* @ts-expect-error */}
                {card(item)}
              </li>
            );
          })}
      </ul>
      <div className="absolute bottom-1 right-0 left-0">
        <ListPagination
          query_key={searchParamKey}
          total_pages={query?.data?.data?.totalPages ?? 1}
        />
        u
      </div>
    </div>
  );
}

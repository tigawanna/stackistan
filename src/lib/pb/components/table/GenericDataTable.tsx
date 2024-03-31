import { useEffect, useState } from "react";
import { Check, ChevronDown, ChevronUp, Option } from "lucide-react";
import { Checkbox } from "@/components/shadcn/ui/checkbox";
import { useSuspenseQuery } from "@tanstack/react-query";
import { usePocketbase } from "@/lib/pb/hooks/use-pb";
import { pbTryCatchWrapper } from "@/lib/pb/utils";
import { CollectionName } from "@/lib/pb/client";
import { ListPagination } from "@/components/pagination/ReactresponsivePagination";
import { RecordListOptions } from "pocketbase";
import { SelectTebleColumns } from "./components/SelectTebleColumns";
import { DeleteRowsModal } from "./components/DeleteRowsModal";
import { CollectionColumnOptions } from "../generic-component-types";
import { UpdateRowModal } from "./components/UpdateRowModal";
import { Button } from "@/components/shadcn/ui/button";
import { CreateRowModal } from "./components/CreateRowModal";

export type TableColumns<T extends Record<string, any>> = {
  [K in keyof T]?: CollectionColumnOptions<T>;
};
interface GenericDataTableProps<T extends Record<string, any>> {
  page: number;
  perPage?: number;
  searchParamKey: string;
  debouncedValue: string;
  collectionName: CollectionName;
  columns: TableColumns<T>;
  selectedRows: string[];
  setSelectedRows: React.Dispatch<React.SetStateAction<string[]>>;
  pbQueryOptions?: RecordListOptions | undefined;
  relationsPickerMode?: boolean;

  getSelectedRows?: (selectedRows: string[]) => void;
}

export function GenericDataTable<T extends Record<string, any>>({
  page,
  perPage = 12,
  debouncedValue,
  collectionName,
  selectedRows,
  setSelectedRows,
  columns,
  searchParamKey,
  pbQueryOptions,
  relationsPickerMode,

  getSelectedRows,
}: GenericDataTableProps<T>) {
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
  const [tableRows, setTableRows] = useState(data);
  //   const [selectedRows, setSelectedRows] = useState<string[]>(
  //  [],
  //   );
  const [activeColumns, setAcitveColumns] = useState<TableColumns<T>>(columns);

  function sortBy(key: keyof T, direction: "asc" | "desc") {
    setTableRows((prev) => {
      return [...prev].sort((a, b) => {
        // @ts-expect-error
        if (a[key] < b[key]) {
          return direction === "asc" ? -1 : 1;
        }
        // @ts-expect-error
        if (a[key] > b[key]) {
          return direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    });
  }
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
          <SelectTebleColumns
            activeColumns={activeColumns}
            setAcitveColumns={setAcitveColumns}
          />
          <div className="w-full flex justify-between gap-2">
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
      <table className="w-full table bg-base-300/40 ">
        <thead className="w-full bg-base-300 sticky top-0 rounded-lg">
          <tr className="w-full text-lg">
            <th className="">
              <Checkbox
                checked={selectedRows.length === data.length}
                onCheckedChange={selectAllRows}
              />
            </th>

            {Object.entries(activeColumns).map(([key, value]) => {
              if (value?.fieldHidden) {
                return null;
              }
              return (
                <th className="p-1" key={key}>
                  <span className="flex flex-col justify-center items-center  cursor-pointer">
                    {key}{" "}
                    <span className="flex text-primary">
                      <ChevronUp
                        className="hover:text-secondary "
                        onClick={() => sortBy(key as keyof T, "asc")}
                      />
                      <ChevronDown
                        className=" hover:text-secondary"
                        onClick={() => sortBy(key as keyof T, "desc")}
                      />
                    </span>
                  </span>
                </th>
              );
            })}
            <th className="">
              <Option />
            </th>
          </tr>
        </thead>
        <tbody>
          {(!tableRows || tableRows.length < 1) && (
            <tr>
              <td colSpan={Object.keys(activeColumns).length}>
                <p className="text-center">No data available</p>
              </td>
            </tr>
          )}
          {tableRows?.map((item) => {
            const checked = selectedRows.includes(item.id);
            return (
              <tr key={item.id} className={checked ? "bg-primary/10" : ""}>
                <td>
                  <Checkbox
                    checked={checked}
                    onCheckedChange={() => selectRow(item.id)}
                  />
                </td>
                {Object.entries(activeColumns).map(([key, value]) => {
                  if (value?.fieldHidden) {
                    return null;
                  }
                  if (value?.fieldKey) {
                    // @ts-expect-error
                    return <td key={item.id + key}>{item[value?.fieldKey]}</td>;
                  }
                })}
                <td className="p-2">
                  {!relationsPickerMode && (
                    <UpdateRowModal
                      row={item}
                      // @ts-expect-error
                      rowFields={activeColumns}
                      rowId={item.id}
                      collectionName={collectionName}
                      queryKey={queryKey}
                    />
                  )}
                </td>
              </tr>
            );
          })}
          <tr className="h-20"></tr>
        </tbody>
      </table>
      <div className="absolute bottom-1 right-0 left-0">
        <ListPagination
          query_key={searchParamKey}
          total_pages={query?.data?.data?.totalPages ?? 1}
        />
      </div>
    </div>
  );
}

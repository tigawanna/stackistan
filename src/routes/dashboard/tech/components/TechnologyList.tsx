import { CollectionName } from "@/lib/pb/client";
import { usePocketbase } from "@/lib/pb/hooks/use-pb";
import { useState } from "react";
import { TechnologyCard } from "./TechnologyCard";
import { and, eq, like } from "typed-pocketbase";
import { useSuspenseQuery } from "@tanstack/react-query";
import { pbTryCatchWrapper } from "@/lib/pb/utils";
import { ListPagination } from "@/components/pagination/ReactresponsivePagination";
import { Checkbox } from "@/components/shadcn/ui/checkbox";

interface TechnologyCardListProps {
  searchParamKey: string;
  debouncedValue: string;
  searchParam: string;
}

export function TechnologyList({
  debouncedValue,
  searchParam,
  searchParamKey,
}: TechnologyCardListProps) {
  const collectionName: CollectionName = "stackistan_technologies";
  const page = debouncedValue.length > 0 ? 1 : searchParam;
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const { pb } = usePocketbase();
  const query = useSuspenseQuery({
    queryKey: [collectionName, String(page), debouncedValue],
    queryFn: () => {
      return pbTryCatchWrapper(
        pb?.from(collectionName).getList(+page, 12, {
          sort: "+name",
          filter: and(
            like("name", debouncedValue),
            // eq("verified", "yes")
          ),
        }),
      );
    },
  });

  const data = query?.data?.data?.items ?? [];
  function selectItem(id: string) {
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
  return (
    <div className="w-full h-full flex flex-col gap-2   ">
      <div className="w-full flex justify-between gap-2">
        <div className="flex gap-3">
          <span className="ml-2 flex items-center gap-2">
            <Checkbox
              checked={
                selectedRows.length === data.length && data.length > 0
              }
              onCheckedChange={selectAllRows}
            />
            Select All
          </span>
          {selectedRows.length > 0 && <span>{selectedRows.length}</span>}
        </div>
      </div>
      <ul className="w-full h-[90%] flex flex-wrap justify-center gap-2">
        {data &&
          data.map((item) => {
            const checked = selectedRows.includes(item.id);
            return (
              <TechnologyCard
                key={item.id}
                checked={checked}
                selectItem={selectItem}
                tech={item}
              />
            );
          })}
      </ul>

      <div className="absolut bottom-1 right-0 left-0">
        <ListPagination
          query_key={searchParamKey}
          total_pages={query?.data?.data?.totalPages ?? 1}
        />
      </div>
    </div>
  );
}

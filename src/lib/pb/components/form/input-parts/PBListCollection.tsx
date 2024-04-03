import { ListPagination } from "@/components/pagination/ReactresponsivePagination";
import { CollectionName } from "@/lib/pb/client";
import { usePocketbase } from "@/lib/pb/hooks/use-pb";
import { pbTryCatchWrapper } from "@/lib/pb/utils";
import { Checkbox } from "@/components/shadcn/ui/checkbox";
import { useSuspenseQuery } from "@tanstack/react-query";
import { RecordModel } from "pocketbase";
import { and, like } from "typed-pocketbase";

export type PBListCollectioncolumn<T extends RecordModel> = {
  [key in keyof T]: {
    name: string;
  };
};

interface PBListCollectionProps<T extends RecordModel> {
  filterBy: keyof T;
  columns: Partial<PBListCollectioncolumn<T>>;
  collectionName: CollectionName;
  searchParamKey: string;
  debouncedValue: string;
  searchParam: string;
  selectedRows: string[];
  setSelectedRows: (selectedRows: string[]) => void;
}

export function PBListCollection<T extends RecordModel = RecordModel>({
selectedRows,setSelectedRows,
  collectionName,
  debouncedValue,
  searchParam,
  filterBy,
  columns,
  searchParamKey,
}: PBListCollectionProps<T>) {
  const page = debouncedValue.length > 0 ? 1 : searchParam;
  // console.log({selectedRows})
//   const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const { pb } = usePocketbase();
  const query = useSuspenseQuery({
    queryKey: [collectionName, String(page), debouncedValue],
    queryFn: () => {
      return pbTryCatchWrapper(
        pb?.from(collectionName).getList(+page, 5, {
          filter: and(
            // @ts-expect-error
            like(filterBy, debouncedValue),
            // eq("verified", "yes")
          ),
        }),
      );
    },
  });

  const data = query?.data?.data?.items ?? [];
  function selectItem(id: string) {
    if (selectedRows.includes(id)) {

      // setSelectedRows((prev) => {
      //   if (prev) {
      //     return prev.filter((i) => i !== id);
      //   }
      //   return prev;
      // });
      setSelectedRows(selectedRows.filter((i) => i !== id));

    } else {
      // setSelectedRows((prev) => {
      //   if (!prev) {
      //     return prev;
      //   }
      //   return [...prev, id];
      // });

      setSelectedRows([...selectedRows, id]);
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
    <div className="w-full h-full flex flex-col items-center justify-center relative overflow-auto">
      <div className="w-full flex justify-between items-center">
        {/* <Checkbox
          checked={
            selectedRows.length === data.length && selectedRows.length > 0
          }
          onCheckedChange={selectAllRows}
        /> */}
      </div>
      <ul className="w-full h-[90%] flex flex-col items-center justify-center gap-2 p-2">
        {data &&
          data.map((i) => {
            const checked = selectedRows.includes(i.id);
            return (
              <div
                className="w-full border rounded-lg p-2 flex items-center  gap-2"
                key={i.id}
              >
                <Checkbox
                  checked={checked}
                  onCheckedChange={() => selectItem(i.id)}
                />
                {Object.entries(columns).map(([key, value]) => {
                  return (
                    <div key={key + i.id} className="">
                      <div>{i[key as any as keyof typeof i]}</div>
                    </div>
                  );
                })}
              </div>
            );
          })}
      </ul>
      <div className="absolut bottom-2 right-0 left-0">
        <ListPagination
          query_key={searchParamKey}
          total_pages={query?.data?.data?.totalPages ?? 1}
        />
      </div>
    </div>
  );
}

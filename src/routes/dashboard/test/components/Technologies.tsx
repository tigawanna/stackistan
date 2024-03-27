import { ListPagination } from "@/components/pagination/ReactresponsivePagination";
import { SearchBox } from "@/components/search/SearchBox";
import { GenericDataTable } from "@/lib/pb/components/table/GenericDataTable";
import { pbTryCatchWrapper } from "@/lib/pb/utils";
import { useSearchParams } from "@/lib/rakkas/hooks/use-search-params";
import {
  useDebouncedSearchWithhParams,
  useSearchWithQuery,
} from "@/utils/hooks/search";
import { useCustomSearchParams } from "@/utils/hooks/useCustomSearchParams";
import { useSuspenseQuery } from "@tanstack/react-query";
import { usePageContext } from "rakkasjs";
import { or, like } from "typed-pocketbase";
interface TechnologiesProps {}

export function Technologies({}: TechnologiesProps) {
  const search_query_key = "tc";
  const { isDebouncing, debouncedValue, setDebouncedValue } =
    useDebouncedSearchWithhParams({
      default_search_query: "",
    });
  const { search_param } = useCustomSearchParams({
    key: search_query_key,
    default_value: "1",
  });
  const page = debouncedValue.length > 0 ? 1 : search_param;
  console.log({ page,debouncedValue });
  const {
    locals: { pb },
  } = usePageContext();
  const query = useSuspenseQuery({
    queryKey: ["technologies", page, debouncedValue],
    queryFn: () =>
      pbTryCatchWrapper(
        pb?.from("stackistan_technologies").getList(+page, 12, {
          sort: "-created",
          filter: like("name", debouncedValue || ""),
        }),
      ),
  });
  const data = query.data?.data?.items ?? [];
  const totalPage = query.data?.data?.totalPages ?? 0;

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
          setDebouncedValue={setDebouncedValue}
        />
      </div>
      <div className="w-full h-[99vh] overflow-auto">
        <GenericDataTable
          key={page + debouncedValue}
          list={data}
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

      <div className="absolute bottom-1 right-0 left-0">
        <ListPagination
          query_key="tc"
          total_pages={query?.data?.data?.totalPages ?? 1}
        />
      </div>
    </div>
  );
}

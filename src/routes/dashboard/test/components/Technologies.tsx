import { GenericDataTable } from "@/lib/pb/components/table/GenericDataTable";
import { pbTryCatchWrapper } from "@/lib/pb/utils";
import { useSuspenseQuery } from "@tanstack/react-query";
import { usePageContext } from "rakkasjs";

interface TechnologiesProps {}

export function Technologies({}: TechnologiesProps) {
  const {
    locals: { pb },
  } = usePageContext();
  const query = useSuspenseQuery({
    queryKey: ["technologies"],
    queryFn: () =>
      pbTryCatchWrapper(
        pb
          ?.from("stackistan_technologies")
          .getList(1, 20, { sort: "-created" }),
      ),
  });
  const data = query.data?.data?.items ?? [];
  const totalPage = query.data?.data?.totalPages ?? 0;
  return (
    <div className="w-full h-full flex flex-col items-center justify-center pb-8">
      <GenericDataTable
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
  );
}

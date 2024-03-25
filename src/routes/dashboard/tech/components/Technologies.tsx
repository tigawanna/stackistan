import { GenericDataTable } from "@/lib/pb/components/table/GenericDataTable";
import { pbTryCatchWrapper } from "@/lib/pb/utils";
import { useSuspenseQuery } from "@tanstack/react-query";
import { usePageContext } from "rakkasjs";

interface TechnoligiesListProps {}

export function TechnoligiesList({}: TechnoligiesListProps) {
  const {
    locals: { pb },
  } = usePageContext();
  //   console.log(" ===== pocket base instance  ==== ", pb);
  const query = useSuspenseQuery({
    queryKey: ["technologies"],
    queryFn: (ctx) => {
      return pbTryCatchWrapper(
        pb?.from("stackistan_technologies").getList(1, 20, {
          sort: "-created",
        }),
      );
    },
  });
  const data = query?.data?.data;
  if (!data?.items) return null;
  return (
    <div className="w-full h-full flex flex-col items-center justify-center mt-6">
      <GenericDataTable
        list={data?.items}
        columns={{
          name: {
            fieldKey: "name",
            fieldLabel: "Name",
            fieldType: "text",
          },
          description: {
            fieldKey: "description",
            fieldLabel: "Description",
            fieldType: "text",
          },
          link: {
            fieldKey: "link",
            fieldLabel: "Link",
            fieldType: "url",
          },
          logo: {
            fieldKey: "logo",
            fieldLabel: "Logo",
            fieldType: "url",
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

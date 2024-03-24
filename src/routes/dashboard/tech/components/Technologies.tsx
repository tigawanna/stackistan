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
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">

      <ul className="w-full flex flex-wrap justify-center items-center gap-10">
        {data?.items?.map((t) => {
          return <li key={t.id}>{t.name}</li>;
        })}
      </ul>
    </div>
  );
}

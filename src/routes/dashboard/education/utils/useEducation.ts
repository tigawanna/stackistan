import { useViewer } from "@/lib/pb/hooks/useViewer";
import { pbTryCatchWrapper } from "@/lib/pb/utils";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useLocation, usePageContext } from "rakkasjs";
import { and, eq,like,or } from "typed-pocketbase";

interface UseEducations {
  page?: number;
  perPage?: number;
}

export function useEducations({ page = 1, perPage = 12 }: UseEducations) {
  const {
    data: { user }} = useViewer();
  const {
    locals: { pb },
  } = usePageContext();
  
  const { current } = useLocation();
  const edp = current.searchParams.get("edp");
  const edq = current.searchParams.get("edq");
  return useSuspenseQuery({
    queryKey: ["educations"],
    queryFn: () =>
      pbTryCatchWrapper(
        pb?.from("stackistan_user_education").getList(page, perPage, {
          // filter: and(
          //   eq("id", user?.record?.id!),
          //   or(
          //     like("school", edp || ""),
          //     like("field_of_study", edq || ""),
          //       // @ts-expect-error
          //     like("qualification", edq || ""),
          //   ),
          // ),
        }),
      ),
  });
}

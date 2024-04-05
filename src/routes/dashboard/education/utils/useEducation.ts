import { usePocketbase } from "@/lib/pb/hooks/use-pb";
import { useViewer } from "@/lib/pb/hooks/useViewer";
import { pbTryCatchWrapper } from "@/lib/pb/utils";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { eq } from "typed-pocketbase";

interface UseEducations {}

export function useEducation({}: UseEducations) {

  const { pb, viewer } = usePocketbase();
  return queryOptions({
    queryKey: ["stackistan_user_education", viewer?.record?.id!],
    queryFn: () =>
      pbTryCatchWrapper(
        pb?.from("stackistan_user_education").getFullList({
          filter: eq("id", viewer?.record?.id!),
          sort: "-to",
        }),
      ),
  });
}

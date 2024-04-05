import { usePocketbase } from "@/lib/pb/hooks/use-pb";
import { pbTryCatchWrapper } from "@/lib/pb/utils";
import { queryOptions } from "@tanstack/react-query";
import { eq } from "typed-pocketbase";

interface UseEducations {}

export function useEducation({}: UseEducations) {
  const { pb, viewer } = usePocketbase();
  return queryOptions({
    queryKey: ["stackistan_user_education", viewer?.id!],
    queryFn: () =>
      pbTryCatchWrapper(
        pb?.from("stackistan_user_education").getFullList({
          filter: eq("user", viewer?.id!),
          sort: "-to",
        }),
      ),
  });
}

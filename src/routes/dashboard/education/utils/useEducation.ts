import { usePocketbase } from "@/lib/pb/hooks/use-pb";
import { pbTryCatchWrapper } from "@/lib/pb/utils";
import { queryOptions } from "@tanstack/react-query";
import { eq } from "typed-pocketbase";

interface UseEducations {}

export function useEducation({}: UseEducations) {
  const { pb, viewer } = usePocketbase();
  const collectionName = "stackistan_user_education"  as const
  const educationQueryOption = queryOptions({
    queryKey: [collectionName, viewer?.id!],
    queryFn: () =>
      pbTryCatchWrapper(
        pb?.from(collectionName).getFullList({
          filter: eq("user", viewer?.id!),
          sort: "+to",
        }),
      ),
  });
  return {
    educationQueryOption,
    collectionName
  };
}

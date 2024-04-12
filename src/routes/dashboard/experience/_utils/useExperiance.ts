import { CollectionName } from "@/lib/pb/client";
import { usePocketbase } from "@/lib/pb/hooks/use-pb";
import { pbTryCatchWrapper } from "@/lib/pb/utils";
import { queryOptions } from "@tanstack/react-query";
import { eq } from "typed-pocketbase";

interface useExperiance {}

export function useExperiance({}: useExperiance) {
  const { pb, viewer } = usePocketbase();
  const collectionName = "stackistan_user_job_experience" as const;
  const educationQueryOption = queryOptions({
    queryKey: [collectionName, viewer?.id!],
    queryFn: () =>
      pbTryCatchWrapper(
        pb?.from(collectionName).getFullList({
          filter: eq("company.name", viewer?.id!),
          sort: "+to",
        }),
      ),
  });
  return {
    educationQueryOption,
    collectionName
  };
}

import { CollectionName } from "@/lib/pb/client";
import { usePocketbase } from "@/lib/pb/hooks/use-pb";
import { pbTryCatchWrapper } from "@/lib/pb/utils";
import { queryOptions } from "@tanstack/react-query";
import { eq } from "typed-pocketbase";

interface UseExperience {}

export function useExperience({}: UseExperience) {
  const { pb, viewer } = usePocketbase();
  const collectionName = "stackistan_user_job_experience" as const;
  const queryOption = queryOptions({
    queryKey: [collectionName, viewer?.id!],
    queryFn: () =>
      pbTryCatchWrapper(
        pb?.from(collectionName).getFullList({
          filter: eq("company.name", viewer?.id!),
          sort: "+to",
          select:{
            id:true,
            from:true,
            to:true,
            position:true,
            expand:{
              job:true,
              company:true
            }

          }
        }),
      ),
  });
  return {
    queryOption,
    collectionName,
  };
}

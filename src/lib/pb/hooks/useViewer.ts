import { useQuery } from "rakkasjs";
import { ShamiriUsersResponse } from "../database";

export function useViewer() {
  const query = useQuery({
    tags: ["viewer"],
    queryKey: "viewer",
    queryFn: async (ctx) => {
      try {
        const user = ctx.locals?.pb?.authStore?.model as ShamiriUsersResponse;
        return { user, error: null };
      } catch (error: any) {
        return { user: null, error: error.message };
      }
    },
  });
  return query;
}

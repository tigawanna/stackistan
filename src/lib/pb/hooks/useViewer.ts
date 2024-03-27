import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { usePageContext } from "rakkasjs";

export function useViewer() {
  const {
    locals: { pb },
  } = usePageContext();
  const query = useSuspenseQuery({
    queryKey: ["viewer"],
    queryFn: async (ctx) => {
      try {
        const new_user = await pb?.from("stackistan_users")?.authRefresh();
        // const user = pb?.authStore
        //   ?.model as StackistanUsersResponse;

        return { user: new_user, error: null };
      } catch (error: any) {
        return { user: null, error: error.message };
      }
    },
  });
  return query;
}

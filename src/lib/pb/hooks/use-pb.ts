import { usePageContext } from "rakkasjs";
import { useViewer } from "./useViewer";

export function usePocketbase() {
  const page_ctx = usePageContext();
  const { data } = useViewer();
  return { ...page_ctx, pb: page_ctx.locals.pb, viewer: data };
}

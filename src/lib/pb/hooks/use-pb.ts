import { usePageContext } from "rakkasjs";

export function usePocketbase() {
  const page_ctx = usePageContext();
  return { ...page_ctx, pb: page_ctx.locals.pb };
}

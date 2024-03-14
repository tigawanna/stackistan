import { LookupHookResult, PageRouteGuardContext } from "rakkasjs";

export function pageGuard(ctx:PageRouteGuardContext): LookupHookResult {
  const user = ctx.locals.pb?.authStore?.model;
  // console.log("user in auth route  ====== ",user)
  if (!user) {
    return true;
  } else {
    return true
    return {
      redirect: ctx.url.origin,
    };
  }
}

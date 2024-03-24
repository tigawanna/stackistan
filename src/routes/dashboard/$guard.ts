import { LookupHookResult, PageRouteGuardContext } from "rakkasjs";

export function pageGuard(ctx:PageRouteGuardContext): LookupHookResult {
  const user = ctx.locals.pb?.authStore?.model;
  // console.log("pb in profile route guard  route  ====== ",ctx.locals.pb.authStore)
  // console.log("user in profile route  ====== ",user)
  if (user) {
    return true;
  } else {
    const auth_url = new URL("/auth",ctx.url.origin);
    auth_url.searchParams.set("return_to",ctx.url.pathname);
    return {
      redirect: auth_url.toString(),
    };
  }
}

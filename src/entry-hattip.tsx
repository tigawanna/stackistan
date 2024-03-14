import { createRequestHandler } from "rakkasjs/server";
import { cookie } from "@hattip/cookie";
import { RequestContext } from "rakkasjs";
import { TypedPocketBase } from "typed-pocketbase";
import { Schema } from "@/lib/pb/database";

function pocketbaseMiddleware(ctx: RequestContext) {
  ctx.locals.pb = new TypedPocketBase<Schema>(import.meta.env.RAKKAS_PB_URL);
  // load the store data from the request cookie string
  ctx.locals.pb.authStore.loadFromCookie(
    ctx.request.headers.get("cookie") || "",
  );
}

export default createRequestHandler({
  middleware: {
    beforePages: [],
    beforeApiRoutes: [],
    beforeNotFound: [],
    beforeAll: [cookie()],
  },

  createPageHooks(requestContext) {
    return {
      emitBeforeSsrChunk() {
        return ``;
      },

      emitToDocumentHead() {
        const cookie_theme = requestContext?.cookie?.theme ?? "dark";
        // console.log("cookieTheme on the server  ====== ", cookie_theme);
        return `
    <link rel="icon" type="image/svg+xml" href="/site.svg" />
    <script>
      (function() {
        document.documentElement.setAttribute("data-theme","${cookie_theme}");
      })();
     </script>
   
  `;
      },

      async extendPageContext(pageContext) {
        const request = pageContext.requestContext?.request;
        if (!request) return;

        if (!pageContext.locals.pb) {
          pageContext.locals.pb = new TypedPocketBase<Schema>(
            import.meta.env.RAKKAS_PB_URL,
          );
          // pageContext.locals.pb = new PocketBase(
          //   import.meta.env.RAKKAS_PB_URL,
          // ) as PocketBaseClient;
          // load the store data from the request cookie string
          pageContext.locals.pb.authStore.loadFromCookie(
            request.headers.get("cookie") || "",
          );
        }
        try {
          if (pageContext.locals.pb.authStore.isValid) {
            const user = pageContext?.locals?.pb;
            pageContext.queryClient.setQueryData(
              "user",
              user?.authStore?.model,
            );
            // console.log("===VALID USER , UPDATING POCKETBASE USER= ===");
          } else {
            // console.log("====INVALID USER , LOGGING OUT POCKETBASE= ===");
            pageContext.locals.pb.authStore.clear();
            pageContext.queryClient.setQueryData("user", null);
          }
        } catch (_) {
          // clear the auth store on failed refresh
          pageContext.locals.pb.authStore.clear();
        }
      },

      wrapApp(app) {
        return app;
      },
    };
  },
});

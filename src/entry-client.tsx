/* eslint-disable no-var */
import { startClient } from "rakkasjs/client";
// import { TypedPocketBase } from "typed-pocketbase";
// import { Schema } from "@/lib/pb/database";
//  const dataTheme = document?.documentElement?.getAttribute("data-theme");
  // document.documentElement.setAttribute("data-theme", `${dataTheme}`);
  //  console.log("dataTheme on the entry.client  ====== ", dataTheme);
  startClient({
  hooks: {
    beforeStart() {
      // Do something before starting the client
    },

    wrapApp(app) {
      return app;
    },

    // extendPageContext(pageContext) {
    //   if (!pageContext.locals.pb) {
    //     pageContext.locals.pb = new TypedPocketBase<Schema>(
    //       import.meta.env.RAKKAS_PB_URL,
    //     );
    //     pageContext.locals.pb?.authStore.onChange(() => {
    //       pageContext.requestContext?.setCookie?.(
    //         "set-cookie",
    //         pageContext.locals.pb?.authStore.exportToCookie(),
    //       );
    //     });
    //   }
    // },
  },
});



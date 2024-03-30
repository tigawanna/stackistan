import { Toolbar } from "@/components/navigation/Toolbar";
import { getSSRFriendlyTheme } from "@/lib/rakkas/theme";
import { ClientSuspense, LayoutProps, PreloadContext } from "rakkasjs";
import { Toaster } from "sonner";
export default function AuthLayout({ children }: LayoutProps) {
  return (
    <div className="w-full h-full min-h-screen flex flex-col r">
      <Toolbar />
      {children}
      <ClientSuspense fallback={<div className="h-8 "></div>}>
        <Toaster richColors />
      </ClientSuspense>
    </div>
  );
}

AuthLayout.preload = (ctx: PreloadContext) => {
  // const theme = ctx.requestContext?.cookie?.theme
  const theme = getSSRFriendlyTheme(ctx.requestContext);
  // console.log(" ==== theme  ===== ",theme)
  return {
    head: {
      title: "Stackistan | Dashboard",
      description: "Tech job market tool",
      htmlAttributes: { "data-theme": theme },
      elements: [
        {
          tagName: "link",
          rel: "icon",
          type: "image/svg+xml",
          href: "/site.svg",
        },
      ],
    },
  };
};

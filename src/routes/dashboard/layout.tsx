import {
  ClientSuspense,
  LayoutProps,
  PreloadContext,
  useLocation,
} from "rakkasjs";
import Nprogress from "@/components/navigation/nprogress/Nprogress";
import ErrorBoundaryComponent from "@/components/wrappers/ErrorBoundaryComponent";
import BreadCrumbs from "@/components/navigation/BreadCrumbs";
import { Toaster } from "@/components/shadcn/ui/sonner";
import { SideDrawer } from "@/routes/dashboard/components/navigation/bars/SideDrawer";
import { Sidebar } from "@/routes/dashboard/components/navigation/bars/sidebar";
import { getSSRFriendlyTheme } from "@/lib/rakkas/theme";

function Layout({ children }: LayoutProps) {
  const location = useLocation();

  return (
    <ErrorBoundaryComponent>
      <div className="w-full h-screen  overflow-y-hidden  flex flex-col items-center justify-center ">
        <ClientSuspense fallback={<div className="h-8 "></div>}>
          <Nprogress
            isAnimating={location && location?.pending ? true : false}
          />
        </ClientSuspense>
        <div className="w-full flex  gap-3">
          <div className="min-w-[5%] w-fit hidden sm:flex h-screen gap-2">
            <Sidebar />
          </div>
          <div className="fixed top-[2%] left-[2%] sm:hidden">
            <ClientSuspense fallback={<div className="h-8 "></div>}>
              <SideDrawer />
            </ClientSuspense>
          </div>
          <div className="w-full  flex flex-col  gap-2 ">
            <div className="w-fit flex rounded-xl">
              <ClientSuspense fallback={<div className="h-5 "></div>}>
                <BreadCrumbs />
              </ClientSuspense>
            </div>
            <div className="w-full  h-[95vh] md:pl-6 px-1 flex flex-col overflow-y-auto gap-2  ">
              <ErrorBoundaryComponent>{children}</ErrorBoundaryComponent>
            </div>
          </div>
        </div>
        <ClientSuspense fallback={<div className="h-8 "></div>}>
          <Toaster richColors />
        </ClientSuspense>
      </div>
    </ErrorBoundaryComponent>
  );
}
Layout.preload = (ctx: PreloadContext) => {
  // const theme = ctx.requestContext?.cookie?.theme
  const theme = getSSRFriendlyTheme(ctx.requestContext);
  // console.log(" ==== theme  ===== ",theme)
  return {
    head: {
      title: "Dashboard",
      description: "Tech job market tool",
      htmlAttributes: { "data-theme": theme },
    },
  };
};
export default Layout;

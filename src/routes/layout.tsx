import { LayoutProps, PreloadContext } from "rakkasjs";
import ErrorBoundaryComponent from "@/components/wrappers/ErrorBoundaryComponent";
import "./index.css";

function Layout({ children }: LayoutProps) {
  return (
    <ErrorBoundaryComponent>
      <div className="flex h-full w-full  flex-col items-center justify-center bg-base-200 ">
        {children}
      </div>
    </ErrorBoundaryComponent>
  );
}
Layout.preload = (ctx: PreloadContext) => {
  return {
    head: { title: "Stackistan", 
    description: "Tech job market tool",
    // htmlAttributes:{ "data-theme":"dark" }
  } 
  };
};

export default Layout;

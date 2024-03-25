import { LayoutProps, PreloadContext } from "rakkasjs";
import ErrorBoundaryComponent from "@/components/wrappers/ErrorBoundaryComponent";
import "./index.css";
import "cherry-markdown/dist/cherry-markdown.css";
import "react-quill/dist/quill.snow.css";

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
    head: {
      title: "Stackistan",
      description: "Tech job market tool",
      elements: [
        {
          tagName: "link",
          rel: "icon",
          type: "image/svg+xml",
          href: "/site.svg",
        },
      ],
      // htmlAttributes:{ "data-theme":"dark" }
    },
  };
};

export default Layout;

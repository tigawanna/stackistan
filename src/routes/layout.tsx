import { Head, LayoutProps } from "rakkasjs";
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

export default Layout;

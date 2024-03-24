import { Toolbar } from "@/components/navigation/Toolbar";
import { ClientSuspense, LayoutProps } from "rakkasjs";
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

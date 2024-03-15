import { ClientSuspense } from "rakkasjs";
import { MiniSettingsModal } from "../mini-settings/MiniSettings";
import { RoutesList } from "./RoutesList";
import { SideDrawer } from "./SideDrawer";

interface SidebarProps {}

export function Sidebar({}: SidebarProps) {
  return (
    <nav
      className="flex sticky top-0 min-h-[99vh]  flex-col  justify-between items-center bg-base-300  
    z-30 gap-1 "
    >
      <div className="w-full h-full flex flex-col justify-between items-center p-2 pb-12 pt-3">
        <ClientSuspense fallback={<div className="h-8 "></div>}>
          <SideDrawer />
        </ClientSuspense>
        <RoutesList icontsOnly />
        <ClientSuspense fallback={<div className="h-8 "></div>}>
          <MiniSettingsModal />
        </ClientSuspense>
      </div>
    </nav>
  );
}

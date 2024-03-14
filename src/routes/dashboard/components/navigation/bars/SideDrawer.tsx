import { Button } from "@/components/shadcn/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/shadcn/ui/drawer";
import { Menu, X } from "lucide-react";
import { MiniSettingsModal } from "../mini-settings/MiniSettings";
import { RoutesList } from "./RoutesList";
import { Icon } from "@radix-ui/react-select";

interface SideDrawerProps {}

export function SideDrawer({}: SideDrawerProps) {
  return (
    <Drawer direction="left">
      <DrawerTrigger>
        <Menu />
      </DrawerTrigger>
      <DrawerContent className="w-fit h-full left-0  bg-base-300 ">
        <div className="w-full h-full flex flex-col justify-between items-center  pb-12 ">
          <DrawerClose>
            <X />
          </DrawerClose>
          <RoutesList icontsOnly={false} />
          <MiniSettingsModal />
        </div>
      </DrawerContent>
    </Drawer>
  );
}

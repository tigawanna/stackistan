import { sonnerToast } from "@/components/shadcn/misc/sonner-taost";
import { Button } from "@/components/shadcn/ui/button";
import { Home } from "lucide-react";
import { PageProps } from "rakkasjs"
import { Suspense } from "react";
import { toast } from "sonner";
import { ProfileContainer } from "./components/profile/ProfileContainer";
export default function DashboardPage({}:PageProps) {
return (
  <div className="w-full h-full  flex flex-col items-center justify-center">
  <Suspense fallback={<div className="h-8 ">loading .....</div>}>
      <ProfileContainer/>
    </Suspense>
  </div>
);}

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
    <h2 className="text-3xl font-bold">Rakkasjs shadcn template</h2>
  
    <Button
      variant="outline"
      onClick={() => {
        sonnerToast({
          title:"Hey"
        })
      }}
    >
      Show Toast
    </Button>
    <Button
      variant="outline"
      onClick={() => {
        toast.error("Event has been created", {
          description: "Sunday, December 03, 2023 at 9:00 AM",
          duration:100000,
          action: {
            label: "Undo",
            onClick: () => console.log("Undo"),
          },

          icon: <Home className="text-success w-8" />,
        });
      }}
    >
      Show Error Toast
    </Button>
    <Suspense fallback={<div className="h-8 ">loading .....</div>}>
      <ProfileContainer/>
    </Suspense>
  </div>
);}

import { Button } from "@/components/shadcn/ui/button";
import { Card, CardHeader, CardContent } from "@/components/shadcn/ui/card";
import { Input } from "@/components/shadcn/ui/input";
import { Label } from "@/components/shadcn/ui/label";
import { Textarea } from "@/components/shadcn/ui/textarea";
import { useViewer } from "@/lib/pb/hooks/useViewer";

import { Image } from "@unpic/react";
import { ProfileComponent } from "./ProfileComponent";

interface ProfileContainerProps {}

export function ProfileContainer({}: ProfileContainerProps) {
  const { data } = useViewer();
  return (
    <div className="w-full h-full  p-5">
      <ProfileComponent/>
    </div>
  );
}

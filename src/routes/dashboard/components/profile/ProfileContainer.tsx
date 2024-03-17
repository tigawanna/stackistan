
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

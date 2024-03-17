import { PageProps } from "rakkasjs"
import { Suspense } from "react";

import { ProfileComponentSuspenseFallback } from "./profile/components/ProfileComponent";
import { LoggedInProfile } from "./profile/components/LoggedInProfile";

export default function DashboardPage({}:PageProps) {
return (
  <div className="w-full h-full  flex flex-col items-center justify-center">
    <Suspense fallback={<ProfileComponentSuspenseFallback />}>
      <LoggedInProfile />
    </Suspense>
  </div>
);}

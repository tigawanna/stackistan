import { PageProps } from "rakkasjs"
import { Suspense } from "react";
import { LoggedInProfile } from "./components/LoggedInProfile";
import { ProfileComponentSuspenseFallback } from "./components/ProfileComponent";
export default function ProfilePage({}:PageProps) {

return (
  <div className="w-full h-full  flex flex-col items-center justify-center">
    <Suspense fallback={<ProfileComponentSuspenseFallback/>}>
      <LoggedInProfile/>
    </Suspense>
  </div>
);}

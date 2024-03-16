import { PageProps } from "rakkasjs"
import { Suspense } from "react";
import { ProfileContainer } from "./components/ProfileContainer";
export default function ProfilePage({}:PageProps) {

return (
  <div className="w-full h-full  flex flex-col items-center justify-center">
    <Suspense fallback={<div className="h-8 ">loading .....</div>}>
      <ProfileContainer />
    </Suspense>
  </div>
);}

import { PageProps } from "rakkasjs";
import { Suspense } from "react";
import { ProfileFromID } from "./components/ProfileFromID";
import { ProfileComponentSuspenseFallback } from "../components/ProfileComponent";
export default function OneProfilePage({ params }: PageProps) {
  return (
    <div className="w-full h-full  flex flex-col items-center justify-center">
      <Suspense fallback={<ProfileComponentSuspenseFallback/>}>
        <ProfileFromID id={params.profile} />
      </Suspense>
    </div>
  );
}

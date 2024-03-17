import { PageProps } from "rakkasjs";
import { ProfileComponentSuspenseFallback } from "../profile/components/ProfileComponent";

export default function TestPage({}: PageProps) {
  return (
    <div className="flex h-full  w-full flex-col items-center justify-center">
      <ProfileComponentSuspenseFallback />
    </div>
  );
}

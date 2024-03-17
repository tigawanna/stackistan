import { PageProps } from "rakkasjs";
import { EditProfileForm } from "./components/EditProfileForm";
export default function EditProfilePage({ params }: PageProps) {
  return (
    <div className="w-full h-full  flex flex-col items-center justify-center">
      <EditProfileForm id={params.profile} />
    </div>
  );
}

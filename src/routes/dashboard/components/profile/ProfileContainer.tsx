import { useViewer } from "@/lib/pb/hooks/useViewer";
import { Image } from "@unpic/react";

interface ProfileContainerProps {}

export function ProfileContainer({}: ProfileContainerProps) {
  const { data } = useViewer();
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <h1 className="text-2xl ">{data?.user?.record.email}</h1>
      <h1 className="text-2xl ">{data?.user?.record.username}</h1>
      <Image
        width={300}
        height={300}
        layout="constrained"
        src={data?.user?.record.avatar_url ?? ""}
        alt="profile image"
      />
    </div>
  );
}

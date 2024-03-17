import { pbTryCatchWrapper } from "@/lib/pb/utils";
import { useQuery } from "@tanstack/react-query";
import { usePageContext } from "rakkasjs";
import { ProfileComponent } from "../../components/ProfileComponent";
import { ErrorOutput } from "@/components/wrappers/ErrorOutput";

interface ProfileFromIDProps {
  id: string;
}

export function ProfileFromID({ id }: ProfileFromIDProps) {
  const {
    locals: { pb },
  } = usePageContext();

  const query = useQuery({
    queryKey: ["profile", id],
    queryFn: () => {
      return pbTryCatchWrapper(pb.from("stackistan_users").getOne(id));
    },
  });

  const profile = query.data?.data;
  if (query.data?.error) {
    return <ErrorOutput error={query.data?.error} />;
  }
  if (query.isError) {
    return <ErrorOutput error={query.error} />;
  }
  if (!profile) return null;

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <ProfileComponent profile={profile} />
    </div>
  );
}

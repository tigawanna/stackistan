import { useViewer } from "@/lib/pb/hooks/useViewer";
import { ProfileComponent } from "./ProfileComponent";
import { ErrorOutput } from "@/components/wrappers/ErrorOutput";

interface LoggedInProfileProps {

}

export function LoggedInProfile({}:LoggedInProfileProps){
  const { data,error,isError } = useViewer();
      console.log("=== data === ", data);
    if (data?.error) {
      return <ErrorOutput error={data?.error} />;
    }
    if (isError) {
      return <ErrorOutput error={{
        name: "Error getting profile",
        message: error?.message ?? "Something went wrong",
      }} />;
    }

  if(!data) return null;
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
        <ProfileComponent profile={data}/>
    </div>
  );
}

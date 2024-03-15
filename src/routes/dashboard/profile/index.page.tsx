import { PageProps } from "rakkasjs"
import { ProfileComponenst } from "./components/ProfileComponent";
import { useUser } from "@/utils/hooks/tanstack-query/useUser";
export default function ProfilePage({}:PageProps) {
      const { user_query: user_query } = useUser();
return (
  <div className="w-full h-full  flex flex-col items-center justify-center">
    <ProfileComponenst id={user_query?.data?.id??""}/>
  </div>
);}

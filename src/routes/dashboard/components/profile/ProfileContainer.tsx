import { useViewer } from "@/lib/pb/hooks/useViewer";

interface ProfileContainerProps {

}

export function ProfileContainer({}:ProfileContainerProps){
const {data} = useViewer()
return (
 <div className='w-full h-full flex flex-col items-center justify-center'>
 <h1 className="text-2xl text-error">{data?.user?.record.email}</h1>
 </div>
);
}

import { Loader } from "lucide-react"
import { PageProps } from "rakkasjs"
import { Suspense } from "react"
import { TechnoligiesList } from "./components/Technologies"
export default function TechPage({}:PageProps) {
return (
<div className="w-full h-full  flex flex-col items-center justify-center">
    <Suspense fallback={<div className="h-screen flex justify-center items-center"><Loader className="h-10 w-10 animate-spin"/></div>}>
    <TechnoligiesList/>
    </Suspense>
</div>
)}

import { PageProps } from "rakkasjs"
import { Suspense } from "react"
import { ResumeList } from "./_components/ResumeList"
export default function Page({}:PageProps) {
return (
<div className="w-full h-full  flex flex-col items-center justify-center">
    resume page
    <Suspense fallback={<div className="h-5 skeleton bg-base-300"></div>}>
        <ResumeList/>
    </Suspense>
</div>
)}

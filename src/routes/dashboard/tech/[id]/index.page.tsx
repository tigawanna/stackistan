import { PageProps } from "rakkasjs"
import { Suspense } from "react"
import { OneTechnologyComponent, OneTechnologyComponentSuspensefallback } from "./components/OneTechnologyComponent"
export default function OneTechnlogyPage({params}:PageProps) {
return (
<div className="w-full h-full  flex flex-col items-center justify-center">
    <Suspense fallback={<OneTechnologyComponentSuspensefallback />}>
        <OneTechnologyComponent id={params.id} />
    </Suspense>
</div>
)}

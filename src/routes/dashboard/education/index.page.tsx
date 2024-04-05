import { PageProps } from "rakkasjs"
import { EducationList } from "./components/EducationList"
import { Suspense } from "react"
export default function EducationPage({ }: PageProps) {
    return (
        <div className="w-full h-full  flex flex-col items-center justify-center">

            <Suspense fallback={<div className="h-[70vh] skeleton bg-base-100"></div>}>
                <EducationList />
            </Suspense>
        </div>
    )
}

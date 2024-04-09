import { PageProps } from "rakkasjs";
import { EducationList, EducationListFallBack } from "./components/EducationList";
import { Suspense } from "react";
export default function EducationPage({}: PageProps) {
  return (
    <div className="w-full h-full  flex flex-col items-center justify-center">
      <Suspense fallback={<EducationListFallBack />}>
        <EducationList />
      </Suspense>
    </div>
  );
}

import { ClientSuspense, PageProps } from "rakkasjs";
import { Suspense } from "react";
import {
  DashBoardMainSection,
  DashBoardMainSectionSuspenseFallback,
} from "./components/dashboard/DashBoardMainSection";

export default function DashboardPage({}: PageProps) {
  return (
    <div className="w-full h-full  flex flex-col items-center justify-center">
      <Suspense fallback={<DashBoardMainSectionSuspenseFallback />}>
      <DashBoardMainSection />
    </Suspense>

    </div>
  );
}

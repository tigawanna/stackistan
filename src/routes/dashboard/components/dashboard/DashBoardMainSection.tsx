import { useViewer } from "@/lib/pb/hooks/useViewer";
import { Link } from "rakkasjs";

interface DashBoardMainSectionProps {}

export function DashBoardMainSection({}: DashBoardMainSectionProps) {
  const query = useViewer();
  const viewer = query.data;

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3">
      <h1 className="text-3xl">Welcome {viewer?.name}</h1>
      <div className="p-2">
        <Link
          href="/dashboard/profile/details"
          className="text-lg hover:text-secondary"
        >
          Profile details
        </Link>
      </div>
    </div>
  );
}
export function DashBoardMainSectionSuspenseFallback() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <h1 className="text-3xl h-[70vh] min-w-[300px] bg-base-200 skeleton"></h1>
    </div>
  );
}

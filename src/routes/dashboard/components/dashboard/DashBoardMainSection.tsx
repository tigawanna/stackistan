import { useViewer } from "@/lib/pb/hooks/useViewer";

interface DashBoardMainSectionProps {}

export function DashBoardMainSection({}: DashBoardMainSectionProps) {
  const { data: { user } } = useViewer();
  const viewer = user?.record;
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <h1 className="text-3xl">Welcome {viewer?.name}</h1>
    </div>
  );
}
export function DashBoardMainSectionSuspenseFallback() {

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <h1 className="text-3xl h-4 min-w-[300px] bg-base-200 skeleton"></h1>

    </div>
  );
}

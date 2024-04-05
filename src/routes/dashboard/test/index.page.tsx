import { usePocketbase } from "@/lib/pb/hooks/use-pb";
import { getViewer, useViewer } from "@/lib/pb/hooks/useViewer";
import { PageProps, useQuery } from "rakkasjs";

export default function TestPage({}: PageProps) {
  return <div className="flex h-full   w-full flex-col  ">test</div>;
}

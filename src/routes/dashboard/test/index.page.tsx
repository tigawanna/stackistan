import { PageProps } from "rakkasjs";
import { EducationListFallBack } from "../education/components/EducationList";

export default function TestPage({}: PageProps) {
  return (
    <div className="flex h-full   w-full flex-col  ">
      <EducationListFallBack />
    </div>
  );
}

import { Loader } from "lucide-react";
import { useEducation } from "../utils/useEducation";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useViewer } from "@/lib/pb/hooks/useViewer";

interface EducationListProps {}

export function EducationList({}: EducationListProps) {
  const educationQueryOption = useEducation({});
  const query = useSuspenseQuery(educationQueryOption);
  const data = query.data.data;

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <h2 className="text-3xl">Education List</h2>
      <ul className="w-full h-full flex flex-wrap items-center justify-center">
        {data &&
          data?.map((item) => {
            return (
              <li key={item.id} className="p-2 bg-base-100 rounded-md w-[90%] md:w-[45%] lg:w-[30%]">
                <h1 className="text-3xl">{item.school}</h1>
              </li>
            );
          })}
      </ul>
    </div>
  );
}

export function EducationListFallBack({}: EducationListProps) {
  return (
    <div className="w-full h-full minh-[90vh] flex flex-col items-center justify-center">
      <Loader className="w-10 h-10 animate-spin" />
    </div>
  );
}

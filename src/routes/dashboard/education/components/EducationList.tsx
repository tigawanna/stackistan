import { GraduationCap, Loader, Edit } from "lucide-react";
import { useEducation } from "../utils/useEducation";
import { useSuspenseQuery } from "@tanstack/react-query";
import { PBTimeStamp } from "@/lib/pb/components/PBTimestamp";

interface EducationListProps {}

export function EducationList({}: EducationListProps) {
  const educationQueryOption = useEducation({});
  const query = useSuspenseQuery(educationQueryOption);
  const data = query.data.data;

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <h2 className="text-3xl">Education List</h2>
      <ul className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical overflow-y-auto">
        {data &&
          data?.map((item) => {
            return (
              <li key={item.id}>
                <div className="timeline-middle">
                  <GraduationCap />
                </div>
                <div className="timeline-start md:text-end mb-10 group">
                  <span className="font-mono italic text-2xl">
                    {item.school}{" "}
                  </span>
                  <Edit className="size-5 hidden group-hover:block absolute top-[3%]" />
                  <div className="text-lg font-black">{item.qualification}</div>
                  {item.field_of_study}
                  <div className="flex justify-between items-center gap-2 text-sm ">
                    <PBTimeStamp timestamp={item.from} />
                    <span>to</span>
                    <PBTimeStamp timestamp={item.to} />
                  </div>
                </div>
                <hr />
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

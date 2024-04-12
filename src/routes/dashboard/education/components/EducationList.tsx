import { GraduationCap, Loader, Edit } from "lucide-react";
import { useEducation } from "../utils/useEducation";
import { useSuspenseQuery } from "@tanstack/react-query";
import { PBTimeStamp } from "@/lib/pb/components/PBTimestamp";
import { AddEducationModal } from "./form/CreateEducationForm";
import { UpdateEducationModal } from "./form/UpdateEducationForm";
import { useId } from "react";
import { DeletePBRecordModal } from "@/lib/pb/components/record/DeletePBRecordModal";

interface EducationListProps {}

export function EducationList({}: EducationListProps) {
  const {educationQueryOption,collectionName} = useEducation({});
  const query = useSuspenseQuery(educationQueryOption);
  const data = query.data.data;

  return (
    <div className="w-full h-full flex flex-col items-center justify-between gap-2">
      <h2 className="text-3xl font-bold">Education </h2>

      <div className="w-full h-full flex flex-col items-center gap-2 pt-5">
        <ul className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical overflow-y-auto">
          {data &&
            data?.map((item, idx) => {
              if (idx % 2 === 0) {
                return (
                  <li key={item.id}>
                    <div className="timeline-middle">
                      <GraduationCap />
                    </div>
                    <div className="timeline-start md:text-end mb-10 group">
                      <span className="font-mono italic text-lg">
                        {item.school}{" "}
                      </span>

                      <div className="size-5 hidden group-hover:block absolute top-[3%]">
                        <UpdateEducationModal id={item.id} item={item} />
                        <DeletePBRecordModal id={item.id} label="Education" collectionName={collectionName} />
                      </div>
                      <div className="text-md font-black">
                        {item.qualification}
                      </div>
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
              }
              return (
                <li key={item.id}>
                  <div className="timeline-middle">
                    <GraduationCap />
                  </div>
                  <div className="timeline-end md:text-start mb-10 group">
                    <span className="font-mono italic text-lg">
                      {item.school}{" "}
                    </span>

                    <div className="size-5 hidden group-hover:block absolute top-[3%]">
                      <UpdateEducationModal id={item.id} item={item} />
                    </div>
                    <div className="text-md font-black">
                      {item.qualification}
                    </div>
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

          <li>
            <div className="timeline-middle">
              <GraduationCap />
            </div>
            <div className="timeline-start md:text-end mb-10 group">
              <AddEducationModal />
            </div>
            <hr />
          </li>
        </ul>
      </div>
    </div>
  );
}

export function EducationListFallBack({}: EducationListProps) {
  const listId = useId();
  return (
    <div className="w-full h-full min-h-[40vh] flex flex-col items-center justify-center">
      <ul className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical overflow-y-auto">
        {Array.from({ length: 3 }).map((_, i) => {
          if (i % 2 === 0) {
            return (
              <li key={i}>
                <div className="timeline-middle">
                  <GraduationCap />
                </div>
                <div className="timeline-end md:text-end mb-10 group gap-2">
                  <div className="h-4 w-52 rounded-lg bg-base-300 skeleton my-1"></div>
                  <div className="h-7 rounded-lg bg-base-300 skeleton my-1 "></div>
                  <div className="h-7 rounded-lg bg-base-300 skeleton my-1"></div>

                  <div className=" w-full flex justify-between items-center gap-2 text-sm ">
                    <div className="w-full h-4 rounded-lg bg-base-300 skeleton my-1"></div>

                    <div className="w-full h-4 rounded-lg bg-base-300 skeleton my-1"></div>
                  </div>
                </div>

                <hr />
              </li>
            );
          }
          return (
            <li key={i}>
              <div className="timeline-middle">
                <GraduationCap />
              </div>
              <div className="timeline-start md:text-end mb-10 group gap-2">
                <div className="h-4 w-52 rounded-lg bg-base-300 skeleton my-1"></div>
                <div className="h-7 rounded-lg bg-base-300 skeleton my-1 "></div>
                <div className="h-7 rounded-lg bg-base-300 skeleton my-1"></div>

                <div className=" w-full flex justify-between items-center gap-2 text-sm ">
                  <div className="w-full h-4 rounded-lg bg-base-300 skeleton my-1"></div>

                  <div className="w-full h-4 rounded-lg bg-base-300 skeleton my-1"></div>
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

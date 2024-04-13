import { useSuspenseQuery } from "@tanstack/react-query";
import { useExperience } from "./useExperience";
import { BriefcaseBusiness } from "lucide-react";
import { PBTimeStamp } from "@/lib/pb/components/PBTimestamp";
import { DeletePBRecordModal } from "@/lib/pb/components/record/DeletePBRecordModal";
import { UpdateEducationModal } from "../../education/components/form/UpdateEducationForm";

interface ExperienceListProps {}

export function ExperienceList({}: ExperienceListProps) {
  const { queryOption, collectionName } = useExperience({});
  const query = useSuspenseQuery(queryOption);
  const data = query.data.data;
  return (
    <div className="w-full h-full flex flex-col items-center justify-between gap-2">
      <h2 className="text-3xl font-bold">Experience </h2>

      <div className="w-full h-full flex flex-col items-center gap-2 pt-5">
        <ul className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical overflow-y-auto">
          {data &&
            data?.map((item, idx) => {
              if (idx % 2 === 0) {
                return (
                  <li key={item.id}>
                    <div className="timeline-middle">
                  <BriefcaseBusiness />
                    </div>
                    <div className="timeline-start md:text-end mb-10 group">
                      <span className="font-mono italic text-lg">
                        {item}{" "}
                      </span>

                      <div className="size-5 hidden group-hover:block absolute top-[3%]">
                        {/* <UpdateEducationModal id={item.id} item={item} />
                        <DeletePBRecordModal
                          id={item.id}
                          label="Education"
                          collectionName={collectionName}
                        /> */}
                      </div>
                      <div className="text-md font-black">
                        {item?.expand?.company?.name}
                      </div>
                      <div className="text-md font-black">
                        {item?.expand?.job?.title}
                      </div>
                 
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
                <BriefcaseBusiness />
                  </div>
                  <div className="timeline-end md:text-start mb-10 group">
                    <span className="font-mono italic text-lg">
                      {item.company}{" "}
                    </span>

                    <div className="size-5 hidden group-hover:block absolute top-[3%] right-[3%]">
                      {/* <DeletePBRecordModal
                        id={item.id}
                        label="Education"
                        collectionName={collectionName}
                      />
                      <UpdateEducationModal id={item.id} item={item} /> */}
                    </div>
                    <div className="text-md font-black">
                      {item.company.name}
                    </div>
                    <div className="text-md font-black">
                      {item.company.position}
                    </div>
        
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
          <BriefcaseBusiness />
            </div>
            <div className="timeline-start md:text-end mb-10 group">
              {/* <AddEducationModal /> */}
            </div>
            <hr />
          </li>
        </ul>
      </div>
    </div>
  );
}

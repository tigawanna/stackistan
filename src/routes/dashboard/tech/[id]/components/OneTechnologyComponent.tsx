import { CollectionName, getFileURL } from "@/lib/pb/client";
import { usePocketbase } from "@/lib/pb/hooks/use-pb";
import { pbTryCatchWrapper } from "@/lib/pb/utils";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Image } from "@unpic/react";

interface OneTechnologyComponentProps {
  id: string;
}

export function OneTechnologyComponent({ id }: OneTechnologyComponentProps) {
  const collectionName: CollectionName = "stackistan_technologies";

  const { pb } = usePocketbase();
  const query = useSuspenseQuery({
    queryKey: [collectionName, id],
    queryFn: () => {
      return pbTryCatchWrapper(pb?.from(collectionName).getOne(id, {}));
    },
  });

  const data = query?.data?.data;

  if (!data) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center">
        <div className="w-full h-full flex md:flex-row flex-col items-center justify-center">
          <div className="w-full h-full flex flex-col items-center justify-center">
            <Image
              layout="fullWidth"
              alt="tech logo"
              src="page-not-found.svg"
            />
          </div>
          <div className="w-full h-full flex flex-col items-center justify-center">
            Woops , that page does not exist
          </div>
        </div>
      </div>
    );
  }
  const logo_url = getFileURL({
    collection_id_or_name: "stackistan_technologies",
    file_name: data.logo,
    record_id: data.id,
    fallback: "/default/tech-logo.png",
  });
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="w-full h-[200px] flex flex-col items-center justify-center">
        <h2 className="text-4xl bg-base-200 ">{data.name}</h2>
        <Image
          src={logo_url}
          alt="tech logo"
          layout="constrained"
          height={250}
          width={250}
        />
      </div>
      <div className="w-full h-full flex flex-col items-center justify-center"></div>
    </div>
  );
}

export function OneTechnologyComponentSuspensefallback() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="w-full h-[200px] flex flex-col items-center justify-center bg-base-300 skeleton"></div>
      <div className="w-full h-[50px] flex flex-col items-center justify-center bg-base-300 skeleton"></div>
      <div className="w-full h-[250px] flex flex-col items-center justify-center bg-base-300 skeleton"></div>
    </div>
  );
}

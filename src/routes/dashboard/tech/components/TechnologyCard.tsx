import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/shadcn/ui/card";
import { getFileURL } from "@/lib/pb/client";
import { Image } from "@unpic/react";
import { StackistanTechnologiesResponse } from "Database";

interface TechnologyCardProps {
  tech: StackistanTechnologiesResponse;
}

export function TechnologyCard({ tech }: TechnologyCardProps) {
  const logo_url = getFileURL({
    collection_id_or_name: "stackistan_technologies",
    file_name: tech.logo,
    record_id: tech.id,
    fallback: "/default/tech-logo.png",
  });
  return (
    <div className=" w-full h-full flex flex-col items-center justify-center bg-base-300 rounded-xl p-2">
      <div className="w-full flex gap-5">
        <Image
          className="object-fit  aspect-square"
          layout="constrained"
          height={50}
          width={50}
          src={logo_url}
          alt={tech.name}
        />
        <h1 className="text-2xl font-bold">{tech.name}</h1>
      </div>
      <p className="text-center line-clamp-2">{tech.description}</p>
    </div>
  );
}

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/shadcn/ui/card";
import { Checkbox } from "@/components/shadcn/ui/checkbox";
import { getFileURL } from "@/lib/pb/client";
import { Image } from "@unpic/react";
import { StackistanTechnologiesResponse } from "Database";

interface TechnologyCardProps {
  tech: StackistanTechnologiesResponse;
  checked: boolean;
  selectItem: (id: string) => void;
}

export function TechnologyCard({
  tech,
  checked,
  selectItem,
}: TechnologyCardProps) {
  const logo_url = getFileURL({
    collection_id_or_name: "stackistan_technologies",
    file_name: tech.logo,
    record_id: tech.id,
    fallback: "/default/tech-logo.png",
  });
  return (
    <li
      key={tech.id}
      className={
        checked
          ? "brightness-75 relative w-[95%] md:w-[40%] lg:w-[30%] flex flex-col bg-base-300/70 p-2 gap-2"
          : "relative w-[95%] md:w-[40%] lg:w-[30%] flex flex-col bg-base-300/70 p-2 gap-2"
      }
    >
      <Checkbox
        className="absolute top-2 right-2 z-40"
        checked={checked}
        onCheckedChange={() => selectItem(tech.id)}
      />
      <div className="w-full flex gap-4">
        <Image
          className="object-fit  aspect-square"
          layout="constrained"
          height={50}
          width={50}
          src={logo_url}
          alt={tech.name}
        />
        <h1 className="text-2xl f">{tech.name}</h1>
      </div>
      <p className="text-center line-clamp-2">{tech.description}</p>
    </li>
  );
}

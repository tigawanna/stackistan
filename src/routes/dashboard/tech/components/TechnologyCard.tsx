import { Checkbox } from "@/components/shadcn/ui/checkbox";
import { getFileURL } from "@/lib/pb/client";
import { StackistanTechnologiesResponse } from "@/lib/pb/database";
import { Image } from "@unpic/react";
import { UpdateTechFormModal } from "./form/UpdateTechForm";
import { Link } from "rakkasjs";
import { ExternalLink } from "lucide-react";

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
      // prefetch="never"
      //   href={`/dashboard/tech/${tech.id}`}
      className={
        checked
          ? "brightness-75 relative w-[95%] md:w-[40%] lg:w-[30%] flex flex-col bg-base-300/70 p-2 gap-2 rounded-lg group"
          : "relative w-[95%] md:w-[40%] lg:w-[30%] flex flex-col bg-base-300/70 p-2 gap-2 rounded-lg group"
      }
    >
      <Checkbox
        className="absolute top-2 right-2 z-40 "
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
      <div className=" flex gap-1 items-start hover:text-sky-200">
        <Link
          href={tech.link}
          target="_blank"
          className="text-xl cursor-pointer  peer"
        >
          {tech.name}
        </Link>
        <ExternalLink className="hidden peer-hover:block size-3" />
      </div>
      </div>

      <div className="hidden absolute top-2 right-[10%] z-40 group-hover:block">
        <UpdateTechFormModal id={tech.id} item={tech} />
      </div>
      <p className="text-center line-clamp-2">{tech.description}</p>
    </li>
  );
}

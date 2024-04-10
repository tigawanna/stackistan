import { Checkbox } from "@/components/shadcn/ui/checkbox";
import { StackistanUserProjectsResponse } from "@/lib/pb/database";
import { ExternalLink } from "lucide-react";
import { Link } from "rakkasjs";
import { Image } from "@unpic/react";
import { UpdateUserProjectFormModal } from "./form/UpdateUserProject";

interface ProjectCardProps {
  item: StackistanUserProjectsResponse;
  checked: boolean;
  selectItem: (id: string) => void;
}

export function ProjectCard({ item, checked, selectItem }: ProjectCardProps) {
  return (
    <li
      key={item.id}
      // prefetch="never"
      //   href={`/dashboard/tech/${tech.id}`}
      className={
        checked
          ? "brightness-75 relative  hover:text-primary h-56 w-[95%] md:w-[40%] lg:w-[30%] flex flex-col justify-between bg-base-300 p-2 gap-2 rounded-lg group"
          : "relative h-56 w-[95%]  hover:text-primary md:w-[40%] lg:w-[30%] flex flex-col justify-between bg-base-300 p-2 gap-2 rounded-lg group"
      }
    >
      <Checkbox
        className="absolute top-2 right-2 z-40 "
        checked={checked}
        onCheckedChange={() => selectItem(item.id)}
      />
      <div className="w-full flex flex-col gap-1">
        <div className="inline-block">
          <Image
            className="object-cover "
            layout="fullWidth"
            height={130}
            src={item.image_url}
            alt={item.name}
          />
        </div>
        <div className=" flex gap-1 items-start hover:text-sky-200">
          <Link
            href={item.link}
            target="_blank"
            className="text-xl cursor-pointer  peer"
          >
            {item.name}
          </Link>
          <ExternalLink className="hidden peer-hover:block size-3" />
        </div>

        <div className="hidden absolute top-2 right-[10%] z-40 group-hover:block">
          {/* <UpdateTechFormModal id={item.id} item={item} /> */}
          <UpdateUserProjectFormModal id={item.id} item={item} />
        </div>
        <p className="text-sm line-clamp-2">{item.description}</p>
      </div>
    </li>
  );
}

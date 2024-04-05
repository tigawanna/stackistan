import { Link } from "rakkasjs";
import { FlaskConical, GraduationCap, Home, Layers, Lock, TestTube2, User } from "lucide-react";
import { TooltipWrapper } from "@/components/wrappers/TooltipWrapper";
interface RoutesListProps {
  icontsOnly?: boolean;
}

export function RoutesList({ icontsOnly = true }: RoutesListProps) {
  const routes = [
    { name: "dashboard", url: "/dashboard", icon: <Home /> },
    { name: "profile", url: "/dashboard/profile", icon: <User /> },
    { name: "resume", url: "/dashboard/resume", icon: <Lock /> },
    { name: "tech", url: "/dashboard/tech", icon: <Layers /> },
    { name: "education", url: "/dashboard/education", icon: <GraduationCap /> },
    { name: "test", url: "/dashboard/test", icon: <FlaskConical /> },
  ];

  return (
    <div className="h-[80%] flex flex-col justify-between items-center gap-2 z-50">
      <div>
        <TooltipWrapper label="Home">
          <Link  href="/" className="">
            <img src="/site.svg" alt="logo" className="size-10" />
          </Link>
        </TooltipWrapper>
      </div>
      <ul className="flex flex-col gap-3 items-center ">
        {routes.map((route) => {
          return (
            <TooltipWrapper label={route.name} key={route.name}>
              <Link
                href={route.url}
                className="text-3xl  items-center flex gap-3 
                hover:bg-base-300 
              rounded-lg p-2 lg:p-4  "
              >
                {route.icon}
                {icontsOnly ? (
                  <div className="hidden  ">{route.name}</div>
                ) : (
                  <div className="flex text-lg ">{route.name}</div>
                )}
              </Link>
            </TooltipWrapper>
          );
        })}
      </ul>
    </div>
  );
}

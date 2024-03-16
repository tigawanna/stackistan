import { Link } from "rakkasjs";
import { Home, Lock, TestTube2, User } from "lucide-react";
interface RoutesListProps {
  icontsOnly?: boolean;
}

export function RoutesList({icontsOnly=true}: RoutesListProps) {
  const routes = [
    { name: "dashboard", url: "/dashboard", icon: <Home /> },
    { name: "profile", url: "/dashboard/profile", icon: <User /> },
    { name: "resume", url: "/dashboard/resume", icon: <Lock /> },
    { name: "test", url: "/dashboard/test", icon: <TestTube2 /> },
  ];

  return (
    <div className="flex flex-col gap-3 items-center divide-y-2">
      {routes.map((route) => {
        return (
          <Link
            key={route.name}
            href={route.url}
            data-tip={route.name}
            className="text-3xl  items-center flex gap-3 
                hover:bg-base-300 
              rounded-lg p-2 lg:p-4 tooltip hover:tooltip-right hover:duration-1000"
          >
            
            {route.icon}
            {icontsOnly ? (
              <div className="hidden  text-lg font-bold">
                {route.name}
              </div>
            ) : (
              <div className="flex text-lg font-bold">
                {route.name}
              </div>
            )}
          </Link>
        );
      })}
    </div>
  );
}

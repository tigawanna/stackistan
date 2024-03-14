import { Link } from "rakkasjs";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { Menu } from "lucide-react";

interface ToolbarProps {}

export function Toolbar({}: ToolbarProps) {
  const routes = [
    { name: "Home", path: "/" },
    { name: "Sign in", path: "/auth" },
    { name: "dashboard", path: "/dashboard" },
  ];
  return (
    <div className="glass sticky top-0 flex  w-full items-center justify-between bg-inherit">
      <Link href="/" className="p-2 text-3xl hover:text-secondary"> Applicate</Link>
      <div className="hidden items-center justify-end gap-2 px-2 md:flex">
        <ul className="flex flex-wrap items-center gap-2 divide-x-2">
          {routes.map((route) => (
            <li key={route.path} className="p-2 hover:text-secondary">
              <Link href={route.path}>{route.name}</Link>
            </li>
          ))}
        </ul>
        <ThemeSwitcher />
      </div>
      {/* sidebar */}

      <div className="relative flex w-full justify-end p-2 md:hidden">
        <input type="checkbox" className="peer hidden " id="sidebar-toggle" />
        <label htmlFor="sidebar-toggle" className="z-40 p-2 md:hidden">
          <Menu />
        </label>
        <div
          className="glass absolute right-0 top-10 hidden w-fit min-w-[250px] flex-col 
         items-center justify-center gap-2 rounded-lg bg-base-100/50 p-2 duration-500 animate-in 
        slide-in-from-top peer-checked:flex"
        >
          <ul className="flex flex-col items-center gap-2 divide-y-2">
            {routes.map((route) => (
              <li key={route.path} className="p-2 hover:text-secondary">
                <Link href={route.path}>{route.name}</Link>
              </li>
            ))}
          </ul>
          <ThemeSwitcher />
        </div>
      </div>
    </div>
  );
}

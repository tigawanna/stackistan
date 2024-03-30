import { PageProps } from "rakkasjs";
import { Technologies } from "./components/Technologies";
import { TechnologyCardList } from "./components/TechnologyList";
export default function TechPage({}: PageProps) {
  return (
    <div className="w-full h-full  flex flex-col items-center justify-center">
      {/* <Technologies /> */}
      <TechnologyCardList />
    </div>
  );
}

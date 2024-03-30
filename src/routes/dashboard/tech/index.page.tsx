import { PageProps } from "rakkasjs";
import { Technologies } from "./components/Technologies";
export default function TechPage({}: PageProps) {
  return (
    <div className="w-full h-full  flex flex-col items-center justify-center">
      <h1 className="text-3xl">Technologies</h1>
      <Technologies />
    </div>
  );
}

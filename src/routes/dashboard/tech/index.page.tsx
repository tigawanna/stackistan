import { PageProps } from "rakkasjs";
import { Technologies } from "./components/Technologies";

export default function TechPage({}: PageProps) {
  return (
    <div className="w-full h-full  flex flex-col items-center justify-center">
      {/* <Technologies /> */}
      <Technologies />
    </div>
  );
}

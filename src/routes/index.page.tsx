import { HeroSection } from "@/components/landing/HeroSection";
import { PageProps } from "rakkasjs";

export default function HomePage({}: PageProps) {
  
  return (
    <main className="flex h-fit w-full flex-col  items-center ">
      <HeroSection />
    </main>
  );
}

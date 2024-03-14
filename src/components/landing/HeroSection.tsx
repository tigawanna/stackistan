import { Link } from "rakkasjs";
import { Icons } from "../icons/Iconts";
import { Toolbar } from "../navigation/Toolbar";

interface HeroSectionProps {}

export function HeroSection({}: HeroSectionProps) {
  return (
    <div
      className="w-full min-h-screen  flex flex-col items-center  bg-gradient-to-bl from-accent/50 to-base-100
    ">
      <Toolbar />
      <div className="max-w-[85rem] mx-auto pt-3 px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
        {/* <!-- Grid --> */}
        <div className="grid md:grid-cols-2 gap-4 md:gap-8 xl:gap-20 md:items-center">
          <div className="flex flex-col gap-2 p-3 ">
            <h1 className="block font-bold  py-5  text-6xl lg:leading-tight ">
              Start your journey with 
              {" "}
              <span className="text-primary"> Stackistan</span>
            </h1>
            <p className="mx-auto brightness-75 max-w-[600px] text-xl ">
             A collection of tools to help you navigate the tech job market
             Everything from crafting your resume to automating your application
             to building a greater picture of the tech scene
            </p>

            {/* <!-- Buttons --> */}
            <div className="mt-7 gap-3 w-full flex items-center justify-center md:justify-start">
              <Link className="btn btn-primary text-primary-content btn-wide " href="/dashboard">
                Get started
              </Link>
            </div>
            {/* <!-- End Buttons --> */}
          </div>
          {/* <!-- End Col --> */}

          <div className="relative ms-4">
            {/* <img
              className="w-full rounded-md"
              src="/svg/typewriter.svg"
              alt="Type writter"
            /> */}
            <Icons.typewriter className="w-full h-full fill-primary" />
          </div>
        </div>
      </div>
    </div>
  );
}

import { Badge } from "@/components/shadcn/ui/badge";
import { OptionalTextFields } from "@/components/wrappers/OptionalTextFields";
import { TimeCompponent } from "@/components/wrappers/TimeCompponent";
import { StackistanUsersResponse } from "@/lib/pb/database";
import {
  ChevronLeft,
  ExternalLink,
  Link2,
  MailIcon,
  MapPin,
  PhoneIcon,
} from "lucide-react";
import { Link } from "rakkasjs";
import { FaGithub, FaLinkedin } from "react-icons/fa";

interface ProfileComponentProps {
  profile: StackistanUsersResponse;
}

export function ProfileComponent({ profile }: ProfileComponentProps) {
  if (!profile) return null;
  const {
    id,
    name,
    phone,
    website,
    skills,
    avatar_url,
    verified,
    bio,
    city,
    country,
    created,
    email,
    github_username,
    username,
    cover_image_url,
    linkedin_username,
  } = profile;
  return (
    <div className="w-full h-full flex flex-col items-center  relative gap-2">
      {/* back button */}
      <Link
        className="absolute top-4 left-4 z-30 bg-base-100 bg-opacity-40 hover:bg-secondary  glass rounded-full p-2"
        href={"/dashboard"}
      >
        <ChevronLeft className="h-6 w-7" />
      </Link>
      {/* start of cover image  */}
      <img
        src={cover_image_url}
        height={200}
        width={600}
        alt={"cover image"}
        className="w-full h-[200px] object-cover  z-20 top-0 left-0 right-0 bottom-[80%]"
      />
      {/*  end of cover image */}
      {/*start  profile image */}
      <div className="rounded-full absolute top-[11%] sm:top-[12%] md:top-[15%] p-3 glass z-40">
        <img
          src={avatar_url}
          height={150}
          width={150}
          alt={"cover image"}
          className="rounded-full"
        />
      </div>
      {/* end of profile image */}
      {/* start of profile  details */}
      <div className="w-full glass flex flex-col items-center justify-center z-30 pt-[11%] sm:pt-[7%] lg:pt-[5%] pb-2 ">
        {/*  image and basic detalis */}
        <div className="w-full flex items-center justify-between flex-col  gap-2 ">
          <div className="flex flex-wrap items-center justify-center p-3  ">
            <div className="flex flex-wrap items-center justify-center gap-3 ">
              {/* name and edit profile section */}
              <div className="flex flex-wrap items-center justify-center gap-3 w-full">
                {/* name */}
                <span className="text-2xl font-bold  px-2 line-clamp-1">
                  {name}
                </span>
                <Link
                  href={`/dashboard/profile/edit`}
                  className="rounded-xl border border-secondary px-2"
                >
                  Edit profile
                </Link>
              </div>
              {/* bio */}
              <div className="w-full flex items-center justify-between flex-col  text-sm brightness-75 text-center text-balance">
                <div className="w-full sm:w-[90%] lg:w-[70%] flex items-center justify-between flex-col  text-sm  ">
                  {bio}
                </div>
              </div>
              {/* username */}
              <span className=" brightness-90">@{username}</span>
              {/* email */}
              <span className="flex flex-wrap gap-1 items-center justify-center">
                <MailIcon className="h-4 w-4" />
                {email}
              </span>
              {/* joined */}
              <span className="brightness-90 flex justify-center items-center text-sm">
                Joined <TimeCompponent time={created} />
              </span>
              {/* phone */}
              <OptionalTextFields value={phone}>
                <span className=" brightness-90 flex flex-wrap gap-1 items-center justify-center">
                  <PhoneIcon className="w-4 h-4" /> {phone}
                </span>
              </OptionalTextFields>
              {/* city country */}
              <OptionalTextFields value={city || country}>
                <span className=" brightness-90 flex flex-wrap gap-1 items-center justify-center">
                  <MapPin className="w-4 h-4" />
                  {city} {country}
                </span>
              </OptionalTextFields>
              {/* website */}
              <OptionalTextFields value={website}>
                <Link
                  href={`https://github.com/${website}`}
                  target="_blank"
                  className=" group brightness-90 flex flex-wrap gap-1 hover:text-blue-300 items-center justify-center"
                >
                  <Link2 />
                    website
                  <ExternalLink className="w-4 h-4 hidden group-hover:flex  absolute -right-5" />
                </Link>
              </OptionalTextFields>
              {/* github */}
              <OptionalTextFields value={github_username}>
                <Link
                  href={`https://github.com/${github_username}`}
                  target="_blank"
                  className=" group brightness-90 flex flex-wrap gap-1 hover:text-blue-300 items-center justify-center"
                >
                  <FaGithub />
                  {github_username}
                  <ExternalLink className="w-4 h-4 hidden group-hover:flex  absolute -right-5" />
                </Link>
              </OptionalTextFields>
              {/* linkedin */}
              <OptionalTextFields value={linkedin_username}>
                <Link
                  href={`https://www.linkedin.com/in/${linkedin_username}`}
                  target={"_blank"}
                  className=" group brightness-90 flex flex-wrap gap-1 hover:text-blue-300 items-center justify-center"
                >
                  <FaLinkedin />
                  {linkedin_username}
                  <ExternalLink className="w-4 h-4 hidden group-hover:flex  absolute -right-5" />
                </Link>
              </OptionalTextFields>
            </div>
          </div>
        </div>
        {/* skills  */}
        {skills && (
          <div className="flex flex-wrap items-center justify-center gap-3">
            {skills?.split(",").map((skill, idx) => {
              return (
                <Badge key={skill + idx} variant="outline" className="glass">
                  {skill}
                </Badge>
              );
            })}
          </div>
        )}
      </div>
      {/* end of profile details */}
    </div>
  );
}

export function ProfileComponentSuspenseFallback() {
  return (
    <div className="w-full h-full flex flex-col items-center  relative gap-2">
      {/* back button */}
      <Link
        className="absolute top-4 left-4 z-30 bg-base-100 bg-opacity-40 hover:bg-secondary  glass rounded-full p-2"
        href={"/dashboard"}
      >
        <ChevronLeft className="h-6 w-7" />
      </Link>
      {/* start of cover image  */}

      <div className="h-[200px] w-full glass skeleton"></div>
      {/*  end of cover image */}
      {/*start  profile image */}
      <div className="rounded-full absolute size-[150px]  top-[11%] sm:top-[12%] md:top-[15%] p-3 glass skeleton z-40"></div>
      {/* end of profile image */}
      {/* start of profile  details */}
      <div className="w-full glass flex flex-col items-center justify-center z-30 pt-[11%] sm:pt-[7%] lg:pt-[5%] pb-2 ">
        {/*  image and basic detalis */}
        <div className="w-full flex items-center justify-between flex-col  gap-2 ">
          <div className="w-full flex flex-wrap items-center justify-center p-3  ">
            <div className="w-full flex flex-wrap items-center justify-start md:justify-center px-3 gap-3 ">
              {/* name and edit profile section */}
              <div className="flex  items-center justify-center gap-3 w-full">
                {/* name */}
                <span className="text-2xl font-bold  px-2 line-clamp-1 h-6 skeleton bg-base-300"></span>
                <button className="rounded-xl border border-secondary px-2 bg-primary skeleton"></button>
              </div>
              {/* bio */}
              <div className="w-full flex items-center justify-between flex-col  text-sm brightness-75 text-center text-balance">
                <div className="w-full h-20 bg-base-200 skeleton sm:w-[90%] lg:w-[70%] flex items-center justify-between flex-col  text-sm  "></div>
              </div>
              {/* username */}
              <span className=" w-[40%] md:w-[30%] h-4 bg-base-200 skeleton"></span>
              {/* email */}
              <span className="w-[40%] md:w-[30%] flex  gap-1 items-center justify-center">
                <div className="w-full h-4 skeleton bg-base-300"></div>
              </span>
              {/* joined */}
              <span className="w-[70%] md:w-[30%] flex justify-center items-center text-sm">
                <div className="w-full h-4 skeleton bg-base-300"></div>
              </span>
              {/* phone */}
              <span className="w-[80%] md:w-[30%] flex  gap-1 items-center justify-center">
                <div className=" w-full h-4 skeleton bg-base-300"></div>
              </span>
            </div>
          </div>
        </div>
        {/* skills  */}

        <div className="flex  items-center justify-center gap-3 w-full">
          {Array.from({ length: 5 }).map((_, idx) => {
            return (
              <Badge
                key={idx}
                variant="outline"
                className="glass skeleton bg-base-300 w-[30%] h-4"
              ></Badge>
            );
          })}
        </div>
      </div>
      {/* end of profile details */}
    </div>
  );
}

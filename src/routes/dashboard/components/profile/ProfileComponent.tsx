import { OptionalTextFields } from "@/components/wrappers/OptionalTextFields";
import { useViewer } from "@/lib/pb/hooks/useViewer";
import {
  CheckCircle,
  ExternalLink,
  GithubIcon,
  LinkedinIcon,
  Mail,
  MailIcon,
  MapPin,
  PhoneIcon,
  Pin,
  PinOffIcon,
  TwitterIcon,
  User,
} from "lucide-react";
import { Link } from "rakkasjs";
import { FaGithub, FaLinkedin } from "react-icons/fa";

interface ProfileComponentProps {}

export function ProfileComponent({}: ProfileComponentProps) {
  const { data } = useViewer();

  const user = data?.user?.record;
  if (!user) return null;
  const {
    avatar_url,
    bio,
    city,
    country,
    created,
    email,
    github_username,
    github_access_token,
    linkedin_username,
    google_access_token,
    id,
    phone,
    username,
    skills,
    verified,
  } = user;
  return (
    <div className="w-full h-full flex flex-col items-center  relative gap-2">
      {/* start of cover image  */}
      <img
        src={"https://picsum.photos/id/63/600/200"}
        height={200}
        width={600}
        alt={"cover image"}
        className="w-full aspect-[6/2]l md:aspect-[7/1]  object-cover  z-20 top-0 left-0 right-0 bottom-[80%]"
      />
      {/*  end of cover image */}
      <div className="w-full flex   items-center justify-center z-30 absolute md:static top-[10%] md:top-0">
        {/*  image and basic detalis */}
        <div className="w-full flex items-center flex-col md:flex-row gap-2">
          <img
            src={avatar_url}
            height={200}
            width={200}
            alt={"cover image"}
            className="rounded-xl"
          />

          <div className="flex flex-col items-center justify-center   ">
            <div className="flex flex-col items-center justify-center">
              <span className="text-lg flex flex-wrap gap-1 items-center justify-center">
                <MailIcon className="h-4 w-4" />
                {email}
              </span>
              <span className="text-lg brightness-90">@{username}</span>
              <OptionalTextFields value={city || country}>
                <span className="text-lg brightness-90 flex flex-wrap gap-1 items-center justify-center">
                  <MapPin />
                  {city} {country}
                </span>
              </OptionalTextFields>
              <OptionalTextFields value={github_username}>
                <Link
                  href={`https://github.com/${github_username}`}
                  target="_blank"
                  className="text-lg group brightness-90 flex flex-wrap gap-1 hover:text-blue-300 items-center justify-center"
                >
                  <FaGithub />
                  {city} {github_username}
                  <ExternalLink className="w-4 h-4 hidden group-hover:flex  absolute -right-5" />
                </Link>
              </OptionalTextFields>
              <OptionalTextFields value={linkedin_username}>
                <Link
                  href={`https://www.linkedin.com/in/${linkedin_username}`}
                  target={"_blank"}
                  className="text-lg group brightness-90 flex flex-wrap gap-1 hover:text-blue-300 items-center justify-center"
                >
                  <FaLinkedin />
                  {linkedin_username}
                  <ExternalLink className="w-4 h-4 hidden group-hover:flex  absolute -right-5" />
                </Link>
              </OptionalTextFields>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

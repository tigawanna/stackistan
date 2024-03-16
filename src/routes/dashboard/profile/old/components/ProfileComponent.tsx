import { ProfileImage } from "./profile-sections/ProfileImage";
import { PBReturnedUseQueryError } from "@/components/error/PBReturnedUseQueryEror";
import { useState } from "react";
import { ProfileDetails } from "./profile-sections/ProfileDetails";
import { Edit, Loader, Save } from "lucide-react";
import { TheCountryFields } from "@/components/country/TheCountryFields";

import { useUser } from "@/utils/hooks/tanstack-query/useUser";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { TheTextAreaInput } from "@/components/form/inputs/TheTextArea";
import { TheStringListInput } from "@/components/form/inputs/StringListInput";
import { usePageContext } from "rakkasjs";
import { sonnerToast } from "@/components/shadcn/misc/sonner-taost";
import { pbTryCatchWrapper } from "@/lib/pb/utils";
import { StackistanUsersUpdate } from "@/lib/pb/database";

interface ProfileComponentProps {
  id: string;
}

export function ProfileComponenst({ id }: ProfileComponentProps) {
  const qc = useQueryClient();
  const { locals } = usePageContext();

  const [editing, setEditing] = useState(false);

  const query = useQuery({
    queryKey: ["profile", id],
    queryFn: () =>
      pbTryCatchWrapper(locals.pb.from("stackistan_users").getOne(id ?? "")),
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });
  const profile = query.data?.data;

  const [input, setInput] = useState<StackistanUsersUpdate>({
    username: profile?.username,
    github_username: profile?.github_username ?? "",
    linkedin_username: profile?.linkedin_username ?? "",
    bio: profile?.bio ?? "",

    avatar_url: profile?.avatar_url,
    email: profile?.email,
    country: profile?.country ?? "",
    city: profile?.city ?? "",

    phone: profile?.phone ?? "",
    skills: profile?.skills ?? "",
  });
  const mutation = useMutation({
    mutationFn: async (vars: StackistanUsersUpdate) => {
      return pbTryCatchWrapper(
        locals.pb.from("stackistan_users").update(id ?? "", vars),
      );
    },

    onSuccess: (res) => {
      if (res.data) {
        sonnerToast({
          options: {
            description: "Profile updated successfully",
          },
        });
        qc.invalidateQueries({ queryKey: ["profile", id] });
        setEditing(false);
        // startTransition(() => {
        // })
      }
      if (res.error) {
        // toast.error("something went wrong", { description: res.error.message , duration:10000 });
        sonnerToast({
          type: "error",
          options: {
            description: res.error.message,
          },
        });
      }
    },
    onError: (error: any) => {
      // toast(err?.message, { type: "error", autoClose: false });
      sonnerToast({
        type: "error",
        options: {
          description: error.message,
        },
      });
    },
  });

  const response = query.data;

  return (
    <div className="w-full h-full flex flex-col items-center  px-4 ">
      {response?.error && <PBReturnedUseQueryError error={response.error} />}
      {!response?.data?.verified && (
        <div className="text-sm bg-error/20 text-error sticky top-10 p-1">
          ⚠ unverified emails have read-only access
        </div>
      )}
      <div className="flex items-center justify-end gap-1  p-1 w-full sticky top-10">
        {editing && (
          <button title="save changes" className="btn btn-sm ">
            {mutation.isPending ? (
              <Loader className="animate-spin" />
            ) : (
              <Save
                onClick={() => mutation.mutate(input)}
                className="h-7 w-7"
              />
            )}
          </button>
        )}
        <button
          title={editing ? "stop editing" : "toggle editing"}
          className={editing ? "btn btn-sm text-accent" : "btn btn-sm"}
        >
          <Edit onClick={() => setEditing((prev) => !prev)} />
        </button>
      </div>

      {response?.data && (
        <div className="w-full  flex flex-col  gap-10  p-1  mb-5 sm:px-5 ">
          <div className="w-full flex flex-col md:flex-row gap-5  justify-between ">
            <div className="min-w-[250px] w-full md:w-[25%]">
              <ProfileImage
                avatar_url={response?.data?.avatar_url}
                file_name={response?.data?.avatar_url}
                record_id={response?.data?.id}
                editing={editing}
                setEditing={setEditing}
                setInput={setInput}
              />
            </div>

            <div className="w-full  flex flex-col   p-1  gap-2 ">
              {/* email, username , github_username , linkedin_username */}
              <ProfileDetails
                profile={response?.data}
                editing={editing}
                input={input}
                setInput={setInput}
              />
              {/* country , city , phone */}
              <TheCountryFields
                editing={editing}
                country={{
                  city: input.city ?? "",
                  country: input.country ?? "",
                  phone: input.phone ?? "",
                }}
                setInput={(value) =>
                  setInput((prev) => {
                    return {
                      ...prev,
                      country: value.country,
                      phone: value.phone,
                      city: value.city,
                    };
                  })
                }
              />
            </div>
          </div>
          {/* skills */}
          <div className="w-full flex flex-wrap gap-5  ">
            <TheStringListInput
              editing={editing}
              field_name="Skills"
              field_key="skills"
              input={input}
              setInput={setInput}
            />{" "}
          </div>

          {/* bio */}
          <div className="w-full h-full flex flex-col  md:flex-row  p-1  gap-2">
            <TheTextAreaInput
              container_classname="lg:max-w-[70%] lg:max-w-[60%] gap-2"
              className="min-h-[180px] "
              field_key={"about_me"}
              value={input["bio"]}
              // input={input}
              field_name={"About Me"}
              onChange={(e) => {
                setInput((prev) => {
                  return {
                    ...prev,
                    bio: e.target.value,
                  };
                });
              }}
              label_classname=""
              editing={editing}
            />
          </div>

          {editing && (
            <button
              title="save changes"
              className="btn btn-sm h-auto p-1 px-3 btn-outline w-fit"
            >
              {mutation.isPending ? (
                <Loader className="animate-spin" />
              ) : (
                <>
                  Save Changes
                  <Save onClick={() => mutation.mutate(input)} className="" />
                </>
              )}
            </button>
          )}
        </div>
      )}
    </div>
  );
}

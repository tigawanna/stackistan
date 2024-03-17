import { useFormHook } from "@/components/form/useForm";
import { Button } from "@/components/shadcn/ui/button";
import { Card, CardContent, CardHeader } from "@/components/shadcn/ui/card";
import { Input } from "@/components/shadcn/ui/input";
import { Label } from "@/components/shadcn/ui/label";
import { Textarea } from "@/components/shadcn/ui/textarea";
import { PBFieldWrapper } from "@/lib/pb/components/form/PBFieldWrapper";
import { StackistanUsersUpdate } from "@/lib/pb/database";
import { useViewer } from "@/lib/pb/hooks/useViewer";
import { ProfileImage } from "./ProfileImage";
import { useMutation } from "@tanstack/react-query";
import { pbTryCatchWrapper } from "@/lib/pb/utils";
import { usePageContext } from "rakkasjs";
import { sonnerToast } from "@/components/shadcn/misc/sonner-taost";
import { useEffect } from "react";
import { PbTheTextInput } from "@/lib/pb/components/form/PBTheTextInput";
import { PbTheTextAreaInput } from "@/lib/pb/components/form/PBTheTextAreaInput";

interface UpdateProfileFormProps {}

export function UpdateProfileForm({}: UpdateProfileFormProps) {
  const {
    locals: { pb },
  } = usePageContext();
  const { data } = useViewer();

  const { error, handleChange, input, setError, validateInputs, setInput } =
    useFormHook<StackistanUsersUpdate>({
      initialValues: {
        name: data?.user?.record?.name || "",
        bio: data?.user?.record?.bio || "",
        city: data?.user?.record?.city || "",
        phone: data?.user?.record?.phone || "",
        website: data?.user?.record?.website || "",
        skills: data?.user?.record?.skills || "",
        linkedin_username: data?.user?.record?.linkedin_username || "",
        github_username: data?.user?.record?.github_username || "",
        country: data?.user?.record?.country || "",
        avatar_url: data?.user?.record?.avatar_url || "",
        cover_image_url: data?.user?.record?.cover_image_url || "",
        username: data?.user?.record?.username || "",
      },
    });
  useEffect(() => {
    setInput(data?.user?.record as StackistanUsersUpdate);
  }, [data?.user?.record]);

  const mutation = useMutation({
    mutationFn: ({
      id,
      input,
    }: {
      id: string;
      input: StackistanUsersUpdate;
    }) => {
      return pbTryCatchWrapper(pb.from("stackistan_users").update(id, input));
    },
    meta: {
      invalidates: ["viewer"],
    },
    onSuccess: (res) => {
      if (res.data) {
        setError({ name: "", message: "" });
        sonnerToast({
          title: "Updated profile",
        });
      }
      if (res.error) {
        setError({ name: "main", message: res.error.message });
        sonnerToast({
          type: "error",
          title: "Profile update failed",
          options: { description: res.error.message },
        });
      }
    },
    onError: (error) => {
      setError({ name: "main", message: error.message });
      sonnerToast({
        type: "error",
        title: "Profile update failed",
        options: { description: error.message },
      });
    },
  });
  const pb_error = mutation.data?.error;
  return (
    <div className="w-full h-full  p-5">
      <Card className="w-full">
        <CardHeader>
          <div className="space-y-1.5">
            <h2 className="font-medium leading-6 text-3xl ">Your Profile</h2>
            <p className="text-sm leading-5 muted">
              This information will be displayed on your public profile.
            </p>
          </div>
        </CardHeader>
        <CardContent className="grid gap-6 pt-6">
          {/* cover image */}
          <div className="w-full flex flex-col  justify-center items-center">
            <Label className="text-sm" htmlFor="cover_image_url">
              Cover Image URL
            </Label>
            <PBFieldWrapper field_key={"cover_image_url"} pb_error={pb_error}>
              <ProfileImage
                field_key={"cover_image_url"}
                image={input?.cover_image_url}
                setImage={() => {
                  setInput((prev) => {
                    return {
                      ...prev,
                      cover_image_url: "",
                    };
                  });
                }}
              />
            </PBFieldWrapper>
          </div>
          {/* profile image */}
          <div className="w-full flex flex-col  justify-center items-center">
            <Label className="text-sm" htmlFor="avatar_url">
              Avatar URL
            </Label>
            <PBFieldWrapper field_key={"avatar_url"} pb_error={pb_error}>
              <ProfileImage
                field_key={"avatar_url"}
                image={input?.avatar_url}
                setImage={() => {
                  setInput((prev) => {
                    return {
                      ...prev,
                      avatar_url: "",
                    };
                  });
                }}
              />
            </PBFieldWrapper>
          </div>

          <div className="w-full flex flex-wrap items-ceneter justify-center">
            <div className="w-full flex flex-wrap gap-3 justify-center items-center">
              <PbTheTextInput
                container_classname="w-full md:w-[40%]"
                field_key={"name"}
                field_name={"Name"}
                pb_error={pb_error}
                val={input?.name}
                onChange={handleChange}
              />
              <PbTheTextInput
                container_classname="w-full md:w-[40%]"
                field_key={"username"}
                field_name={"Username"}
                pb_error={pb_error}
                val={input?.username}
                onChange={handleChange}
              />
              <PbTheTextInput
                container_classname="w-full md:w-[40%]"
                field_key={"github_username"}
                field_name={"Github Username"}
                pb_error={pb_error}
                val={input?.github_username}
                onChange={handleChange}
              />
              <PbTheTextInput
                container_classname="w-full md:w-[40%]"
                field_key={"linkedin_username"}
                field_name={"Linkedin Username"}
                pb_error={pb_error}
                val={input?.linkedin_username}
                onChange={handleChange}
              />
            </div>
            <PbTheTextAreaInput
              className="min-h-[150px]"
              rows={4}
              field_key={"bio"}
              field_name={"Bio"}
              pb_error={pb_error}
              value={input?.bio}
              onChange={handleChange}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

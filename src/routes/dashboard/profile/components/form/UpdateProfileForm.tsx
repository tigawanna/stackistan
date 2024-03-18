import { useFormHook } from "@/components/form/useForm";
import { Card, CardContent, CardHeader } from "@/components/shadcn/ui/card";
import { PBFieldWrapper } from "@/lib/pb/components/form/PBFieldWrapper";
import { StackistanUsersUpdate } from "@/lib/pb/database";
import { useViewer } from "@/lib/pb/hooks/useViewer";
import { useMutation } from "@tanstack/react-query";
import { pbTryCatchWrapper } from "@/lib/pb/utils";
import { ClientSuspense, usePageContext } from "rakkasjs";
import { sonnerToast } from "@/components/shadcn/misc/sonner-taost";
import { useEffect, useTransition } from "react";
import { PbTheTextInput } from "@/lib/pb/components/form/PBTheTextInput";
import { PbTheTextAreaInput } from "@/lib/pb/components/form/PBTheTextAreaInput";
import { TheCountryFields } from "@/components/country/TheCountryFields";
import ClientSuspenseWrapper from "@/components/wrappers/ClientSuspenseWrapper";
import { Button } from "@/components/shadcn/ui/button";
import { Loader } from "lucide-react";
import { TheStringListInput } from "@/components/form/inputs/StringListInput";
import { PBTheImagePicker } from "@/lib/pb/components/form/PbTheImagePicker";

interface UpdateProfileFormProps {}

export function UpdateProfileForm({}: UpdateProfileFormProps) {
  const {
    locals: { pb },
  } = usePageContext();
  const { data } = useViewer();
  const [_, startTransition] = useTransition();

  const { error, handleChange, input, setError, validateInputs, setInput } =
    useFormHook<StackistanUsersUpdate>({
      initialValues: {
        name: data?.user?.record?.name || "",
        avatar: null,
        cover_image: null,
        bio: data?.user?.record?.bio || "",
        website: data?.user?.record?.website || "",
        skills: data?.user?.record?.skills || "",
        linkedin_username: data?.user?.record?.linkedin_username || "",
        github_username: data?.user?.record?.github_username || "",
        country: data?.user?.record?.country || "",
        city: data?.user?.record?.city || "",
        phone: data?.user?.record?.phone || "",
        avatar_url: data?.user?.record?.avatar_url || "",
        cover_image_url: data?.user?.record?.cover_image_url || "",
        username: data?.user?.record?.username || "",
      },
    });
  useEffect(() => {
    startTransition(() => {
      // @ts-expect-error
      setInput(data?.user?.record as StackistanUsersUpdate);
    });
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

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const isValid = validateInputs((inp) => {
      //  do validation here
      return true;
    });
    if (isValid) {
      // console.log(" === updating  ==== ", input);
      mutation.mutate({ id: data?.user?.record?.id || "", input });
    }
  }
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
          <form className="" onSubmit={handleSubmit}>
            {/* cover image */}
            {/* <div className="w-full min-h-[200px] flex flex-col  justify-center ">
              <Label className="text-sm" htmlFor="cover_image_url">
                Cover Image URL
              </Label>
              <PBFieldWrapper field_key={"cover_image_url"} pb_error={pb_error}>
                <ProfileImage
                  field_key={"cover_image_url"}
                  // @ts-expect-error
                  image={input?.cover_image_url}
                  setImage={(img) => {
                    setInput((prev) => {
                      return {
                        ...prev,
                        cover_image_url: img,
                      };
                    });
                  }}
                />
              </PBFieldWrapper>
            </div> */}
            
            {/* profile image */}
            {/* <div className="w-full min-h-[200px] flex flex-col  justify-center ">
              <Label className="text-sm" htmlFor="avatar_url">
                Avatar URL
              </Label>
              <PBFieldWrapper field_key={"avatar_url"} pb_error={pb_error}>
                <ProfileImage
                  field_key={"avatar_url"}
                  // @ts-expect-error
                  image={input?.avatar_url}
                  setImage={(img) => {
                    setInput((prev) => {
                      return {
                        ...prev,
                        avatar_url: img,
                      };
                    });
                  }}
                />
              </PBFieldWrapper>
            </div> */}

            <div className="w-full  flex flex-col md:flex-row gap-2  justify-center ">
              <div className="w-full md:w-[30%]">
                <PBTheImagePicker
                  img_classname="aspect-square"
                  label="Profile Image"
                  file_name={data?.user?.record?.avatar}
                  collection_id_or_name="stackistan_users"
                  show_preview={true}
                  setFileImage={(e) => {
                    setInput((prev) => {
                      return {
                        ...prev,
                        avatar: e,
                      };
                    });
                  }}
                />
              </div>
              <div className="w-full">
                <PBTheImagePicker
                  label="Cover image"
                  img_classname="w-full"
                  file_name={data?.user?.record?.cover_image}
                  collection_id_or_name="stackistan_users"
                  show_preview={true}
                  setFileImage={(e) => {
                    setInput((prev) => {
                      return {
                        ...prev,
                        cover_image: e,
                      };
                    });
                  }}
                />
              </div>
            </div>

            {/* profile image */}

            {/* profile country */}
            {/* country , city , phone */}
            <ClientSuspense
              fallback={<div className="h-[150px] skeleton bg-base-300"></div>}
            >
              <ClientSuspenseWrapper>
                <TheCountryFields
                  editing={true}
                  country={{
                    city: input?.city ?? "",
                    country: input?.country ?? "",
                    phone: input?.phone ?? "",
                  }}
                  setInput={(value) =>
                    startTransition(() => {
                      setInput((prev) => {
                        return {
                          ...prev,
                          country: value.country,
                          phone: value.phone,
                          city: value.city,
                        };
                      });
                    })
                  }
                />
              </ClientSuspenseWrapper>
            </ClientSuspense>

            {/* profile details */}
            <div className="w-full flex flex-wrap items-ceneter justify-start gap-4">
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
              <PbTheTextInput
                container_classname="w-full md:w-[40%]"
                field_key={"website"}
                field_name={"Website"}
                pb_error={pb_error}
                val={input?.website}
                type="url"
                onChange={handleChange}
              />
              {input?.skills && (
                <PBFieldWrapper field_key={"date_of_birth"} pb_error={pb_error}>
                  <TheStringListInput<StackistanUsersUpdate>
                    field_key="skills"
                    input={input}
                    setInput={setInput}
                    field_name={"skills"}
                    label_classname="flex"
                    editing={true}
                  />
                </PBFieldWrapper>
              )}
            </div>
            {/* submit button */}
            <div className="w-full py-5 flex items-center justify-center">
              <Button
                className="min-w-full  md:min-w-[50%] flax gap-3"
                disabled={mutation.isPending}
              >
                Submit{" "}
                {mutation.isPending && <Loader className="animate-spin" />}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

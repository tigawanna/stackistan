import AutoForm, { AutoFormSubmit } from "@/components/shadcn/ui/auto-form";
import { z } from "zod";

interface EditProfileFormProps {
id:string
}

export function EditProfileForm({id}:EditProfileFormProps){
return (
  <div className="w-full h-full flex flex-col items-center justify-center">
    <AutoForm
      // Pass the schema to the form
      formSchema={updateProfileSchema}
      // You can add additional config for each field
      // to customize the UI
    >
      {/* 
      Pass in a AutoFormSubmit or a button with type="submit".
      Alternatively, you can not pass a submit button
      to create auto-saving forms etc.
      */}
      <AutoFormSubmit>Send now</AutoFormSubmit>

      {/*
      All children passed to the form will be rendered below the form.
      */}
      <p className="text-gray-500 text-sm">
        By submitting this form, you agree to our{" "}
        <a href="#" className="text-primary underline">
          terms and conditions
        </a>
        .
      </p>
    </AutoForm>
  </div>
);
}


export const updateProfileSchema = z.object({
  username: z.string().optional(),
  email: z.string().optional(),
  emailVisibility: z.boolean().optional(),
  oldPassword: z.string().optional(),
  password: z.string().optional(),
  passwordConfirm: z.string().optional(),
  verified: z.boolean().optional(),
  name: z.string(),
  github_access_token: z.string().optional(),
  google_access_token: z.string().optional(),
  bio: z.string().optional(),
  avatar_url: z.string().optional(),
  cover_image_url: z.string(),
  skills: z.string().optional(),
  github_username: z.string().optional(),
  linkedin_username: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
  phone: z.string().optional(),
});

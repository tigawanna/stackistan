import AutoForm, { AutoFormSubmit } from "@/components/shadcn/ui/auto-form";
import * as z from "zod";
import { createStackistanUserSchema } from "./schema";

export function CreateProfileZodAutoForm() {
  return (
    <AutoForm
      // Pass the schema to the form
      formSchema={createStackistanUserSchema}
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
  );
}

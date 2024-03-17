import { PageProps } from "rakkasjs";
import { UpdateProfileForm } from "./components/form/UpdateProfileForm";
import { Suspense } from "react";
export default function Page({}: PageProps) {
  return (
    <div className="w-full h-full  flex flex-col items-center justify-center">
      <Suspense fallback={<div className="h-5 skeleton bg-base-300"></div>}>
        <UpdateProfileForm />
      </Suspense>
    </div>
  );
}

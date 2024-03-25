import { ClientSuspense, PageProps } from "rakkasjs";
import { ProfileComponentSuspenseFallback } from "../profile/components/ProfileComponent";
import CherryMarkdownEditor from "@/components/editor/CherryMarkdownEditor";
import { Cherry } from "lucide-react";


export default function TestPage({}: PageProps) {
  return (
    <div className="flex h-full mt-9  w-full flex-col items-center justify-center">
      <ClientSuspense
        fallback={
          <div className="min-h-[60vh] skeleton w-full bg-base-200 "></div>
        }
      >
        <div className="z-40 min-w-[90%]">
        <CherryMarkdownEditor
          input_string={ "Hello teej "}
          // custom_element={(cherry: Cherry | null) => {
          //   return (
          //     <ResumeEditorControls
          //       cherry={cherry}
          //       application_input={application_input}
          //       setResume={setResume}
          //       resume_input={resume_input}
          //       updating={updating}
          //     />
          //   );
          // }}
        />
        </div>
      </ClientSuspense>

    </div>
  );
}

import { ClientResponseError } from "pocketbase";
import { PBFieldWrapper } from "../input-parts/PBFieldWrapper";
import { ClientSuspense } from "rakkasjs";
import { lazy, useEffect, useRef, useState } from "react";
import Cherry from "cherry-markdown";
import { Loader, Pen, Save } from "lucide-react";
import { Label } from "@/components/shadcn/ui/label";
import { twMerge } from "tailwind-merge";

const CherryMarkdownEditor = lazy(
  () => import("@/components/editor/cherry-markdown/CherryMarkdownEditor"),
);

interface GenericFormEditorProps<T extends Record<string, any>> {
  input: T;
  fieldKey: keyof T;
  fieldLabel?: string;
  setInput: React.Dispatch<React.SetStateAction<T>>;
  fieldError?: ClientResponseError | null | undefined;
  custom_element?: (cherry: Cherry | null) => JSX.Element;
}

export function GenericFormEditor<T extends Record<string, any>>({
  fieldKey,
  input,
  setInput,
  fieldError,
  fieldLabel,
  custom_element,
}: GenericFormEditorProps<T>) {
  return (
    <PBFieldWrapper field_key={fieldKey} pb_error={fieldError}>
      <ClientSuspense
        fallback={
          <div className="w-full min-h-[50vh]  flex justify-center items-center bg-base-200 skeleton">
            <Pen className="animate-pulse"/>
          </div>
        }
      >
        <div className="z-40  h-full w-full min-h-[50vh]">
          <Label
            className={twMerge(
              "font-serif font-semibold ",
            )}
          >
            {fieldLabel}
          </Label>
          <CherryMarkdownEditor
            max_width={800}
            container_classname=""
            input_string={input[fieldKey]}
            setContent={(html, text) => {
              setInput((prev) => ({
                ...prev,
                [fieldKey]: text,
              }));
            }}
            custom_element={(cherry: Cherry | null) => {
              return (
                <GenericFormEditorControls
                  cherry={cherry}
                  setMarkdown={() =>
                    setInput((prev) => ({
                      ...prev,
                      [fieldKey]: cherry?.getMarkdown(),
                    }))}
                />
              );
            }}
          />
        </div>
      </ClientSuspense>
    </PBFieldWrapper>
  );
}

interface GenericFormEditorControlsProps {
  cherry: Cherry | null;
  setMarkdown: (markdown: string) => void;
}

export function GenericFormEditorControls({
  cherry,
  setMarkdown,
}: GenericFormEditorControlsProps) {
  const [saving, setSaving] = useState(false);
  // auto save markdown every 15 seccods
  useEffect(() => {
    if (!cherry) return;
    const interval = setInterval(() => {
      setSaving(true);
      setMarkdown(cherry.getMarkdown());
    }, 15000);
    return () => clearInterval(interval);
  },[])

  useEffect(() => {
    if (!saving) return;
    setTimeout(() => {
      setSaving(false);
  }, 2000);
  }, [saving]);

  return (
    <div className=" flex  items-center justify-start gap-2 p-1">
      <button
        className=""
        onClick={() => {
          if (cherry) {
            setSaving(true);
            setMarkdown(cherry.getMarkdown());
          }
        }}
      >
        <Save className="size-6" />
      </button>
      {saving && <Loader className="animate-spin" />}
    </div>
  );
}

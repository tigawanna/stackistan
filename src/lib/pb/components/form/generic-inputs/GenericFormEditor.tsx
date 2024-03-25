import { ClientResponseError } from "pocketbase";
import { PBFieldWrapper } from "../input-parts/PBFieldWrapper";
import { ClientSuspense } from "rakkasjs";
import { lazy, useEffect, useRef, useState } from "react";
import Cherry from "cherry-markdown";

const CherryMarkdownEditor = lazy(
  () => import("@/components/editor/CherryMarkdownEditor"),
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
          <div className="min-h-[40vh] skeleton w-full bg-base-200 "></div>
        }
      >
        <div className="z-40 min-w-[90%]">
          <CherryMarkdownEditor
            input_string="ooga booga"
            custom_element={(cherry: Cherry | null) => {
              return (
                <GenericFormEditorControls
                  cherry={cherry}
                  setMarkdown={() =>
                    setInput((prev) => ({
                      ...prev,
                      [fieldKey]: cherry?.getMarkdown(),
                    }))
                  }
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
  // auto save markdown every 15 seccods
  const [saving, setSaving] = useState(false);
  useEffect(() => {
    const interval = setInterval(() => {
      if (cherry) {
        setSaving(true);
        setMarkdown(cherry.getMarkdown());
        setSaving(false);
      }
    }, 1500);
    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <div className=" flex  items-center justify-start">
      <button
        onClick={() => {
          if (cherry) {
            setMarkdown(cherry.getMarkdown());
          }
        }}
      >
        get markdown
      </button>
      {saving&&<div> saving...</div>}
    </div>
  );
}

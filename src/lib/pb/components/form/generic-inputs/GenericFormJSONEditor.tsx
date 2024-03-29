import { ClientResponseError } from "pocketbase";
import { PBFieldWrapper } from "../input-parts/PBFieldWrapper";
import { Label } from "@/components/shadcn/ui/label";
import { twMerge } from "tailwind-merge";
import { PlainJsonEditor } from "react-plain-json-editor";

interface GenericFormEditorProps<T extends Record<string, any>> {
  input: T;
  fieldKey: keyof T;
  fieldLabel?: string;
  setInput: React.Dispatch<React.SetStateAction<T>>;
  fieldError?: ClientResponseError | null | undefined;
}

export function GenericFormJSONEditor<T extends Record<string, any>>({
  fieldKey,
  input,
  setInput,
  fieldError,
  fieldLabel,
}: GenericFormEditorProps<T>) {
  const handleChange = (result: Record<string, any>) => {
    setInput((prev) => ({
      ...prev,
      [fieldKey]: result,
    }));
  };

  const handleSubmit = (result: Record<string, any>) => {
    setInput((prev) => ({
      ...prev,
      [fieldKey]: result,
    }));
  };
  const submit = (
    <button className="btn btn-ghost" type="submit">
      Submit
    </button>
  );
  return (
    <PBFieldWrapper field_key={fieldKey} pb_error={fieldError}>
      <div className="z-40  h-full w-full min-h-[40vh]  bg-base-100 rounded-lg p-1">
        <div className="w-full">
          <Label className={twMerge("font-serif font-semibold text-lg")}>
            {fieldLabel}
          </Label>
          {submit}
        </div>
        <PlainJsonEditor
          formatAfterSubmit={true}
          value={input[fieldKey]}
          onChange={handleChange}
          onSubmit={handleSubmit}
          // @ts-expect-error
          submitKeys={[submit]}
          // onSerializeError={handleSerializeError}
          styles={{
            error: {
              top: "15%",
            },
            textarea: {
              backgroundColor: "var(--backeground)",
              border: "none",
              outline: "none",
              color: "#ccc",
              padding: 12,
              fontSize: "1.2rem",
              lineHeight: "1.5rem",
              fontFamily: "monospace",
              width: "80%",
              height: "80%",
            },
          }}
        />
      </div>
    </PBFieldWrapper>
  );
}

import { ClientResponseError } from "pocketbase";
import { PbTheTextInput } from "@/lib/pb/components/form/input-parts/PBTheTextInput";
import { Link, Mail, TimerIcon } from "lucide-react";
import { PBFieldWrapper } from "../input-parts/PBFieldWrapper";

interface GenericFormEditorProps<T extends Record<string, any>> {
  input: T;
  fieldKey: keyof T;
  fieldLabel?: string;
  setInput: React.Dispatch<React.SetStateAction<T>>;

  fieldError?: ClientResponseError | null | undefined;
}

export function GenericFormEditor<T extends Record<string, any>>({
  fieldKey,

  input,
  setInput,
  fieldError,
  fieldLabel,
}: GenericFormEditorProps<T>) {


  return (
    <PBFieldWrapper field_key={fieldKey} pb_error={fieldError}>
      <div>
        <textarea/>
      </div>
    </PBFieldWrapper>
  );
}

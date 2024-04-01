import { ClientResponseError } from "pocketbase";
import { PBFieldWrapper } from "../input-parts/PBFieldWrapper";
import { PBTheImagePicker } from "../input-parts/PbTheImagePicker";
import { CollectionName } from "@/lib/pb/client";

interface GenericFormFilePickerProps<T extends Record<string, any>> {
  input: T;
  fieldKey: keyof T;
  fieldLabel?: string;
  setInput: React.Dispatch<React.SetStateAction<T>>;
  fieldError?: ClientResponseError | null | undefined;
  collaction_id_or_name: CollectionName;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
}

export function GenericFormFilePicker<T extends Record<string, any>>({
  fieldKey,
  input,
  setInput,
  fieldError,
  fieldLabel,
  collaction_id_or_name,
  inputProps
}: GenericFormFilePickerProps<T>) {
  return (
    <PBFieldWrapper field_key={fieldKey} pb_error={fieldError}>
      <div className="z-40  h-full w-full min-h-[30vh]  rounded-lg p-1">
        <PBTheImagePicker
          collection_id_or_name={collaction_id_or_name}
          record_id={input["id"]}
          file_name={input[fieldKey]}
          inputProps={inputProps}
          setFileImage={(file) =>
            setInput((prev) => ({ ...prev, [fieldKey]: file }))
          }
          label={fieldLabel}
        />
      </div>
    </PBFieldWrapper>
  );
}

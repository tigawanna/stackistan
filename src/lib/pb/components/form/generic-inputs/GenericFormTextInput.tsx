import { ClientResponseError } from "pocketbase";
import { PbTheTextInput } from "../input-parts/PBTheTextInput";
import { Link, Mail, TimerIcon } from "lucide-react";

export type TextFieldType = "text" | "number" | "email" | "url" | "date";

interface GenericFormTextInputProps<T extends Record<string, any>> {
  input: T;
  fieldKey: keyof T;
  fieldLabel?: string;
  setInput: React.Dispatch<React.SetStateAction<T>>;
  fieldType?: TextFieldType;
  fieldError?: ClientResponseError;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
}

export function GenericFormTextInput<T extends Record<string, any>>({
  fieldKey,
  fieldType,
  input,
  setInput,
  fieldError,
  fieldLabel,
  inputProps
}: GenericFormTextInputProps<T>) {
  if (fieldType === "number") {
    return (
      <PbTheTextInput
        field_key={fieldKey}
        field_name={fieldLabel}
        val={input[fieldKey]}
        onChange={(e) => {
          setInput((prev) => ({ ...prev, [fieldKey]: e.target.value }));
        }}
        pb_error={fieldError}
        type="number"
        {...inputProps} 
      />
    );
  }

  if (fieldType === "date") {
    return (
      <PbTheTextInput
        field_key={fieldKey}
        field_name={<span><TimerIcon className="size-5 mr-2"/>{fieldLabel}</span>}
        val={input[fieldKey]}
        onChange={(e) => {
          setInput((prev) => ({ ...prev, [fieldKey]: e.target.value }));
        }}
        pb_error={fieldError}
        type="date"
        {...inputProps}
      />
    );
  }
  if(fieldType === "url") {
    return (
      <PbTheTextInput
        field_key={fieldKey}
        field_name={<span><Link className="size-5 mr-2"/>{fieldLabel}</span>}
        val={input[fieldKey]}
        onChange={(e) => {
          setInput((prev) => ({ ...prev, [fieldKey]: e.target.value }));
        }}
        pb_error={fieldError}
        {...inputProps}
        type="url"
      />
    );
  }
  if(fieldType === "email") {
    return (
      <PbTheTextInput
        field_key={fieldKey}
        field_name={
          <span>
            <Mail className="size-5 mr-2" />
            {fieldLabel}
          </span>
        }
        val={input[fieldKey]}
        onChange={(e) => {
          setInput((prev) => ({ ...prev, [fieldKey]: e.target.value }));
        }}
        pb_error={fieldError}
        {...inputProps}
        type="email"
      />
    );
  }

  return (
    <PbTheTextInput
      field_key={fieldKey}
      field_name={fieldLabel}
      val={input[fieldKey]}
      onChange={(e) => {
        setInput((prev) => ({ ...prev, [fieldKey]: e.target.value }));
      }}
      pb_error={fieldError}
    />
  );
}

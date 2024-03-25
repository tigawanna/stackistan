import { ClientResponseError } from "pocketbase";
import { SelectField } from "../table/types";
import { PBFieldWrapper } from "./PBFieldWrapper";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn/ui/select";

interface ThePBSelectInputProps<T extends Record<string, any>> {
  input: T;
  fieldKey: keyof T;
  fieldLabel?: string;
  setInput: React.Dispatch<React.SetStateAction<T>>;
  fieldOptions: SelectField;
  fieldError?: ClientResponseError;
}

export function ThePBSelectInput<T extends Record<string, any>>({
  input,
  setInput,
  fieldKey,
  fieldLabel,
  fieldOptions,
  fieldError
}: ThePBSelectInputProps<T>) {
      const input_options = fieldOptions.fields;
  return (
    <PBFieldWrapper field_key={fieldKey} pb_error={fieldError}>
      <Select
        value={input[fieldKey]}
        onValueChange={(v) => setInput((prev) => ({ ...prev, [fieldKey]: v }))}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder={"Select " + fieldLabel} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {input_options.map(({ label: k, value: v }, index) => {
              return (
                <SelectItem key={v} value={v}>
                  {k}
                </SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
    </PBFieldWrapper>
  );
}

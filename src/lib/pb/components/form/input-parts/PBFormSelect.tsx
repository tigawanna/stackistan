import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn/ui/select";
import { SelectField } from "@/lib/pb/field-types";
import { ClientResponseError } from "pocketbase";
import { PBFieldWrapper } from "./PBFieldWrapper";

interface PBFormSelectProps<T extends Record<string, any>,K extends string> {
  input: T;
  fieldKey: keyof T;
  fieldLabel?: string;
  setInput: React.Dispatch<React.SetStateAction<T>>;
  fieldOptions: Partial<SelectField<T,K>>&Pick<SelectField<T,K>,"fields"|"type">;
  fieldError?: ClientResponseError | null | undefined;
}

export function PBFormSelect<T extends Record<string, any>,K extends string>({
  input,
  setInput,
  fieldKey,
  fieldLabel,
  fieldOptions,
  fieldError,
}: PBFormSelectProps<T,K>) {
  const input_options = fieldOptions.fields;
  return (
    <PBFieldWrapper field_key={fieldKey} pb_error={fieldError} >
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

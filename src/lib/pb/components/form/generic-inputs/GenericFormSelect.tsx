import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn/ui/select";
import { SelectField } from "@/lib/pb/components/table/types";
import { ClientResponseError } from "pocketbase";
import { PBFieldWrapper } from "../input-parts/PBFieldWrapper";

interface GenericFormSelectProps<T extends Record<string, any>> {
  input: T;
  fieldKey: keyof T;
  fieldLabel?: string;
  setInput: React.Dispatch<React.SetStateAction<T>>;
  fieldOptions: SelectField;
  fieldError?: ClientResponseError | null | undefined;
}

export function GenericFormSelect<T extends Record<string, any>>({
  input,
  setInput,
  fieldKey,
  fieldLabel,
  fieldOptions,
  fieldError,
}: GenericFormSelectProps<T>) {
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

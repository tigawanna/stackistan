import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn/ui/select";
import { SelectField } from "../../table/types";

interface GenericFormSelectProps<T extends Record<string, any>> {
  input: T;
  fieldKey: keyof T;
  fieldLabel?: string;
  setInput: React.Dispatch<React.SetStateAction<T>>;
  fieldOptions: SelectField;
}

export function GenericFormSelect<T extends Record<string, any>>({
  input,
  setInput,
  fieldKey,
  fieldLabel,
  fieldOptions,
}: GenericFormSelectProps<T>) {
  const input_options = fieldOptions.fields;
  return (
    <Select
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
  );
}

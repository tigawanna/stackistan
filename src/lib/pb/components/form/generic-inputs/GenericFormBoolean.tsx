import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn/ui/select";
import { SelectField } from "@/lib/pb/components/table/types";
import { PBCheckbox } from "../input-parts/PBCheckbox";
import { ClientResponseError } from "pocketbase";
import { PBFieldWrapper } from "../input-parts/PBFieldWrapper";

interface GenericFormBooleanProps<T extends Record<string, any>> {
  input: T;
  fieldKey: keyof T;
  fieldLabel: string;
  setInput: React.Dispatch<React.SetStateAction<T>>;
  fieldError?: ClientResponseError | null | undefined;
}

export function GenericFormBoolean<T extends Record<string, any>>({
  input,
  setInput,
  fieldKey,
  fieldLabel,
  fieldError,
}: GenericFormBooleanProps<T>) {
  return (
    <PBFieldWrapper field_key={fieldKey} pb_error={fieldError}>
      <PBCheckbox
        fieldKey={fieldKey as string}
        fieldLabel={fieldLabel}
        input={input}
        setInput={setInput}
      />
    </PBFieldWrapper>
  );
}

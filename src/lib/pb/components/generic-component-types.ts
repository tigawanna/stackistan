import { FieldType, PBColumnField } from "./table/types";

export interface CollectionColumnOptions<T extends Record<string, any>> {
  fieldKey: keyof T;
  fieldLabel: string;
  fieldType?: FieldType;
  fieldHidden?: boolean;
  fieldUpdatable?: boolean;
  fieldOptions: Partial<PBColumnField>;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  // rowFields: InputFieldType<T>[keyof T]
};


interface InputOptions<T extends Record<string, any>>
  extends CollectionColumnOptions<T> {
  fieldOptions: PBColumnField;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
}

//   inputProps?: React.InputHTMLAttributes<HTMLInputElement>;

export type InputFieldType<T extends Record<string, any>> = {
  [key in keyof T]: InputOptions<T>;
};




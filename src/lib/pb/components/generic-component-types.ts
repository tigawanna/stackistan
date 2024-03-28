import { FieldType } from "./table/types";

export interface CollectionColumnOptions<T extends Record<string, any>>{
  fieldKey: keyof T;
  fieldLabel: string;
  fieldType?: FieldType;
  fieldHidden?: boolean;
};

import { useFormHook } from "@/components/form/useForm";
import { usePageContext } from "rakkasjs";
import { pbTryCatchWrapper } from "@/lib/pb/utils";
import { useMutation } from "@tanstack/react-query";
import { CollectionName } from "@/lib/pb/client";
import { BaseCollectionUpdate, Schema, StackistanTechnologiesUpdate } from "@/lib/pb/database";
import { PBColumnField } from "./types";
import { TheTextInput } from "@/components/form/inputs/TheTextInput";
import { GenericFormSelect } from "./components/GenericFormSelect";
import { GenericFormTextInput } from "./components/GenericFormTextInput";


type InputUpdateType = Record<string, any>;
// type InputUpdateType = StackistanTechnologiesUpdate;
// type InputUpdateType = BaseCollectionUpdate;
// type InputUpdateType = Schema[CollectionName]["update"];

  type InputOptions<T extends InputUpdateType> = {
    fieldkey: keyof T;
    fieldLabel: string;
    fieldOptions: PBColumnField;
    inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  };
type InputFieldType<T extends InputUpdateType> = {
  [key in keyof T]: InputOptions<T>;
};
interface GenericDataFormProps<T extends InputUpdateType> {
  collection: CollectionName;
  rowId: string;
  field: InputFieldType<T>;
  initialValues:T;
}

export function GenericUpdateDataForm<T extends InputUpdateType>({
  collection,
  rowId,
  field,
  initialValues,
}: GenericDataFormProps<T>) {
  const {
    locals: { pb },
  } = usePageContext();

  const { input, setInput, handleChange, error, setError, validateInputs } =
    useFormHook<T>({
      initialValues,
    });

  const update_mutation = useMutation({
    mutationFn: ({ inp }: { inp: T }) => {
      return pbTryCatchWrapper(pb.collection(collection).update(rowId, inp));
    },
  });

  const pb_error = update_mutation?.data?.error;
  const inputs = Object.entries(field);
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <form
        className="w-full flex flex-col gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          if (error || !input) return;
          update_mutation.mutate({ inp: input });
        }}
      >

        {Object.entries(field).map(([key, value]) => {
          if (value.fieldOptions?.type === "select") {
            return (
              <div key={key}>
                <GenericFormSelect
                  input={input}
                  setInput={setInput}
                  fieldKey={value.fieldkey}
                  fieldLabel={value.fieldLabel}
                  fieldOptions={value.fieldOptions}
                />
              </div>
            );
          }
          if(value.fieldOptions?.type === "editor"){
            return
          }
          if(value.fieldOptions?.type === "json"){
            return
          }
          if(value.fieldOptions?.type === "file"){
            return
          }
          if(value.fieldOptions?.type === "relation"){
            return
          }
          if(value.fieldOptions?.type === "bool"){
            return
          }


          return (
            <div key={key}>
              <GenericFormTextInput<T>
                input={input}
                setInput={setInput}
                fieldKey={value.fieldkey as any}
                fieldLabel={value.fieldLabel}
                inputProps={value?.inputProps}
                fieldType={value.fieldOptions?.type}
              />
            </div>
          );
        })}
      </form>
    </div>
  );
}

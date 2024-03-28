import { useFormHook } from "@/components/form/useForm";
import { pbTryCatchWrapper } from "@/lib/pb/utils";
import { useMutation } from "@tanstack/react-query";
import { GenericFormSelect } from "./generic-inputs/GenericFormSelect";
import { GenericFormTextInput } from "./generic-inputs/GenericFormTextInput";
import { GenericFormBoolean } from "./generic-inputs/GenericFormBoolean";
import { InputFieldType } from "../generic-component-types";
import { GenericFormEditor } from "./generic-inputs/GenericFormEditor";
import { sonnerToast } from "@/components/shadcn/misc/sonner-taost";
import { CollectionName } from "@/lib/pb/client";
import { usePocketbase } from "@/lib/pb/hooks/use-pb";
import { Schema } from "@/lib/pb/database";
import { Button } from "@/components/shadcn/ui/button";
import { Check, Loader } from "lucide-react";

type InputUpdateType = Record<string, any>;

// interface InputOptions<T extends InputUpdateType>
//   extends CollectionColumnOptions<T> {
//   fieldOptions: PBColumnField;
//   inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
// }
// export type InputFieldType<T extends InputUpdateType> = {
//   [key in keyof T]: InputOptions<T>;
// };
interface GenericDataFormProps<T extends InputUpdateType> {
  rowId: string;
  rowFields: InputFieldType<T>;
  queryKey: string[];
  row: T;
  collectionName: CollectionName;
}

export function GenericUpdateDataForm<T extends InputUpdateType>({
  rowId,
  queryKey,
  rowFields,
  collectionName,
  row,
}: GenericDataFormProps<T>) {
  const { input, setInput, handleChange, error, setError, validateInputs } =
    useFormHook<T>({
      initialValues: row,
    });

  const { pb } = usePocketbase();

  const mutation = useMutation({
    mutationFn: ({ row }: { row: Schema[CollectionName]["update"] }) => {
      return pbTryCatchWrapper(pb.from(collectionName).update(rowId, row));
    },
    meta: {
      invalidates: queryKey,
    },
    onSuccess(data) {
      if (data) {
        if (data.data) {
          sonnerToast({
            type: "success",
            title: "Row updated",
          });
        }
        if (data.error) {
          sonnerToast({
            type: "error",
            title: "Something went wrong while updating row",
            options: {
              description: data.error.message,
            },
          });
        }
      }
    },
    onError(error, variables, context) {
      sonnerToast({
        type: "error",
        title: "Something went wrong while updating row",
        options: {
          description: error.message,
        },
      });
    },
  });

  const pb_error = mutation?.data?.error;

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <form
        className="w-full flex flex-col gap-5"
        onSubmit={(e) => {
          e.preventDefault();
          if (!input) return;
          mutation.mutate({ row: input });
        }}
      >
        {Object.entries(rowFields).map(([key, value]) => {
          if (value?.fieldUpdatable === false) {
            return null;
          }
          if (value.fieldOptions?.type === "select") {
            return (
              <div key={key}>
                <GenericFormSelect
                  input={input}
                  setInput={setInput}
                  fieldKey={value.fieldKey}
                  fieldLabel={value.fieldLabel}
                  fieldOptions={value.fieldOptions}
                  fieldError={pb_error}
                />
              </div>
            );
          }
          if (value.fieldOptions?.type === "editor") {
            return (
              <GenericFormEditor
               key={key}
                input={input}
                setInput={setInput}
                fieldKey={value.fieldKey as any}
                fieldLabel={value.fieldLabel}
                fieldError={pb_error}
              />
            );
          }
          if (value.fieldOptions?.type === "json") {
            return;
          }
          if (value.fieldOptions?.type === "file") {
            return;
          }
          if (value.fieldOptions?.type === "relation") {
            return;
          }
          if (value.fieldOptions?.type === "bool") {
            return (
              <div key={key}>
                <GenericFormBoolean<T>
                  input={input}
                  setInput={setInput}
                  fieldKey={value.fieldKey as any}
                  fieldLabel={value.fieldLabel}
                  fieldError={pb_error}
                />
              </div>
            );
          }

          return (
            <div key={key}>
              <GenericFormTextInput<T>
                input={input}
                setInput={setInput}
                fieldKey={value.fieldKey as any}
                fieldLabel={value.fieldLabel}
                inputProps={value?.inputProps}
                fieldType={value.fieldOptions?.type}
                fieldError={pb_error}
              />
            </div>
          );
        })}
        <Button type="submit" variant={"outline"} className="w-fit flex gap-2 items-center justify-between">
          Submit{" "}
          {mutation.isPending ? (
            <Loader className="animate-spin " />
          ) : (
            <Check />
          )}
        </Button>
      </form>
    </div>
  );
}

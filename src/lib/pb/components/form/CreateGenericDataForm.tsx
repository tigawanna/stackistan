import { useFormHook } from "@/components/form/useForm";
import { pbTryCatchWrapper } from "@/lib/pb/utils";
import { useMutation } from "@tanstack/react-query";
import { InputFieldType } from "../generic-component-types";
import { sonnerToast } from "@/components/shadcn/misc/sonner-taost";
import { CollectionName } from "@/lib/pb/client";
import { usePocketbase } from "@/lib/pb/hooks/use-pb";
import { Schema } from "@/lib/pb/database";
import { GenericFormparts } from "./GenericFormparts";

interface GenericDataFormProps<T extends Record<string, any>> {
  rowFields: InputFieldType<T>;
  queryKey: string[];
  collectionName: CollectionName;
}

export function GenericCreateDataForm<T extends Record<string, any>>({
  queryKey,
  rowFields,
  collectionName,
}: GenericDataFormProps<T>) {
  const initialValues = Object.entries(rowFields).reduce((acc:T, [key, value]: any) => {
    if (value.fieldType === "bool") {
      // @ts-expect-error
      acc[key] = false;
    }
    if (value.fieldType === "number") {
      // @ts-expect-error
      acc[key] = 0;
    }
    if (
      value.fieldType === "text" ||
      value.fieldType === "url" ||
      value.fieldType === "relation"||
      value.fieldType === "editor"
    ) {
      // @ts-expect-error
      acc[key] = "";
    }
    if (value.fieldType === "date") {
      // @ts-expect-error
      acc[key] = new Date();
    }
    if (value.fieldType === "select") {
      // @ts-expect-error
      acc[key] = value?.fields[0]??""
    }

    // @ts-expect-error
    acc[key] = "";
    return acc;
  },{} as  T);
  const { input, setInput } = useFormHook<T>({
    initialValues
  });

  const { pb } = usePocketbase();
  const mutation = useMutation({
    mutationFn: ({ row }: { row: Schema[CollectionName]["create"] }) => {
      return pbTryCatchWrapper(pb.from(collectionName).create(row));
    },
    meta: {
      invalidates: queryKey,
    },
    onSuccess(data) {
      if (data) {
        if (data.data) {
          sonnerToast({
            type: "success",
            title: "Entry created",
          });
        }
        if (data.error) {
          sonnerToast({
            type: "error",
            title: "Something went wrong while creating entry",
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
        title: "Something went wrong while creating entry",
        options: {
          description: error.message,
        },
      });
    },
  });

  const pb_error = mutation?.data?.error;

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <GenericFormparts
        input={input}
        setInput={setInput}
        // @ts-expect-error
        mutation={mutation}
        pb_error={pb_error}
        rowFields={rowFields}
        collectionName={collectionName}
      />
    </div>
  );
}

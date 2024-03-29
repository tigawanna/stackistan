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
  rowId: string;
  rowFields: InputFieldType<T>;
  queryKey: string[];
  row: T;
  collectionName: CollectionName;
}

export function GenericCreateDataForm<T extends Record<string, any>>({
  rowId,
  queryKey,
  rowFields,
  collectionName,
  row,
}: GenericDataFormProps<T>) {
  const { input, setInput } = useFormHook<T>({
    initialValues: row,
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

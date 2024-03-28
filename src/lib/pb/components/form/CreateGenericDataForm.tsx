import { useFormHook } from "@/components/form/useForm";
import { usePageContext } from "rakkasjs";
import { useViewer } from "@/lib/pb/hooks/useViewer";
import { pbTryCatchWrapper } from "@/lib/pb/utils";
import { useMutation } from "@tanstack/react-query";
import { CollectionName } from "@/lib/pb/client";
import { Schema } from "@/lib/pb/database";

type InputCreateType = Schema[CollectionName]["create"];

interface GenericDataFormProps<> {
  collection: CollectionName;
  initialValues?: InputCreateType;
}

export function GenericCreateDataForm({collection,initialValues}: GenericDataFormProps) {
  const {
    locals: { pb },
  } = usePageContext();

  const { input, setInput, handleChange, error, setError, validateInputs } =
    useFormHook({
      initialValues,
    });

  const create_mutation = useMutation({
    mutationFn: ({ inp }: { inp: InputCreateType }) => {
      return pbTryCatchWrapper(pb.from(collection).create(inp));
    },
  });

  const pb_error = create_mutation?.data?.error;
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <form className="w-full flex flex-col gap-2">
        
      </form>
    </div>
  );
}

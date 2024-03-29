import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { GenericFormSelect } from "./generic-inputs/GenericFormSelect";
import { GenericFormTextInput } from "./generic-inputs/GenericFormTextInput";
import { GenericFormBoolean } from "./generic-inputs/GenericFormBoolean";
import { InputFieldType } from "../generic-component-types";
import { GenericFormEditor } from "./generic-inputs/GenericFormEditor";
import { CollectionName } from "@/lib/pb/client";
import { Schema } from "@/lib/pb/database";
import { Button } from "@/components/shadcn/ui/button";
import { Check, Loader } from "lucide-react";
import { GenericFormJSONEditor } from "./generic-inputs/GenericFormJSONEditor";
import { GenericFormFilePicker } from "./generic-inputs/GenericFormFilePicker";
import { GenericFormRelationPicker } from "./generic-inputs/GenericFormRelationPicker";
import { ClientResponseError } from "pocketbase";

interface GenericFormpartsProps<T extends Record<string, any>> {
  input: T;
  setInput: React.Dispatch<React.SetStateAction<T>>;
  pb_error: ClientResponseError | null | undefined;
  rowFields: InputFieldType<T>;
  collectionName: CollectionName;
  mutation: UseMutationResult<
    unknown,
    Error,
    {
      row: Schema[CollectionName]["update"] | Schema[CollectionName]["create"];
    },
    any
  >;
}

export function GenericFormparts<T extends Record<string, any>>({
  input,
  setInput,
  collectionName,
  mutation,
  pb_error,
  rowFields,
}: GenericFormpartsProps<T>) {
  return (
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
          return (
            <div className="w-[80%] ">
              <GenericFormJSONEditor
                input={input}
                setInput={setInput}
                fieldKey={value.fieldKey}
                fieldLabel={value.fieldLabel}
              />
            </div>
          );
        }
        if (value.fieldOptions?.type === "file") {
          return (
            <GenericFormFilePicker
              input={input}
              setInput={setInput}
              fieldLabel={value.fieldLabel}
              collaction_id_or_name={collectionName}
              fieldKey={value.fieldKey}
            />
          );
        }
        if (value.fieldOptions?.type === "relation") {
          return (
            <GenericFormRelationPicker
              input={input}
              setInput={setInput}
              collectionName={collectionName}
              filterBy={value.fieldOptions.filterBy}
              fieldLabel={value.fieldLabel}
              fieldKey={value.fieldKey as string}
              columns={value.fieldOptions.columns}
            />
          );
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
      <Button
        type="submit"
        variant={"outline"}
        className="w-fit flex gap-2 items-center justify-between"
      >
        Submit{" "}
        {mutation.isPending ? <Loader className="animate-spin " /> : <Check />}
      </Button>
    </form>
  );
}

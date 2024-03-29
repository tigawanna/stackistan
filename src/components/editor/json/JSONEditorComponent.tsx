import CodeMiroorEdiitor from "../code-editor/CodeMiroorEdiitor";

interface JSONEditorComponentProps {
  filedKey:string;
  input: Record<string, any>;
  setInput: (input: Record<string, any>) => void;
}

export default function JSONEditorComponent({
  filedKey,
  input,
  setInput,
}: JSONEditorComponentProps) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">

    </div>
  );
}

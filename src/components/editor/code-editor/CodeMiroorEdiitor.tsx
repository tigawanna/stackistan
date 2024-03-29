import CodeMirror from "@uiw/react-codemirror";
import { Extension } from "@uiw/react-codemirror";

interface CodeMiroorEdiitorProps {
  extensions: Extension[] | undefined;
  input: string;
  setInput: (input: string) => void;
}

export default function CodeMiroorEdiitor({
  extensions,
  input,
  setInput,
}: CodeMiroorEdiitorProps) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <CodeMirror
        value={input}
        height="100%"
        extensions={extensions}
        onChange={(e) => {
          setInput(e);
        }}
      />
    </div>
  );
}

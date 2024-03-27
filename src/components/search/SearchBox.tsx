
import { Input } from "@/components/shadcn/ui/input";
import { Loader } from "lucide-react";
import { useTransition } from "react";

interface SearchBoxProps {
  debouncedValue: string;
  setDebouncedValue: React.Dispatch<React.SetStateAction<string>>;
  isDebouncing: boolean;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
}

export function SearchBox({
  debouncedValue,
  isDebouncing,
  setDebouncedValue,
  inputProps
}: SearchBoxProps) {
  const [, startTransition] = useTransition();
  return (
    <div className="w-full sticky top-0 ">
    <div className="w-full relative border border-secondary ">
      <Input
      {...inputProps}
        placeholder="Search"
        className="w-full"
        defaultValue={debouncedValue}
        onChange={(e) => {
          startTransition(() => {
            setDebouncedValue((prev) => {
              return e.target.value;
            });
          });
        }}
      />
      {isDebouncing && (
        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
          <Loader className="animate-spin" />
        </div>
      )}
    </div>
    </div>
  );
}

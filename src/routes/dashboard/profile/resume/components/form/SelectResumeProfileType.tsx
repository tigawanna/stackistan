import { cn } from "@/components/shadcn/lib/utils";
import { Button } from "@/components/shadcn/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/shadcn/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/shadcn/ui/popover";
import { StackistanResumeProfileCreate } from "@/lib/pb/database";
import { CheckIcon, ChevronUp } from "lucide-react";
import React from "react";

type ResumeType = StackistanResumeProfileCreate["type"];

interface SelectResumeProfileTypeProps {
  resume_type: ResumeType;
  setResumeType: (type: ResumeType) => void;
}

type SelectResumeProfileTypeType = {
  value: ResumeType;
  label: string;
};

export function SelectResumeProfileType({
  resume_type,
  setResumeType,
}: SelectResumeProfileTypeProps) {
  const [open, setOpen] = React.useState(false);
  // const [value, setValue] = React.useState("general");

  const resume_types: SelectResumeProfileTypeType[] = [
    {
      value: "general",
      label: "General",
    },
    {
      value: "frontend",
      label: "Frontend",
    },
    {
      value: "backend",
      label: "Backead",
    },
    {
      value: "fullstack",
      label: "Fullstack",
    },
    {
      value: "data",
      label: "data",
    },
    {
      value: "mobile",
      label: "Mobile",
    },
    {
      value: "gamedev",
      label: "Gamedev",
    },
    {
      value: "devops",
      label: "Devops",
    },
    {
      value: "other",
      label: "Other",
    },
  ];

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {resume_type
            ? resume_types.find(
                (internal_resume_type) =>
                  internal_resume_type.value === resume_type,
              )?.label
            : "Select resume type..."}
          <ChevronUp className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search resume type..." className="h-9" />
          <CommandEmpty>No resume type found.</CommandEmpty>
          <CommandGroup>
            {resume_types.map((internal_resume_type) => (
              <CommandItem
                key={internal_resume_type.value}
                value={internal_resume_type.value}
                onSelect={(currentValue) => {
                  const currVal = currentValue as ResumeType;
                  setResumeType(currVal);
                  // setValue(currentValue === value ? "" : currentValue);
                  setOpen(false);
                }}
              >
                {internal_resume_type.label}
                <CheckIcon
                  className={cn(
                    "ml-auto h-4 w-4",
                    resume_type === internal_resume_type.value
                      ? "opacity-100"
                      : "opacity-0",
                  )}
                />
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

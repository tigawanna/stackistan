import { TheTextInput } from "@/components/form/inputs/TheTextInput";
import { useTransition } from "react";

interface GithubViewerInputProps {
  githubUsername: string;
  setGithubUsername: (githubUsername: string) => void;
}

export function GithubViewerInput({
  githubUsername,
  setGithubUsername,
}: GithubViewerInputProps) {
  const [_, startTransition] = useTransition();
  return (
    <TheTextInput
      field_key={"viewer"}
      field_name="Github Username"
      label_classname="hidden"

      val={githubUsername}
      onChange={(e) => startTransition(
        () => setGithubUsername(e.target.value),
      )}
    />
  );
}
